# Cafeteria "Bug Café"

## 1. Página Inicial / Menu Principal

- **Banner Rotativo:** Imagens apetitosas de cafés e ambientes da cafeteria.
- **Boas-Vindas:** Mensagem convidativa, talvez destacando a promoção do dia.

### Cafés Clássicos (Seção "Nossos Clássicos")

Cada café teria uma foto, nome e preço fixo.

**Exemplos:**
- Espresso Tradicional: R$ 6,00
- Café Filtrado (Coado): R$ 5,00
- Cappuccino Italiano: R$ 9,50
- Latte Macchiato: R$ 10,00
- Mocha Especial: R$ 12,00

- Botão "Adicionar ao Carrinho" para cada item.

### **Requisitos Funcionais**

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

### **Requisitos Não-Funcionais**

**RNF01:** O sistema deve garantir que os preços dos cafés clássicos permaneçam consistentes e imutáveis por clientes.

**RNF02:** O sistema deve realizar verificações de estoque em tempo real para garantir accuratez na disponibilidade dos produtos.

**RNF03:** A interface deve fornecer feedback visual imediato através de estados desabilitados para botões de itens indisponíveis.

**RNF04:** O sistema deve manter a usabilidade permitindo que usuários não autenticados iniciem o processo de compra.

**RNF05:** As mensagens do sistema devem seguir formatos JSON padronizados para comunicação frontend-backend.

**RNF06:** As notificações do frontend devem ser discretas e não intrusivas para a experiência do usuário.

**RNF07:** O sistema deve garantir que alertas e pop-ups sejam claros e informativos para orientar o usuário adequadamente.

---

### Cafés Mais Famosos (Quadro "Os Mais Pedidos da Semana")

Uma lista dinâmica (que simula dados reais) dos 3 a 5 cafés mais pedidos. Deve mostrar o nome do café e talvez uma pequena descrição ou imagem.

**Exemplo:**
- Latte Caramelo: O preferido para adoçar o dia!
- Expresso Duplo: Para um despertar intenso.
- Cappuccino Trufado: Uma explosão de sabor.

### **Requisitos Funcionais**

**RF15:** O sistema deve gerar dinamicamente a lista de cafés "Mais Famosos" com base nos pedidos reais dos últimos 7 dias.

**RF16:** O sistema deve consultar o banco de dados de pedidos para identificar os 3 a 5 itens mais vendidos na semana.

**RF17:** O sistema deve exibir as informações dos cafés mais vendidos (nome, descrição) na seção "Os Mais Pedidos da Semana".

**RF18:** O sistema deve retornar mensagem de sucesso no formato JSON `{ "status": "success", "data": [ { "name": "Latte Caramelo", "description": "O preferido para adoçar o dia!" }, ... ] }` ao recuperar os dados com sucesso.

**RF19:** O sistema deve exibir normalmente a lista de cafés mais pedidos no frontend quando os dados estiverem disponíveis.

**RF20:** O sistema deve retornar mensagem de erro no formato JSON `{ "status": "error", "message": "Não foi possível carregar a lista de cafés mais pedidos." }` quando não encontrar dados.

**RF21:** O sistema deve exibir mensagem amigável "Em breve, os cafés mais pedidos da semana aparecerão aqui!" no frontend quando não houver dados disponíveis.

---

### **Requisitos Não-Funcionais**

**RNF08:** O sistema deve processar e analisar dados de vendas em tempo quase real para garantir a atualidade das informações exibidas.

**RNF09:** A consulta ao banco de dados deve ser otimizada para performance, considerando o grande volume de dados de pedidos.

**RNF10:** O sistema deve garantir a escalabilidade para processar estatísticas de vendas mesmo com aumento significativo no volume de pedidos.

**RNF11:** A interface deve fornecer uma experiência de usuário consistente, exibindo mensagens amigáveis em caso de dados indisponíveis.

**RNF12:** O formato de resposta JSON deve manter consistência com outros endpoints do sistema.

**RNF13:** O algoritmo de seleção dos itens mais vendidos deve ser eficiente e preciso para garantir a confiabilidade das informações exibidas.

**RNF14:** O sistema deve garantir a disponibilidade dos dados históricos de pedidos para permitir a geração precisa das estatísticas semanais.

---

## 2. Seção "Monte Seu Café" (Crie seu Sabor)

