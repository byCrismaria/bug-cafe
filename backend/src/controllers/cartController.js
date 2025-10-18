const cartService = require('../services/cartService');

const addClassicCoffeeToCart = async (req, res) => {
    //const { productId, quantity, userId, cartId } = req.body;

    const userId = req.user ? req.user.userId : null;
    const { productId, quantity, cartId } = req.body;

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
        console.error("Erro no addClassicCoffeeToCart:", error);

        if (error.message.includes('não disponível')) {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
        // Se for qualquer outro erro inesperado, retorna um erro genérico 500.
        res.status(500).json({
            status: 'error',
            message: 'Ocorreu um erro interno no servidor.'
        });
    }
};

const getCart = async (req, res) => {
    //const { userId, cartId } = req.query;
    //const userId = req.user.userId;
    const userId = req.user ? req.user.userId : null; 
    const { cartId } = req.query;

      if (!userId && !cartId) {
        return res.status(400).json({ status: 'error', message: 'É necessário um userId (usuário logado) ou cartId (convidado) para obter o carrinho.' });
    }

    try {
        const cart = await cartService.getCartItems(userId, cartId);

        // Se o carrinho não for encontrado, retorna a mensagem de carrinho vazio (RF41)
        if (cart.items.length === 0) {
            return res.status(200).json({ status: 'success', ...cart });
        }

        res.status(200).json({
            status: 'success',
            data: cart
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

//controller para ajustar a quantidade de um item no carrinho
const adjustQuantity = async (req, res) => {

    const userId = req.user ? req.user.userId : null;
    const { itemId } = req.params; 
    const { newQuantity, cartId } = req.body; 

    if (!itemId || !newQuantity || newQuantity <= 0) {
        return res.status(400).json({ status: 'error', message: 'Dados inválidos. Verifique o ID do item e a nova quantidade.' });
    }

    try {
        const result = await cartService.adjustItemQuantity(userId, cartId, itemId, newQuantity);
        // Retorna a mensagem de sucesso conforme RF36
        res.status(200).json({
            status: 'success',
            message: "Quantidade do item atualizada.",
            new_subtotal: parseFloat(result.new_subtotal),
            new_total: parseFloat(result.new_total)
        });
    } catch (error) {
        // Retorna a mensagem de erro (RF40)
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

// controller para remover um item
const removeItem = async (req, res) => {
    const userId = req.user ? req.user.userId : null;
    const { itemId } = req.params; 
    const { cartId } = req.body;

    if (!itemId) {
        return res.status(400).json({ status: 'error', message: 'ID do item do carrinho é obrigatório.' });
    }

    try {
        const result = await cartService.removeItem(userId, cartId, itemId);
        res.status(200).json({
            status: 'success',
            message: "Item removido do carrinho.",
            new_total: parseFloat(result.new_total)
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = {
    addClassicCoffeeToCart,
    getCart,
    adjustQuantity,
    removeItem
};