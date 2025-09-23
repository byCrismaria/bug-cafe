const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);

const getCustomizationOptions = async () => {
    try {
        
        const options = await db('customization_options').select('*');

        // Opcional: Agrupa as opções por categoria para facilitar o uso no frontend
        const groupedOptions = options.reduce((acc, option) => {
            if (!acc[option.category]) {
                acc[option.category] = [];
            }
            acc[option.category].push({
                option_id: option.option_id,
                name: option.name,
                additional_price: parseFloat(option.additional_price) // Garante que o preço seja numérico
            });
            return acc;
        }, {});
        
        return groupedOptions;
    } catch (error) {
        throw new Error("Não foi possível carregar as opções de personalização.");
    }
};

module.exports = {
    getCustomizationOptions
};