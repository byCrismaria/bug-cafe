const cartService = require('../services/cartService');

const addClassicCoffeeToCart = async (req, res) => {
    const {  productId, quantity, userId, cartId } = req.body;

    // Você precisará de uma forma de verificar se o usuário está logado (RF08)
    // ou se a requisição veio de um usuário não logado.
    // Para simplificar, assumimos que esta validação pode ser feita por um middleware
    // ou no frontend, antes da requisição.

    // Validação para o campo productId
    if (!productId) {
        return res.status(400).json({
            status: 'error',
            message: 'O campo productId é obrigatório para adicionar ao carrinho.'
        });
    }

    if (!Number.isInteger(productId) || productId <= 0) {
        return res.status(400).json({
            status: 'error',
            message: `O campo productId deve ser um número inteiro positivo. O valor recebido foi: ${productId}`
        });
    }

    // Validação para o campo quantity
    if (!quantity) {
        return res.status(400).json({
            status: 'error',
            message: 'O campo quantity é obrigatório para adicionar ao carrinho.'
        });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
            status: 'error',
            message: `O campo quantity deve ser um número inteiro positivo. O valor recebido foi: ${quantity}`
        });
    }

    // Se não for fornecido userId ou cartId, é um erro de requisição para este exemplo
    if (!userId && !cartId) {
        return res.status(400).json({ status: 'error', message: 'Você deve fornecer um userId ou um cartId para adicionar itens ao carrinho.' });
    }

    try {
        const orderItemId = await cartService.addClassicCoffeeToCart(productId, quantity, userId, cartId);

        // Retorna a mensagem de sucesso conforme RF11
        res.status(200).json({
            status: 'success',
            message: 'Item adicionado ao carrinho com sucesso.',
            item_id: orderItemId
        });
    } catch (error) {
        // Lida com o erro de indisponibilidade ou outros problemas
        // e retorna a mensagem de erro conforme RF13
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = {
    addClassicCoffeeToCart
};