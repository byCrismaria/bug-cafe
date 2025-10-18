
### Endpoints da API

Abaixo estão todos os endpoints criados com o método HTTP e uma breve descrição de sua função. Note que a maioria das rotas do carrinho e todas as de `profile` e `orders` exigem autenticação com um token JWT.


### Autenticação e Perfil de Usuário

| Método | URL | Descrição | Corpo da Requisição | Observações |
|---|---|---|---|---|
| **`POST`** | `/api/auth/register` | Cadastra um novo usuário. | `{"name": "string", "email": "string", "password": "string", "confirmPassword": "string"}` | Não requer autenticação. |
| **`POST`** | `/api/auth/login` | Autentica o usuário e retorna um token JWT. | `{"email": "string", "password": "string"}` | Não requer autenticação. O token retornado deve ser usado nas requisições protegidas. |
| **`GET`** | `/api/profile` | Retorna o perfil do usuário logado e o histórico de pedidos. | - | Requer autenticação com token JWT. |

### Catálogo de Produtos e Personalizações

| Método | URL | Descrição | Corpo da Requisição | Observações |
|---|---|---|---|---|
| **`GET`** | `/api/classic-coffees` | Retorna a lista de cafés clássicos. | - | Não requer autenticação. |
| **`GET`** | `/api/most-famous` | Retorna a lista dos cafés mais vendidos. | - | Não requer autenticação. |
| **`GET`** | `/api/customizations` | Retorna as opções disponíveis para cafés personalizados. | - | Não requer autenticação. |

### Carrinho de Compras (Endpoints Atualizados - RESTful)

| Método | URL | Descrição | Corpo da Requisição | Observações |
|---|---|---|---|---|
| **`POST`** | `/api/cart/add-classic` | Adiciona um café clássico ao carrinho. | `{"productId": "number", "quantity": "number", "cartId": "string"}` | Autenticação com JWT é opcional. Se não for enviado o JWT, `cartId` é obrigatório. |
| **`POST`** | `/api/custom-coffee/add-custom` | Adiciona um café personalizado ao carrinho. | `{"cartId": "string", "customizationIds": "array de numbers"}` | **Atenção:** Esta rota requer autenticação com JWT. `cartId` é obrigatório para usuários não logados. |
| **`GET`** | `/api/cart` | Lista os itens no carrinho do usuário. | - | Autenticação com JWT é opcional. Se não for enviado o JWT, `cartId` é obrigatório como query parameter (`?cartId=...`). |
| **`PUT`** | `/api/cart/items/:itemId` | Altera a quantidade de um item no carrinho. | `{"newQuantity": "number", "cartId": "string"}` | Autenticação com JWT é opcional. Se não for enviado o JWT, `cartId` é obrigatório. `itemId` vem na URL. |
| **`DELETE`** | `/api/cart/items/:itemId` | Remove um item do carrinho. | `{"cartId": "string"}` | Autenticação com JWT é opcional. Se não for enviado o JWT, `cartId` é obrigatório. `itemId` vem na URL. |


### Finalizar Pedido

| Método | URL | Descrição | Corpo da Requisição | Observações |
|---|---|---|---|---|
| **`POST`** | `/api/orders/checkout` | Finaliza um pedido pendente e adiciona pontos ao saldo do usuário. | `{"orderId": "number"}` | Requer autenticação com token JWT. |
