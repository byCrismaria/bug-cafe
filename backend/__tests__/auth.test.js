const request = require('supertest');
const app = require('../server'); // Importa o seu arquivo principal do servidor
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

// Garante que o servidor esteja pronto para receber requisições
beforeAll(async () => {
  await db.migrate.latest();
});

// Limpeza: Remove o usuário de teste do banco de dados após a execução
afterAll(async () => {
  await db('users').where('email', 'teste.jest@exemplo.com').del();
  await db.destroy();
});

describe('User Authentication', () => {
  it('deve registrar um novo usuário com sucesso', async () => {
    const newUser = {
      name: 'Teste Jest',
      email: 'teste.jest@exemplo.com',
      password: 'password123',
      confirmPassword: 'password123'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(newUser);

    // Verifica o status de sucesso
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Cadastro realizado com sucesso. Bem-vindo(a)!');

    // Verifica se o usuário foi criado no banco de dados
    const createdUser = await db('users')
      .where('email', newUser.email)
      .first();

    expect(createdUser).toBeDefined();
    expect(createdUser.full_name).toBe(newUser.name);
  });
});