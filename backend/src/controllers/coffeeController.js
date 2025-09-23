const coffeeService = require('../services/coffeeService');

const getClassicCoffees = async (req, res) => {
    try {
        const coffees = await coffeeService.getClassicCoffees();
        res.status(200).json({ status: 'success', data: coffees });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Não foi possível carregar os cafés clássicos.' });
    }
};

const getMostFamous = async (req, res) => {
    try {
        const famous = await coffeeService.getMostFamous();
        res.status(200).json({ status: 'success', data: famous });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Não foi possível carregar a lista de cafés mais pedidos.' });
    }
};

module.exports = {
    getClassicCoffees,
    getMostFamous
};