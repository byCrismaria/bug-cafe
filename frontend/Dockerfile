FROM node:20-alpine

#Define o diretório de trabalho dentro do contêiner
WORKDIR /app

#Copia os arquivos de dependências
COPY package.json package-lock.json ./

#Instala as dependências
RUN npm install

COPY . .

EXPOSE 5173

