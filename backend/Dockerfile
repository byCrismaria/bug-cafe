# Usa a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de definição de dependências para o contêiner
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o restante do código da aplicação para o contêiner
COPY . .

# Expõe a porta que a aplicação Express irá usar
EXPOSE 3000

# Comando para iniciar o servidor (em ambiente de desenvolvimento)
# Se estiver usando nodemon, use a linha de baixo
CMD ["npm", "run", "dev"]