Parte interativa onde o cliente irá personalizar o pedido, ou seja, pode criar seu café de acordo com suas preferências, considerando os igredientes. 

- **Escolha da Base:**
  - Tipo de café (Espresso, Filtrado, Descafeinado)
  - Tamanho (Pequeno, Médio, Grande)
- **Adicione Sabores / Xaropes (com preço adicional):**
  - Baunilha, Caramelo, Avelã, Chocolate, Menta
- **Opções de aditivo:** chantilly, calda de chocolate, canela em pó
- **Tipo de Leite:** Integral, Desnatado, Leite Vegetal (Amêndoas, Soja, Aveia - com preço adicional)

- Resumo do Pedido: À medida que o cliente seleciona as opções, um painel lateral irá atualizar o resumo do pedido e o preço total em tempo real.
- Botão "Adicionar ao Carrinho".

### **Requisitos Funcionais**

**RF22:** O sistema deve definir o preço inicial do café personalizado com base na seleção de "Base" e "Tamanho".

**RF23:** O sistema deve adicionar valores pré-definidos ao preço final para cada "Aditivo" ou "Tipo de Leite" não padrão selecionado.

**RF24:** O sistema deve atualizar em tempo real o resumo do pedido e o preço total no frontend conforme o cliente seleciona as opções.

**RF25:** O sistema deve habilitar o botão "Adicionar ao Carrinho" apenas após a seleção de uma Base e um Tamanho.

**RF26:** O sistema deve retornar mensagem de sucesso no formato JSON `{ "status": "success", "message": "Seu café personalizado foi adicionado ao carrinho com sucesso.", "item_id": 456 }` ao adicionar o café personalizado.

**RF27:** O sistema deve exibir pop-up ou notificação "Seu café personalizado foi para o carrinho!" no frontend em caso de sucesso.

**RF28:** O sistema deve retornar mensagem de erro no formato JSON `{ "status": "error", "message": "Não foi possível montar seu café. Por favor, tente novamente." }` em caso de falha.

**RF29:** O sistema deve exibir mensagem "Ops! Algo deu errado ao montar seu café. Recarregue a página e tente novamente." no frontend em caso de erro.

---

### **Requisitos Não-Funcionais**

**RNF15:** O sistema deve garantir que os preços dos aditivos e tipos de leite permaneçam fixos e consistentes.

**RNF16:** As atualizações de preço em tempo real devem ocorrer com latência mínima para garantir uma experiência fluida ao usuário.

**RNF17:** A interface deve fornecer feedback visual claro sobre o estado do botão "Adicionar ao Carrinho" (habilitado/desabilitado).

**RNF18:** O cálculo do preço total deve ser preciso e refletir instantaneamente todas as seleções do usuário.

**RNF19:** O sistema deve manter a consistência nos formatos de mensagens JSON entre frontend e backend.

**RNF20:** As notificações do frontend devem ser intuitivas e fornecer orientação adequada em caso de sucesso ou erro.

**RNF21:** A experiência de montagem do café deve ser intuitiva e responsiva, mesmo com múltiplas seleções simultâneas.

---

## 3. Carrinho de Compras

- **Lista de Itens:** Todos os cafés adicionados (clássicos e personalizados), com quantidade, preço unitário e subtotal.
- **Botões de Ação:**
  - Ajustar quantidade (+/-)
  - Remover item
- **Total do Pedido**

- Botão "Continuar para Pagamento"

### **Requisitos Funcionais**

**RF30:** O sistema deve calcular o subtotal de cada item como (preço_unitário * quantidade).

**RF31:** O sistema deve calcular o total do pedido como a soma de todos os subtotais dos itens.

**RF32:** O sistema deve permitir ajustar a quantidade de um item no carrinho, atualizando automaticamente o subtotal e o total.

**RF33:** O sistema deve permitir remover itens do carrinho, atualizando automaticamente o total do pedido.

**RF34:** O sistema deve habilitar o botão "Continuar para Pagamento" apenas se o carrinho não estiver vazio.

**RF35:** O sistema deve redirecionar usuários não logados para a tela de login/cadastro ao clicar em "Continuar para Pagamento".

**RF36:** O sistema deve retornar mensagem de sucesso no formato JSON `{ "status": "success", "message": "Quantidade do item atualizada.", "new_subtotal": 24.00, "new_total": 45.50 }` ao atualizar quantidade.

