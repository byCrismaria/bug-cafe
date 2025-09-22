# Usa a imagem oficial do Node.js como base
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json yarn.lock ./

# Instala as dependências usando o Yarn
RUN yarn install

# Copia todo o código da sua aplicação
COPY . .

# Expõe a porta que a aplicação Express irá usar
EXPOSE 3000

# O comando para rodar a aplicação é definido no docker-compose