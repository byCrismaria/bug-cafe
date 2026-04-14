const orderService = require('../services/orderService');

const checkout = async (req, res) => {
    const userId = req.user?.userId || null;
    const { cartId } = req.body || {};

    if (!userId && !cartId) {
        return res.status(400).json({
            status: 'error',
            message: 'Faça login ou forneça um cartId para finalizar o pedido.'
        });
    }

    try {
        const completedOrder = await orderService.checkoutOrder(userId, cartId);
        const message = userId
            ? 'Pedido finalizado com sucesso! Pontos adicionados à sua conta.'
            : 'Pedido finalizado com sucesso!';

        res.status(200).json({ status: 'success', message, data: completedOrder });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    checkout
};