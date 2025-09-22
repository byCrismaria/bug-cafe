const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Suas rotas e endpoints irão aqui

app.get('/', (req, res) => {
    res.send('Backend da Cafeteria Bug Café está rodando!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});