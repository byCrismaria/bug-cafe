# Adicionar dados iniciais usando arquivos Seeder. 

Um **seeder** é um script que popula seu banco de dados com dados de teste ou dados iniciais. 

### Passo a passo para criar o seeder com Knex.js

1.  **Crie a pasta para os seeders:**
    Assim como nas migrações, o Knex.js precisa de uma pasta para os seeders. Se você seguiu o `knexfile.js` que eu sugeri, o comando para criar a pasta é:

    ```bash
    mkdir -p db/seeds
    ```

2.  **Crie o arquivo seeder:**
    Agora, gere o arquivo que irá adicionar os dados. Navegue para a pasta `backend` e execute o comando:

    ```bash
    npx knex seed:make initial_data
    ```

    Isso criará um arquivo com um nome no formato `initial_data.js` na pasta `db/seeds`.

3.  **Adicionando os dados ao arquivo seeder:**
    Abra o arquivo recém-criado e adicione a lógica para inserir os dados nas tabelas `products` e `customization_options`. A função `exports.seed` é onde a inserção de dados acontece.

    ```javascript
    exports.seed = function(knex) {
      // Deleta todos os dados existentes nas tabelas na ordem correta
      return knex('order_item_customizations').del()
        .then(function () {
          return knex('customization_options').del();
        })
        .then(function () {
          return knex('order_items').del();
        })
        .then(function () {
          return knex('orders').del();
        })
        .then(function () {
          return knex('products').del();
        })
        .then(function () {
          return knex('users').del();
        })
        .then(function () {
          // Insere os dados de produtos
          return knex('products').insert([
            {
              name: 'Espresso Tradicional',
              price: 6.00,
              stock_quantity: 50,
              is_customizable: false
            },
            {
              name: 'Café Filtrado (Coado)',
              price: 5.00,
              stock_quantity: 100,
              is_customizable: false
            },
            {
              name: 'Cappuccino Italiano',
              price: 9.50,
              stock_quantity: 40,
              is_customizable: false
            },
            {
              name: 'Latte Macchiato',
              price: 10.00,
              stock_quantity: 35,
              is_customizable: false
            },
            {
              name: 'Mocha Especial',
              price: 12.00,
              stock_quantity: 25,
              is_customizable: false
            },
            {
              name: 'Café Base (Personalizado)',
              price: 8.00,
              stock_quantity: 999,
              is_customizable: true
            }
          ]);
        })
        .then(function () {
          // Insere os dados de opções de personalização
          return knex('customization_options').insert([
            { category: 'Tamanho', name: 'Pequeno', additional_price: 0.00 },
            { category: 'Tamanho', name: 'Médio', additional_price: 1.50 },
            { category: 'Tamanho', name: 'Grande', additional_price: 2.50 },
            { category: 'Leite', name: 'Integral', additional_price: 0.00 },
            { category: 'Leite', name: 'Desnatado', additional_price: 0.00 },
            { category: 'Leite', name: 'Vegetal (Amêndoa)', additional_price: 1.00 }
          ]);
        });
    };
    ```

4.  **Execute o seeder:**
    Com o Docker Compose rodando (`docker-compose up -d`), vá para a pasta `backend` e execute o comando para popular o banco de dados:

    ```bash
    npx knex seed:run
    ```

    Isso irá inserir os dados nas tabelas. O método `knex('tabela').del()` serve para deletar os dados existentes antes de inseri-los novamente, o que é útil para garantir que não tenha dados duplicados cada vez que rodar o seeder.