**RF37:** O sistema deve atualizar em tempo real os valores de subtotal e total no frontend após alteração de quantidade.

**RF38:** O sistema deve retornar mensagem de sucesso no formato JSON `{ "status": "success", "message": "Item removido do carrinho.", "new_total": 35.50 }` ao remover item.

**RF39:** O sistema deve remover visualmente o item da lista e atualizar o total no frontend após remoção.

**RF40:** O sistema deve retornar mensagem de erro no formato JSON `{ "status": "error", "message": "O carrinho está vazio." }` para operações com carrinho vazio.

**RF41:** O sistema deve exibir mensagem "Seu carrinho está vazio. Adicione alguns cafés deliciosos!" no frontend para carrinho vazio.

**RF42:** O sistema deve exibir alerta "Você precisa estar logado para continuar. Faça login ou cadastre-se para finalizar seu pedido." para usuários não autenticados.

---

### **Requisitos Não-Funcionais**

**RNF22:** O sistema deve realizar cálculos matemáticos com precisão para garantir valores corretos de subtotal e total.

**RNF23:** As atualizações de valores no frontend devem ocorrer em tempo real com desempenho otimizado.

**RNF24:** A interface deve fornecer feedback visual imediato sobre o estado do botão "Continuar para Pagamento" baseado no conteúdo do carrinho.

**RNF25:** O redirecionamento para login/cadastro deve ser realizado de forma segura e intuitiva.

**RNF26:** As mensagens de erro devem ser claras e orientar o usuário adequadamente sobre as próximas ações.

**RNF27:** O sistema deve manter a consistência nos formatos de resposta JSON para todas as operações do carrinho.

**RNF28:** A experiência do usuário no carrinho deve ser responsiva e funcionar sem necessidade de recarregar a página.

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

### **Requisitos Funcionais**

**RF43:** O sistema deve exigir os campos obrigatórios: Nome Completo, E-mail, Senha e Confirmação de Senha no cadastro.

**RF44:** O sistema deve validar que o E-mail é único no banco de dados durante o cadastro.

**RF45:** O sistema deve verificar se a Senha e Confirmação de Senha são idênticas.

**RF46:** O sistema deve impor requisitos mínimos de segurança para a senha (mínimo 8 caracteres, letras e números).

**RF47:** O sistema deve atribuir automaticamente saldo de 0 pontos para novos usuários cadastrados.

**RF48:** O sistema deve validar que E-mail e Senha correspondem a um registro existente durante o login.

**RF49:** O sistema deve retornar mensagem de sucesso no formato JSON `{ "status": "success", "message": "Cadastro realizado com sucesso. Bem-vindo(a)!" }` para cadastro bem-sucedido.

**RF50:** O sistema deve redirecionar para página de perfil ou inicial com mensagem personalizada após cadastro bem-sucedido.

**RF51:** O sistema deve retornar mensagem de erro no formato JSON `{ "status": "error", "message": "Este e-mail já está cadastrado." }` para e-mail duplicado.

**RF52:** O sistema deve exibir mensagem "Este e-mail já está em uso. Tente outro ou faça login." no frontend para e-mail duplicado.

**RF53:** O sistema deve retornar mensagem de erro no formato JSON `{ "status": "error", "message": "As senhas não coincidem." }` para senhas não coincidentes.

**RF54:** O sistema deve exibir mensagem "As senhas digitadas não são iguais. Por favor, verifique." no frontend para senhas não coincidentes.

**RF55:** O sistema deve retornar mensagem de sucesso no formato JSON `{ "status": "success", "message": "Login realizado com sucesso." }` para login bem-sucedido.

**RF56:** O sistema deve redirecionar para página inicial ou anterior com mensagem de sucesso após login.

**RF57:** O sistema deve retornar mensagem de erro no formato JSON `{ "status": "error", "message": "E-mail ou senha inválidos." }` para credenciais inválidas.

**RF58:** O sistema deve exibir mensagem "E-mail ou senha incorretos. Por favor, tente novamente." no frontend para credenciais inválidas.

---

### **Requisitos Não-Funcionais**

**RNF29:** O sistema deve garantir a segurança das senhas através de criptografia adequada no armazenamento.

