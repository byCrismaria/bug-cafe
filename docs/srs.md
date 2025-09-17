# Protótipo de Frontend: Cafeteria "Grão & Arte"


## 1. Página Inicial / Menu Principal

- **Banner Rotativo:** Imagens apetitosas de cafés e ambientes da cafeteria.
- **Boas-Vindas:** Mensagem convidativa, talvez destacando a promoção do dia.

### Destaques

#### Cafés Clássicos (Seção "Nossos Clássicos")

Cada café teria uma foto, nome e preço fixo.

**Exemplos:**
- Espresso Tradicional: R$ 6,00
- Café Filtrado (Coado): R$ 5,00
- Cappuccino Italiano: R$ 9,50
- Latte Macchiato: R$ 10,00
- Mocha Especial: R$ 12,00

Botão "Adicionar ao Carrinho" para cada item.

##### **Requisitos Funcionais**

**RF05:** O sistema deve manter preços fixos para os cafés clássicos, sem permitir alterações pelos clientes.

**RF06:** O sistema deve verificar a disponibilidade em estoque de cada café clássico antes de permitir a adição ao carrinho.

**RF07:** O sistema deve desabilitar o botão "Adicionar ao Carrinho" para itens indisponíveis no estoque.

**RF08:** O sistema deve validar se o cliente está logado ao clicar no botão "Adicionar ao Carrinho".

**RF09:** O sistema deve permitir que clientes não logados adicionem itens ao carrinho, mas exibir alerta sugerindo criação de conta para ganhar pontos.

**RF10:** O sistema deve exigir login ou cadastro (ou compra sem cadastro) para finalização da compra.

**RF11:** O sistema deve retornar mensagem de sucesso no formato JSON `{ "status": "success", "message": "Item adicionado ao carrinho com sucesso.", "item_id": 123 }` ao adicionar item ao carrinho.

**RF12:** O sistema deve exibir notificação discreta no frontend confirmando a adição do item ao carrinho.

**RF13:** O sistema deve retornar mensagem de erro no formato JSON `{ "status": "error", "message": "O item Espresso Tradicional está temporariamente indisponível." }` para itens indisponíveis.

**RF14:** O sistema deve exibir pop-up ou alerta no frontend informando indisponibilidade do item.

---

##### **Requisitos Não-Funcionais**

**RNF01:** O sistema deve garantir que os preços dos cafés clássicos permaneçam consistentes e imutáveis por clientes.

**RNF02:** O sistema deve realizar verificações de estoque em tempo real para garantir accuratez na disponibilidade dos produtos.

**RNF03:** A interface deve fornecer feedback visual imediato através de estados desabilitados para botões de itens indisponíveis.

**RNF04:** O sistema deve manter a usabilidade permitindo que usuários não autenticados iniciem o processo de compra.

**RNF05:** As mensagens do sistema devem seguir formatos JSON padronizados para comunicação frontend-backend.

**RNF06:** As notificações do frontend devem ser discretas e não intrusivas para a experiência do usuário.

**RNF07:** O sistema deve garantir que alertas e pop-ups sejam claros e informativos para orientar o usuário adequadamente.


#### Cafés Mais Famosos (Quadro "Os Mais Pedidos da Semana")

Uma lista dinâmica (que simula dados reais) dos 3 a 5 cafés mais pedidos. Deve mostrar o nome do café e talvez uma pequena descrição ou imagem.

**Exemplo:**
- Latte Caramelo: O preferido para adoçar o dia!
- Expresso Duplo: Para um despertar intenso.
- Cappuccino Trufado: Uma explosão de sabor.

##### **Requisitos Funcionais**

**RF15:** O sistema deve gerar dinamicamente a lista de cafés "Mais Famosos" com base nos pedidos reais dos últimos 7 dias.

**RF16:** O sistema deve consultar o banco de dados de pedidos para identificar os 3 a 5 itens mais vendidos na semana.

**RF17:** O sistema deve exibir as informações dos cafés mais vendidos (nome, descrição) na seção "Os Mais Pedidos da Semana".

