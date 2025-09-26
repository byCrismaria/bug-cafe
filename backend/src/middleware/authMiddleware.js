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

const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded; // Se o token for válido, adiciona o usuário ao req
        } catch (error) {
            // Se o token existir mas for inválido (expirado, etc.), apenas ignoramos.
            // O usuário será tratado como um convidado.
            console.log('Token inválido ou expirado fornecido. Tratando como convidado.');
        }
    }
    
    // Continua para a próxima rota, independentemente de o usuário ter sido autenticado ou não.
    next();
};


module.exports = { protect, optionalAuth };