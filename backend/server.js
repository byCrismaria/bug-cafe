const express = require('express');
const cors = require('cors');
const coffeeRoutes = require('./src/routes/coffeeRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const customCoffeeRoutes = require('./src/routes/customCoffeeRoutes');
const customizationRoutes = require('./src/routes/customizationRoutes');
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: '*', 
    allowedHeaders: ['Content-Type', 'Authorization'], // Permite cabeçalhos específicos
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    credentials: true 
}));

// Use as rotas do backend
app.use('/api', coffeeRoutes);
app.use('/api/cart', cartRoutes); //as rotas do carrinho terão o prefixo 
app.use('/api/custom-coffee', customCoffeeRoutes); // Rotas para café personalizado
app.use('/api/customizations', customizationRoutes); // Rotas para opções de personalização
app.use('/api/auth', authRoutes); // Rotas para autenticação
app.use('/api/profile', profileRoutes); // Rotas para perfil do usuário
app.use('/api/orders', orderRoutes); // Rotas para pedidos


app.get('/', (req, res) => {
    res.send('Backend da Cafeteria Bug Café está rodando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

module.exports = app; // Exporta o app para testes