const jwt = require('jsonwebtoken');

// Carrega a chave secreta do arquivo .env
require('dotenv').config();

const protect = (req, res, next) => {
    let token;

    // 1. Verifica se o token existe no cabeçalho Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtém o token do cabeçalho
            token = req.headers.authorization.split(' ')[1];
            
            // 2. Verifica e decodifica o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 3. Adiciona o ID do usuário ao objeto de requisição (req)
            req.user = decoded; // Agora podemos acessar req.user.userId em qualquer rota protegida
            
            next(); // Continua para a próxima middleware ou rota
            
        } catch (error) {
            console.error('Erro de autenticação:', error.message);
            res.status(401).json({ status: 'error', message: 'Não autorizado, token inválido.' });
        }
    }
    
    // Se não houver token no cabeçalho
    if (!token) {
        res.status(401).json({ status: 'error', message: 'Não autorizado, token não encontrado.' });
    }
};

module.exports = { protect };