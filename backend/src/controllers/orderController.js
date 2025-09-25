const orderService = require('../services/orderService');

const checkout = async (req, res) => {
    const userId = req.user.userId;
    const { orderId } = req.body;

    if (!orderId) {
        return res.status(400).json({ status: 'error', message: 'ID do pedido é obrigatório para o checkout.' });
    }

    try {
        const completedOrder = await orderService.checkoutOrder(userId, orderId);
        res.status(200).json({
            status: 'success',
            message: 'Pedido finalizado com sucesso! Pontos adicionados à sua conta.',
            data: completedOrder
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = {
    checkout
};