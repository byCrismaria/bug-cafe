const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);
const { updateUserPoints } = require('./profileService'); // Importa a função de atualização de pontos

const checkoutOrder = async (userId, cartId) => {
    return db.transaction(async (trx) => {
        // 1. Encontra o pedido pendente — por userId (logado) ou cartId (guest)
        let order;
        if (userId) {
            order = await trx('orders')
                .where({ user_id: userId, status: 'Pendente' })
                .orderBy('order_date', 'desc')
                .first();
        } else {
            order = await trx('orders')
                .where({ user_id: null, cart_id: cartId, status: 'Pendente' })
                .orderBy('order_date', 'desc')
                .first();
        }

        if (!order) {
            throw new Error('Nenhum pedido pendente encontrado. Adicione itens ao carrinho.');
        }

        // 2. Atualiza o status para 'Concluido' (simula pagamento aprovado)
        await trx('orders')
            .where({ order_id: order.order_id })
            .update({ status: 'Concluido' });

        // 3. Pontos de fidelidade apenas para usuários logados
        if (userId) {
            await updateUserPoints(userId, order.order_id);
        }

        return {
            order_id: order.order_id,
            total_price: parseFloat(order.total_price),
            status: 'Concluido'
        };
    });
};

module.exports = {
    checkoutOrder
};