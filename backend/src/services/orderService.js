const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);
const { updateUserPoints } = require('./profileService'); // Importa a função de atualização de pontos

const checkoutOrder = async (userId, orderId) => {
    return db.transaction(async (trx) => {
        // 1. Busca o pedido pendente do usuário
        const order = await trx('orders')
            .where({ user_id: userId, order_id: orderId, status: 'Pendente' })
            .first();

        if (!order) {
            throw new Error('Pedido pendente não encontrado.');
        }

        // 2. Atualiza o status do pedido para 'Concluído'
        await trx('orders')
            .where({ order_id: orderId })
            .update({ status: 'Concluido' });

        // 3. Adiciona os pontos ao saldo do usuário
        await updateUserPoints(userId, orderId);
        
        // 4. Retorna o pedido atualizado (opcional, mas bom para feedback)
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