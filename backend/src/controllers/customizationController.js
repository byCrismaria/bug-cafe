const customizationService = require('../services/customizationService');

const getCustomizationOptions = async (req, res) => {
    try {
        const options = await customizationService.getCustomizationOptions();
        res.status(200).json({
            status: 'success',
            data: options
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Erro interno no servidor.'
        });
    }
};

module.exports = {
    getCustomizationOptions
};