 # Configuração e uso do Migrations do banco de dados

 Usar "migrations" é a abordagem profissional e moderna para criar e gerenciar a estrutura do seu banco de dados. Em vez de executar SQL manualmente, você escreve o código que define as tabelas, e a ferramenta de migração se encarrega de aplicar essas mudanças de forma controlada.

A principal vantagem é que seu esquema de banco de dados fica versionado junto com o seu código. Isso facilita o trabalho em equipe e a implantação em diferentes ambientes (desenvolvimento, testes, produção).

## Node.js com Knex.js

Knex.js é um construtor de SQL e uma ferramenta de migração muito popular no ecossistema JavaScript/TypeScript, e como neste projeto estamos utilizando o Node.js vamos utilizar essa ferramenta.

### Passo 1: Instalar o Knex.js e o driver do banco de dados


```Bash
yarn add knex pg
```

### Passo 2: Configurar o Knex.js

1. Crie o arquivo de configuração knexfile.js
Na pasta backend, crie um arquivo chamado knexfile.js. Este arquivo dirá ao Knex.js como se conectar ao seu banco de dados e onde encontrar as migrações.

2. Adicione o seguinte código:


```JavaScript

const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'bugcafe'
    },
    migrations: {
      directory: path.join(__dirname, 'db/migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db/seeds')
    }
  }
};
```
3. Crie as pastas para as migrações:

No terminal, a partir da pasta backend, crie as pastas db e migrations dentro dela:


```Bash
mkdir -p db/migrations
```
O comando -p cria os diretórios pai, se necessário.

### Passo 3: Criar o arquivo de migração

Será criado o arquivo que conterá as instruções SQL para criar suas tabelas.

1. Gere o arquivo de migração:
No terminal, a partir da pasta backend, execute o comando:


```Bash
npx knex migrate:make create_tables
```
Isso irá criar um arquivo com um nome no formato AAAA_MM_DD_HHmmss_create_tables.js na pasta db/migrations.

2. Edite o arquivo de migração:

Abra o arquivo recém-criado e adicione a lógica para criar suas tabelas users, products, customization_options, orders, order_items e order_item_customizations.

Exemplo do conteúdo do arquivo de migração:


```JavaScript

exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('user_id').primary();
      table.string('full_name', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('password_hash', 255).notNullable();
      table.integer('points_balance').defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('products', table => {
      table.increments('product_id').primary();
      table.string('name', 100).notNullable().unique();
      table.text('description');
      table.decimal('price', 10, 2).notNullable();
      table.integer('stock_quantity').notNullable().defaultTo(0);
      table.string('image_url', 255);
      table.boolean('is_customizable').defaultTo(false);
    })
    // Adicione aqui as outras tabelas
    .createTable('customization_options', table => {
        table.increments('option_id').primary();
        table.string('category', 50).notNullable();
        table.string('name', 100).notNullable();
        table.decimal('additional_price', 10, 2).defaultTo(0.00);
    })
    .createTable('orders', table => {
        table.increments('order_id').primary();
        table.integer('user_id').unsigned();
        table.timestamp('order_date').defaultTo(knex.fn.now());
        table.decimal('total_price', 10, 2).notNullable();
        table.string('status', 50).defaultTo('Pendente');
        table.foreign('user_id').references('user_id').inTable('users');
    })
    .createTable('order_items', table => {
        table.increments('order_item_id').primary();
        table.integer('order_id').unsigned().notNullable();
        table.integer('product_id').unsigned().notNullable();
        table.integer('quantity').notNullable();
        table.decimal('unit_price', 10, 2).notNullable();
        table.decimal('subtotal', 10, 2).notNullable();
        table.foreign('order_id').references('order_id').inTable('orders');
        table.foreign('product_id').references('product_id').inTable('products');
    })
    .createTable('order_item_customizations', table => {
        table.integer('order_item_id').unsigned().notNullable();
        table.integer('option_id').unsigned().notNullable();
        table.primary(['order_item_id', 'option_id']);
        table.foreign('order_item_id').references('order_item_id').inTable('order_items');
        table.foreign('option_id').references('option_id').inTable('customization_options');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('order_item_customizations')
    .dropTableIfExists('order_items')
    .dropTableIfExists('orders')
    .dropTableIfExists('customization_options')
    .dropTableIfExists('products')
    .dropTableIfExists('users');
};
```

### Passo 4: Executar a Migração
1. Certifique-se de que o seu contêiner do banco de dados está rodando.
Se não estiver, navegue para a pasta raiz (bug-cafe) e execute:


```Bash
docker-compose up -d
```

O parâmetro -d roda em modo "detached" (em segundo plano), liberando seu terminal.

2. Execute a migração:
Navegue para a pasta backend e execute o comando:


```Bash
npx knex migrate:latest´
```
Isso irá aplicar todas as migrações pendentes no banco de dados, criando as tabelas definidas.



