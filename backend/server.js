const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const coffeeRoutes = require('./src/routes/coffeeRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const customCoffeeRoutes = require('./src/routes/customCoffeeRoutes');
const customizationRoutes = require('./src/routes/customizationRoutes');
const authRoutes = require('./src/routes/authRoutes');

app.use(express.json());

// Use as rotas do backend
app.use('/api', coffeeRoutes);
app.use('/api/cart', cartRoutes); //as rotas do carrinho terão o prefixo '/api/cart'
app.use('/api/custom-coffee', customCoffeeRoutes); // Rotas para café personalizado
app.use('/api/customizations', customizationRoutes); // Rotas para opções de personalização
app.use('/api/auth', authRoutes); // Rotas para autenticação


app.get('/', (req, res) => {
    res.send('Backend da Cafeteria Bug Café está rodando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});