**RF18:** O sistema deve retornar mensagem de sucesso no formato JSON `{ "status": "success", "data": [ { "name": "Latte Caramelo", "description": "O preferido para adoçar o dia!" }, ... ] }` ao recuperar os dados com sucesso.

**RF19:** O sistema deve exibir normalmente a lista de cafés mais pedidos no frontend quando os dados estiverem disponíveis.

**RF20:** O sistema deve retornar mensagem de erro no formato JSON `{ "status": "error", "message": "Não foi possível carregar a lista de cafés mais pedidos." }` quando não encontrar dados.

**RF21:** O sistema deve exibir mensagem amigável "Em breve, os cafés mais pedidos da semana aparecerão aqui!" no frontend quando não houver dados disponíveis.

---

##### **Requisitos Não-Funcionais**

**RNF08:** O sistema deve processar e analisar dados de vendas em tempo quase real para garantir a atualidade das informações exibidas.

**RNF09:** A consulta ao banco de dados deve ser otimizada para performance, considerando o grande volume de dados de pedidos.

**RNF10:** O sistema deve garantir a escalabilidade para processar estatísticas de vendas mesmo com aumento significativo no volume de pedidos.

**RNF11:** A interface deve fornecer uma experiência de usuário consistente, exibindo mensagens amigáveis em caso de dados indisponíveis.

**RNF12:** O formato de resposta JSON deve manter consistência com outros endpoints do sistema.

**RNF13:** O algoritmo de seleção dos itens mais vendidos deve ser eficiente e preciso para garantir a confiabilidade das informações exibidas.

**RNF14:** O sistema deve garantir a disponibilidade dos dados históricos de pedidos para permitir a geração precisa das estatísticas semanais.

---

## 2. Seção "Monte Seu Café" (Crie seu Sabor)

Parte interativa onde o cliente personaliza o pedido.

- **Escolha da Base:**
  - Tipo de café (Espresso, Filtrado, Descafeinado)
  - Tamanho (Pequeno, Médio, Grande)
- **Adicione Sabores / Xaropes (com preço adicional):**
  - Baunilha, Caramelo, Avelã, Chocolate, Menta
- **Opções de aditivo:** chantilly, calda de chocolate, canela em pó
- **Tipo de Leite:** Integral, Desnatado, Leite Vegetal (Amêndoas, Soja, Aveia - com preço adicional)

Resumo do Pedido: À medida que o cliente seleciona as opções, um painel lateral ou inferior atualizaria o resumo do pedido e o preço total em tempo real.

Botão "Adicionar ao Carrinho".

---

## 3. Carrinho de Compras

- **Lista de Itens:** Todos os cafés adicionados (clássicos e personalizados), com quantidade, preço unitário e subtotal.
- **Botões de Ação:**
  - Ajustar quantidade (+/-)
  - Remover item
- **Total do Pedido**
- Botão "Continuar para Pagamento"

---

## 4. Cadastro / Login de Usuário

### Formulário de Cadastro

- Nome Completo
- E-mail
- Senha
- Confirmação de Senha
- Checkbox "Aceito receber novidades e promoções" (opcional)

### Formulário de Login

- E-mail
- Senha
- Link "Esqueceu sua senha?"

**Benefício dos Pontos:**  
Uma pequena mensagem como:  
"Cadastre-se e acumule pontos! A cada R$10 gastos, você ganha 1 ponto. Troque seus pontos por cafés grátis e descontos exclusivos!"

---

## 5. Página de Perfil (Após o Login)

- **Informações do Usuário:** Nome, e-mail
- **Meus Pontos:** Um contador mostrando a quantidade de pontos acumulados
- **Histórico de Pedidos:** Lista dos pedidos anteriores, com data, itens e valor total
- **Opção "Trocar Pontos":** Levaria para uma área onde o usuário poderia ver as recompensas disponíveis (ex: 50 pontos = 1 café filtrado grátis, 100 pontos = 1 cappuccino grande)