**RNF30:** A validação de e-mail único deve ser eficiente e escalável mesmo com grande volume de usuários.

**RNF31:** Os requisitos de segurança da senha devem seguir práticas recomendadas de segurança da informação.

**RNF32:** O processo de autenticação deve ser seguro, protegendo contra ataques de força bruta.

**RNF33:** As mensagens de erro não devem revelar informações sensíveis sobre a existência de contas.

**RNF34:** O redirecionamento pós-login/cadastro deve ser intuitivo e proporcionar boa experiência do usuário.

**RNF35:** O sistema deve manter consistência nos formatos de resposta JSON para todas operações de autenticação.

**RNF36:** A interface de usuário deve fornecer feedback claro e imediato sobre a validação dos campos durante o preenchimento.

---

## 5. Página de Perfil (Após o Login)

- **Informações do Usuário:** Nome, e-mail
- **Meus Pontos:** Um contador mostrando a quantidade de pontos acumulados
- **Histórico de Pedidos:** Lista dos pedidos anteriores, com data, itens e valor total
- **Opção "Trocar Pontos":** Levaria para uma área onde o usuário poderia ver as recompensas disponíveis (ex: 50 pontos = 1 café filtrado grátis, 100 pontos = 1 cappuccino grande)

### Requisitos Funcionais (RF) - Cadastro/Login de Usuário

**RF43:** O sistema deve exigir os campos obrigatórios (Nome Completo, E-mail, Senha e Confirmação de Senha) para cadastro.

**RF44:** O sistema deve validar a unicidade do e-mail no banco de dados durante o cadastro.

**RF45:** O sistema deve verificar se a Senha e Confirmação de Senha são idênticas.

**RF46:** O sistema deve impor requisitos mínimos de segurança para a senha (mínimo 8 caracteres, incluindo letras e números).

**RF47:** O sistema deve atribuir automaticamente saldo de 0 pontos para novos usuários cadastrados.

**RF48:** O sistema deve validar a correspondência entre e-mail e senha com os registros do banco de dados durante o login.

**RF49:** O sistema deve retornar mensagem de sucesso no formato JSON específico para cadastro bem-sucedido.

**RF50:** O sistema deve redirecionar o usuário para a página de perfil ou página inicial com mensagem personalizada após cadastro.

**RF51:** O sistema deve retornar mensagem de erro específica para e-mail já cadastrado.

**RF52:** O sistema deve exibir mensagem de frontend adequada para e-mail duplicado.

**RF53:** O sistema deve retornar mensagem de erro específica para senhas não coincidentes.

**RF54:** O sistema deve exibir mensagem de frontend adequada para senhas não coincidentes.

**RF55:** O sistema deve retornar mensagem de sucesso específica para login bem-sucedido.

**RF56:** O sistema deve redirecionar o usuário para a página inicial ou anterior com mensagem de sucesso após login.

**RF57:** O sistema deve retornar mensagem de erro específica para credenciais inválidas.

**RF58:** O sistema deve exibir mensagem de frontend adequada para credenciais inválidas.

---

### Requisitos Não-Funcionais (RNF) - Cadastro/Login de Usuário

**RNF29:** O sistema deve garantir a segurança das senhas através de criptografia adequada no armazenamento.

**RNF30:** A validação de e-mail único deve ser eficiente e escalável, mesmo com grande volume de usuários.

**RNF31:** Os requisitos de segurança da senha devem seguir práticas recomendadas de segurança da informação.

**RNF32:** O processo de autenticação deve ser seguro, implementando proteções contra ataques de força bruta.

**RNF33:** As mensagens de erro não devem revelar informações sensíveis sobre a existência de contas específicas no sistema.

**RNF34:** O redirecionamento pós-login/cadastro deve ser intuitivo e proporcionar uma boa experiência do usuário.

**RNF35:** O sistema deve manter consistência nos formatos de resposta JSON para todas as operações de autenticação.

**RNF36:** A interface do usuário deve fornecer feedback claro e imediato sobre a validação dos campos durante o preenchimento do formulário.

**RNF37:** O sistema deve garantir a confidencialidade dos dados de autenticação durante a transmissão (utilizando HTTPS).

**RNF38:** A performance do sistema de autenticação deve garantir tempos de resposta rápidos mesmo durante picos de acesso.