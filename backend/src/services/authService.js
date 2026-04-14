const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('./emailService');

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
    const [newUser] = await db('users').insert({
        full_name: name,
        email,
        password_hash: hashedPassword,
        points_balance: 0 // Inicializa o saldo de pontos como 0
    }).returning('user_id');

    // Knex + PostgreSQL retorna [{ user_id: 1 }], não [1]
    const userId = newUser.user_id ?? newUser;
    const token = generateToken(userId);
    return { userId, name, token };
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

const forgotPassword = async (email) => {
    const user = await db('users').where({ email }).first();

    // Não revelamos se o e-mail existe ou não (segurança)
    if (!user) return;

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hora

    await db('users').where({ email }).update({
        reset_token: resetToken,
        reset_token_expires: resetTokenExpires,
    });

    await sendPasswordResetEmail(email, resetToken);
};

const resetPassword = async (token, newPassword, confirmPassword) => {
    if (!token) throw new Error('Token não fornecido.');

    if (newPassword !== confirmPassword) {
        throw new Error('As senhas não coincidem.');
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        throw new Error('A senha deve ter no mínimo 8 caracteres, incluindo letras e números.');
    }

    const user = await db('users')
        .where({ reset_token: token })
        .where('reset_token_expires', '>', new Date())
        .first();

    if (!user) throw new Error('Link inválido ou expirado. Solicite um novo.');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db('users').where({ user_id: user.user_id }).update({
        password_hash: hashedPassword,
        reset_token: null,
        reset_token_expires: null,
    });
};

module.exports = {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
};