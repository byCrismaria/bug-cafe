const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);

//Encontra um carrinho 'Pendente' ou cria um novo
const findOrCreateOrder = async (trx, userId, cartId) => {
    let order;
    if (userId) {
        order = await trx('orders').where({ user_id: userId, status: 'Pendente' }).first();
    } else if (cartId) {
        order = await trx('orders').where({ user_id: null, status: 'Pendente', cart_id: cartId }).first();
    }

    if (!order) {
        const newOrderData = {
            user_id: userId || null,
            total_price: 0,
            status: 'Pendente',
            cart_id: cartId
        };
        const [insertedOrder] = await trx('orders').insert(newOrderData).returning('*');
        order = insertedOrder;
    }

    return order;
};

const addClassicCoffeeToCart = async (productId, quantity = 1, userId, cartId) => {

    return db.transaction(async (trx) => {
        // 1. Verificar se o produto existe e tem estoque suficiente (RF06)
        const product = await trx('products').where({ product_id: productId, is_customizable: false }).first();

        if (!product) {
            throw new Error("O produto não foi encontrado.");
        }

        if (product.stock_quantity < quantity) {
            throw new Error(`O item ${product.name} está temporariamente indisponível.`);
        }

        if (userId) {
            const userExists = await trx('users').where({ user_id: userId }).first();
            if (!userExists) {
                throw new Error("O usuário informado não existe, tente novamente.");
            }
        }

        // 2. Reutiliza a função findOrCreateOrder para encontrar ou criar o carrinho (tabela orders)
        const order = await findOrCreateOrder(trx, userId, cartId);

        // 3. Adicionar o item ao carrinho (tabela order_items)
        const orderItem = {
            order_id: order.order_id,
            product_id: productId,
            quantity: quantity,
            unit_price: product.price,
            subtotal: product.price * quantity // RF30
        };

        const [orderItemId] = await trx('order_items').insert(orderItem).returning('order_item_id');

        // 4. Atualizar o estoque (RF06)
        await trx('products').where({ product_id: productId }).decrement('stock_quantity', quantity);

        // 5. Atualizar o preço total do pedido
        const newTotal = await trx('order_items').sum('subtotal as total').where({ order_id: order.order_id }).first();
        await trx('orders').where({ order_id: order.order_id }).update({ total_price: newTotal.total });

        // Retorna o ID do item adicionado
        return orderItemId;
    });
};

const getCartItems = async (userId, cartId) => {

    // 1. Encontra o pedido "Pendente"
    let order;
    if (userId) {
        order = await db('orders').where({ user_id: userId, status: 'Pendente' }).first();
    } else if (cartId) {
        order = await db('orders').where({ user_id: null, status: 'Pendente', cart_id: cartId }).first();
    }

    if (!order) {
        // Retorna um carrinho vazio se nenhum pedido pendente for encontrado (RF41)
        return {
            items: [],
            total: 0,
            message: "Seu carrinho está vazio. Adicione alguns cafés deliciosos!"
        };
    }

    // 2. Busca os itens e seus detalhes com JOINs
    const items = await db('order_items')
        .join('products', 'order_items.product_id', 'products.product_id')
        .where('order_items.order_id', order.order_id)
        .select(
            'order_items.order_item_id',
            'order_items.quantity',
            'order_items.unit_price',
            'order_items.subtotal',
            'products.name',
            'products.is_customizable'
        );

    // 3. Para cada item personalizado, busca as personalizações
    const itemsWithCustomizations = await Promise.all(items.map(async item => {
        if (item.is_customizable) {
            const customizations = await db('order_item_customizations')
                .join('customization_options', 'order_item_customizations.option_id', 'customization_options.option_id')
                .where('order_item_customizations.order_item_id', item.order_item_id)
                .select('customization_options.name', 'customization_options.category');

            // Adiciona as personalizações ao item
            item.customizations = customizations;
        }
        return item;
    }));

    // 4. Calcula o total do pedido (RF31)
    const totalResult = await db('orders').where('order_id', order.order_id).sum('total_price as total').first();
    const total = parseFloat(totalResult.total) || 0;

    return {
        items: itemsWithCustomizations,
        total: total
    };
};

