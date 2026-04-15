# Bug Café

Este projeto é um sistema para uma cafeteria, desenvolvendo tanto a interface do usuário (frontend) quanto a lógica do servidor (backend). O sistema simula um ambiente de e-commerce de café, permitindo que os clientes naveguem pelo menu, personalizem seus pedidos e acumulem pontos em um sistema de fidelidade.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Execução](#execução)
- [Documentação da API](#documentação-da-api)
- [Testes](#testes)
- [API Endpoints](#api-endpoints)
- [Sistema de Pontos](#sistema-de-pontos)
- [Contribuição](#contribuição)

## Visão Geral

O Bug Café é uma aplicação full-stack composta por:
- **Frontend**: Vue 3 com Vuetify 3 para uma interface responsiva e moderna
- **Backend**: Node.js com Express e PostgreSQL para gerenciamento de dados
- **Sistema de Autenticação**: JWT para login seguro
- **Carrinho de Compras**: Gerenciamento de pedidos com itens clássicos e personalizados
- **Programa de Fidelidade**: Sistema de pontos que pode ser trocado por recompensas

## Tecnologias

### Frontend
- Vue 3 (Composition API)
- Vuetify 3 (UI Components)
- Vue Router 4 (Navegação)
- Axios (Requisições HTTP)
- Vite (Build Tool)

### Backend
- Node.js
- Express.js
- PostgreSQL
- Knex.js (Query Builder)
- JWT (JSON Web Tokens)
- Swagger (swagger-ui-express, swagger-jsdoc) - Documentação da API

## Estrutura do Projeto

```
bug-cafe/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Componentes compartilhados
│   │   │   │   ├── AppHeader.vue
│   │   │   │   └── AppFooter.vue
│   │   │   ├── home/            # Componentes da home
│   │   │   │   ├── HeroBanner.vue
│   │   │   │   ├── ClassicCoffeesCarousel.vue
│   │   │   │   ├── MostFamousCoffees.vue
│   │   │   │   ├── BuildCoffees.vue
│   │   │   │   └── ShoppingCartView.vue
│   │   │   └── auth/            # Autenticação
│   │   │       ├── LoginRegistration.vue
│   │   │       └── Profile.vue
│   │   ├── views/               # Views estáticas
│   │   │   ├── AboutView.vue
│   │   │   ├── ContactView.vue
│   │   │   ├── TermsOfServiceView.vue
│   │   │   └── NotFoundView.vue
│   │   ├── composables/         # Lógica reutilizável
│   │   │   ├── useAuth.js
│   │   │   ├── useCart.js
│   │   │   └── useSnackbar.js
│   │   ├── services/            # Serviços de API
│   │   │   └── apiService.js
│   │   ├── utils/               # Utilitários
│   │   │   └── formatters.js
│   │   ├── routes/              # Rotas Vue Router
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── src/
    │   ├── config/              # Configurações
    │   │   └── swagger.js       # Documentação Swagger
    │   ├── controllers/
    │   ├── services/
    │   ├── routes/
    │   ├── middleware/
    │   ├── database/
    │   └── server.js
    ├── package.json
    └── knexfile.js
```

## Funcionalidades

### Funcionalidades Principais
- ✅ Navegação por menu de cafés clássicos
- ✅ Carrossel de cafés mais famosos
- ✅ Personalização de cafés (base, tamanho, sabores, extras)
- ✅ Carrinho de compras com gerenciamento de itens
- ✅ Sistema de autenticação (login/registro)
- ✅ Perfil do usuário com histórico de pedidos
- ✅ Sistema de pontos de fidelidade
- ✅ Páginas estáticas (Sobre, Contato, Termos)

### Recursos Técnicos
- ✅ Interface responsiva (mobile-first)
- ✅ Atributos `data-testid` para automação de testes
- ✅ Snackbar global para feedback do usuário
- ✅ Composables para lógica reutilizável
- ✅ Centralização de chamadas de API
- ✅ Proteção de rotas com navigation guards

## Instalação

### Pré-requisitos
- Node.js 18+ (recomendado Node 20+)
- PostgreSQL 12+
- npm ou yarn

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

### Configuração do Banco de Dados
1. Crie um banco de dados PostgreSQL
2. Configure as variáveis de ambiente no backend (`.env`):
```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=bug_cafe
PORT=3000
JWT_SECRET=sua_chave_secreta
```
3. Execute as migrations:
```bash
cd backend
npx knex migrate:latest
```

## Execução

### Backend
```bash
cd backend
npm start
```
O backend estará rodando em `http://localhost:3000`

### Frontend
```bash
cd frontend
npm run dev
```
O frontend estará rodando em `http://localhost:5173`

## Documentação da API

O projeto possui documentação automática da API através do **Swagger/OpenAPI**, facilitando o teste e integração dos endpoints.

### Acessar a Documentação

Após iniciar o backend, acesse:
```
http://localhost:3000/api-docs
```

### Recursos da Documentação

- **Interface interativa**: Teste os endpoints diretamente pelo navegador
- **Schemas detalhados**: Estrutura completa de request/response
- **Autenticação JWT**: Suporte para testar endpoints protegidos
- **Tags organizadas**: Agrupamento por funcionalidade (Autenticação, Produtos, Carrinho, etc.)

### Endpoints Documentados

- **Autenticação**: register, login, forgot-password, reset-password
- **Produtos**: classic-coffees, most-famous, customizations
- **Carrinho**: add-classic, get cart, update quantity, remove item
- **Café Personalizado**: add-custom
- **Perfil**: get profile
- **Pedidos**: checkout

## Testes

O projeto está preparado para automação de testes com atributos `data-testid` em todos os componentes principais. Os identificadores seguem o padrão `kebab-case` e são descritivos para facilitar a escrita de testes.

### Padrão de data-testid
- Páginas: `{nome}-page` (ex: `about-page`)
- Títulos: `{nome}-title` (ex: `shopping-cart-title`)
- Cards/Containers: `{nome}-card`, `{nome}-section`
- Botões: `{ação}-button` (ex: `cart-checkout-button`)
- Inputs: `{form}-{campo}-input` (ex: `login-email-input`)
- Itens dinâmicos: `{item}-{id}` (ex: `cart-item-{itemId}`)

## API Endpoints

> **Nota**: Para documentação completa e interativa da API, acesse [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Autenticação
- `POST /api/auth/register` - Registro de usuário
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/forgot-password` - Solicitar recuperação de senha
- `POST /api/auth/reset-password` - Redefinir senha

### Produtos
- `GET /api/classic-coffees` - Lista de cafés clássicos
- `GET /api/most-famous` - Lista de cafés mais famosos
- `GET /api/customizations` - Opções de personalização

### Carrinho
- `GET /api/cart` - Obter carrinho
- `POST /api/cart/add-classic` - Adicionar café clássico ao carrinho
- `PUT /api/cart/items/:itemId` - Atualizar quantidade
- `DELETE /api/cart/items/:itemId` - Remover item

### Café Personalizado
- `POST /api/custom-coffee/add-custom` - Adicionar café personalizado ao carrinho

### Perfil
- `GET /api/profile` - Obter perfil e histórico de pedidos (requer autenticação)

### Pedidos
- `POST /api/orders/checkout` - Finalizar pedido (checkout)

## Sistema de Pontos

### Regras
- 1 ponto a cada R$10 gastos
- Recompensas disponíveis:
  - 50 pontos = 1 Café Filtrado Grátis
  - 100 pontos = 1 Cappuccino Grande
  - 150 pontos = 1 Combo (Café + Pão de Queijo)

### Acúmulo
- Pontos são calculados automaticamente no checkout
- Saldo disponível no perfil do usuário

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto é um projeto fictício para fins de estudo e prática de testes (QA).
