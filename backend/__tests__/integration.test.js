const request = require('supertest');
const app = require('../server');
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

function gerarDataHoraString() {
  const agora = new Date();

  const dia = String(agora.getDate()).padStart(2, '0');
  const mes = String(agora.getMonth() + 1).padStart(2, '0'); // getMonth() é base 0, então adicionamos 1
  const ano = agora.getFullYear();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');

  return `${dia}${mes}${ano}${horas}${minutos}`;
}

// Exemplo de uso:
const dataHoraFormatada = gerarDataHoraString();
console.log(dataHoraFormatada);

const testUser = {
    name: 'Teste Integracao',
    email: 'teste.integracao'+ dataHoraFormatada +'@bugcafe.com',
    password: "senhaSegura123",
    confirmPassword: "senhaSegura123"
};
let authToken = '';
let pendingOrderId;

beforeAll(async () => {
    await db.migrate.latest();
});


describe('Teste completo de integração de API', () => {

    it('deve registrar um novo usuário e retornar um status 201', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send(testUser);

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Cadastro realizado com sucesso. Bem-vindo(a)!');

        const registeredUser = await db('users')
            .where('email', testUser.email)
            .first();

        expect(registeredUser).toBeDefined();
        expect(registeredUser.full_name).toBe(testUser.name);
    });

    it('deve efetuar login como usuário registrado e retornar um JWT', async () => {
        const loginCredentials = {
            email: testUser.email,
            password: testUser.password
        };

        const response = await request(app)
            .post('/api/auth/login')
            .send(loginCredentials);

        expect(response.status).toBe(200);
        expect(response.body.data.token).toBeDefined();
        authToken = response.body.data.token;
        expect(authToken).toBeDefined();
    });

    it('deveria adicionar um café clássico ao carrinho', async () => {
        const addClassicData = {
            productId: 9,
            quantity: 1
        };

        const response = await request(app)
            .post('/api/cart/add-classic')
            .set('Authorization', `Bearer ${authToken}`)
            .send(addClassicData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Item adicionado ao carrinho com sucesso.');

        // Obtém o ID do pedido que foi criado
        const orderItemId = response.body.item_id.order_item_id;
        const orderItem = await db('order_items')
            .where({ order_item_id: response.body.item_id.order_item_id })
            .first();

        const order = await db('orders')
            .where({ order_id: orderItem.order_id, status: 'Pendente' })
            .first();

        pendingOrderId = orderItem.order_id;

    });

    it('deve adicionar um café personalizado ao carrinho', async () => {
        const addCustomData = {
            customizations: [9, 12, 16, 18] // IDs de exemplo
        };

        const response = await request(app)
            .post('/api/custom-coffee/add-custom')
            .set('Authorization', `Bearer ${authToken}`)
            .send(addCustomData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Seu café personalizado foi adicionado ao carrinho com sucesso.');
    });

    it('deve obter o perfil do usuário com pedidos pendentes', async () => {
        const response = await request(app)
            .get('/api/profile')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
        expect(response.body.data.profile.email).toBe(testUser.email);
        expect(response.body.data.orderHistory).toBeDefined();
        expect(response.body.data.orderHistory.length).toBe(0);
    });

    it('deve finalizar a compra e adicionar pontos ao usuário', async () => {

        expect(pendingOrderId).toBeDefined();

        const checkoutData = {
            orderId: pendingOrderId
        };

        const response = await request(app)
            .post('/api/orders/checkout')
            .set('Authorization', `Bearer ${authToken}`)
            .send(checkoutData);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Pedido finalizado com sucesso! Pontos adicionados à sua conta.');

        // Verificações adicionais para garantir que a API retornou o objeto de dados esperado
        expect(response.body.data).toBeDefined();
        expect(response.body.data.order_id).toBe(pendingOrderId);
        expect(response.body.data.status).toBe('Concluido');
        expect(response.body.data.total_price).toBeGreaterThan(0);
    });

    it('deve obter o perfil do usuário com um pedido concluído e pontos atualizados', async () => {
        const response = await request(app)
            .get('/api/profile')
            .set('Authorization', `Bearer ${authToken}`);

        expect(response.status).toBe(200);
    expect(response.body.data.orderHistory).toBeDefined();
    expect(response.body.data.orderHistory.length).toBeGreaterThan(0);
    expect(response.body.data.profile.points_balance).toBeGreaterThan(0);
    });
});