//função para ajusta a quantidade de um item no carrinho
const adjustItemQuantity = async (userId, cartId, orderItemId, newQuantity) => {
    return db.transaction(async (trx) => {
        // Encontra o pedido "Pendente"
        let order;
        if (userId) {
            order = await trx('orders').where({ user_id: userId, status: 'Pendente' }).first();
        } else if (cartId) {
            order = await trx('orders').where({ user_id: null, status: 'Pendente', cart_id: cartId }).first();
        }
        if (!order) {
            throw new Error("O carrinho está vazio.");
        }

        // Busca o item específico no pedido
        const orderItem = await trx('order_items').where({ order_item_id: orderItemId, order_id: order.order_id }).first();
        if (!orderItem) {
            throw new Error("Item não encontrado no carrinho.");
        }

        // Busca o produto para verificar o estoque
        const product = await trx('products').where({ product_id: orderItem.product_id }).first();
        const quantityChange = newQuantity - orderItem.quantity;

        if (product.stock_quantity < quantityChange) {
            throw new Error(`Estoque insuficiente. Restam apenas ${product.stock_quantity} unidades.`);
        }

        if (newQuantity <= 0) {
            // Lança um erro para que o front-end possa sugerir a remoção do item
            throw new Error("A quantidade deve ser maior que zero. Para remover o item, use a opção 'remover'.");
        }

        // Calcula o novo subtotal e atualiza o item
        const newSubtotal = parseFloat(orderItem.unit_price) * newQuantity;
        await trx('order_items').where({ order_item_id: orderItemId }).update({
            quantity: newQuantity,
            subtotal: newSubtotal
        });

        // Atualiza o estoque do produto
        await trx('products').where({ product_id: product.product_id }).decrement('stock_quantity', quantityChange);

        // Recalcula e atualiza o total do pedido (RF31)
        const newTotalResult = await trx('order_items').sum('subtotal as total').where({ order_id: order.order_id }).first();
        const newTotal = parseFloat(newTotalResult.total);
        await trx('orders').where({ order_id: order.order_id }).update({ total_price: newTotal });

        // Retorna os novos valores para o frontend (RF36)
        return {
            new_subtotal: newSubtotal,
            new_total: newTotal
        };
    });
};

// Remove um item do carrinho
const removeItem = async (userId, cartId, orderItemId) => {
    return db.transaction(async (trx) => {
        let order;
        if (userId) {
            order = await trx('orders').where({ user_id: userId, status: 'Pendente' }).first();
        } else if (cartId) {
            order = await trx('orders').where({ user_id: null, status: 'Pendente', cart_id: cartId }).first();
        }

        if (!order) {
            throw new Error("O carrinho está vazio.");
        }

        const orderItem = await trx('order_items').where({ order_item_id: orderItemId, order_id: order.order_id }).first();
        if (!orderItem) {
            throw new Error("Item não encontrado no carrinho.");
        }

        // Devolve a quantidade removida para o estoque
        await trx('products').where({ product_id: orderItem.product_id }).increment('stock_quantity', orderItem.quantity);

        // Remove o item do carrinho
        await trx('order_items').where({ order_item_id: orderItemId }).del();

        // Recalcula o total do pedido
        const newTotalResult = await trx('order_items').sum('subtotal as total').where({ order_id: order.order_id }).first();
        const newTotal = parseFloat(newTotalResult.total) || 0; // Se o carrinho ficar vazio, o total é 0
        await trx('orders').where({ order_id: order.order_id }).update({ total_price: newTotal });

        // Retorna o novo total (RF38)
        return { new_total: newTotal };
    });
};

module.exports = {
    addClassicCoffeeToCart,
    getCartItems,
    adjustItemQuantity,
    removeItem
};