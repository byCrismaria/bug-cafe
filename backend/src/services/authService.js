const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const registerUser = async (name, email, password, confirmPassword) => {
    // Validação de Requisitos (RF43)
    if (!name || !email || !password || !confirmPassword) {
        throw new Error("Todos os campos obrigatórios devem ser preenchidos.");
    }

    // 1. Verificação se as senhas coincidem (RF45)
    if (password !== confirmPassword) {
        throw new Error("As senhas não coincidem.");
    }

    // 2. Validação de requisitos de segurança da senha (RF46)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        throw new Error("A senha deve ter no mínimo 8 caracteres, incluindo letras e números.");
    }

    // 3. Verificação de e-mail duplicado (RF44, RNF30)
    const existingUser = await db('users').where({ email: email }).first();
    if (existingUser) {
        throw new Error("Este e-mail já está cadastrado.");
    }

    // 4. Criptografia da senha (RNF29)
    const hashedPassword = await bcrypt.hash(password, 10); // O '10' é o "salt", um fator de segurança

    // 5. Inserção do novo usuário no banco de dados (RF47)
    const [userId] = await db('users').insert({
        full_name: name,
        email,
        password_hash: hashedPassword,
        points_balance: 0 // Inicializa o saldo de pontos como 0
    }).returning('user_id');

    return { userId };
};

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};


const loginUser = async (email, password) => {
    // 1. Busca o usuário pelo e-mail
    const user = await db('users').where({ email: email }).first();

    // 2. Se o usuário não existe, ou a senha está incorreta, retorna um erro genérico (RNF33)
    if (!user) {
        throw new Error("E-mail ou senha inválidos.");
    }

    // 3. Compara a senha fornecida com a senha criptografada (RF48)
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
        throw new Error("E-mail ou senha inválidos.");
    }

    // Se a autenticação for bem-sucedida, gere o token
    const token = generateToken(user.user_id);

    // Se o e-mail e a senha estiverem corretos, retorna o ID do usuário
    return {
        userId: user.user_id,
        name: user.full_name,
        token: token
    };
};

module.exports = {
    registerUser,
    loginUser
};