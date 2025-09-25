const customCoffeeService = require('../services/customCoffeeService');

const addCustomCoffeeToCart = async (req, res) => {

    const userId = req.user ? req.user.userId : null;
    const { cartId, customizations } = req.body;

    // Validações básicas (RF25)
    if (!userId && !cartId) {
        return res.status(400).json({ status: 'error', message: 'É necessário um userId ou cartId para adicionar ao carrinho.' });
    }
    if (!customizations || customizations.length === 0) {
        return res.status(400).json({ status: 'error', message: 'Selecione pelo menos uma base e um tamanho para montar seu café.' });
    }

    try {

        const { item_id } = await customCoffeeService.addCustomCoffeeToCart(userId, cartId, customizations);

        // Retorna a mensagem de sucesso (RF26)
        res.status(200).json({
            status: 'success',
            message: 'Seu café personalizado foi adicionado ao carrinho com sucesso.',
            item_id: item_id
        });
    } catch (error) {
        // Retorna a mensagem de erro (RF28)
        res.status(400).json({
            status: 'error',
            message: error.message || 'Não foi possível montar seu café. Por favor, tente novamente.'
        });
    }
};

module.exports = {
    addCustomCoffeeToCart
};