const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);

const getUserProfile = async (userId) => {
    // 1. Busca as informações básicas do usuário
    const user = await db('users')
        .where({ user_id: userId })
        .select('full_name', 'email', 'points_balance')
        .first();

    if (!user) {
        throw new Error("Usuário não encontrado.");
    }
    
    // 2. Busca o histórico de pedidos
    const orders = await db('orders')
        .where({ user_id: userId, status: 'Concluido' })
        .orderBy('order_date', 'desc');

    const orderHistory = [];
    
    // 3. Para cada pedido, busca os itens
    for (const order of orders) {
        const orderItems = await db('order_items')
            .join('products', 'order_items.product_id', 'products.product_id')
            .where('order_items.order_id', order.order_id)
            .select(
                'order_items.order_item_id',
                'order_items.quantity',
                'order_items.unit_price',
                'order_items.subtotal',
                'products.name as product_name',
                'products.is_customizable'
            );
        
        const itemsWithCustomizations = [];
        
        // 4. Se for um item personalizado, busca as personalizações
        for (const item of orderItems) {
            if (item.is_customizable) {
                const customizations = await db('order_item_customizations')
                    .join('customization_options', 'order_item_customizations.option_id', 'customization_options.option_id')
                    .where('order_item_customizations.order_item_id', item.order_item_id)
                    .select('customization_options.name', 'customization_options.category');
                
                item.customizations = customizations;
            }
            itemsWithCustomizations.push(item);
        }

        orderHistory.push({
            order_id: order.order_id,
            total_price: parseFloat(order.total_price),
            created_at: order.order_date,
            items: itemsWithCustomizations
        });
    }

    return {
        profile: {
            full_name: user.full_name,
            email: user.email,
            points_balance: user.points_balance
        },
        orderHistory: orderHistory
    };
};

const updateUserPoints = async (userId, orderId) => {
    return db.transaction(async (trx) => {
        // 1. Busca o valor total do pedido
        const order = await trx('orders')
            .where({ order_id: orderId, user_id: userId })
            .select('total_price')
            .first();

        if (!order) {
            throw new Error('Pedido não encontrado para o usuário especificado.');
        }

        const totalPrice = parseFloat(order.total_price);
        
        // 2. Calcula os pontos ganhos
        // A cada R$10, 1 ponto. Usamos Math.floor para garantir um número inteiro.
        const pointsEarned = Math.floor(totalPrice / 10);
        
        if (pointsEarned > 0) {
            // 3. Atualiza o saldo de pontos do usuário
            await trx('users')
                .where({ user_id: userId })
                .increment('points_balance', pointsEarned);

            return {
                status: 'success',
                message: `${pointsEarned} pontos foram adicionados à sua conta!`
            };
        } else {
            return {
                status: 'success',
                message: 'Valor do pedido muito baixo para ganhar pontos.'
            };
        }
    });
};


module.exports = {
    getUserProfile,
    updateUserPoints
};