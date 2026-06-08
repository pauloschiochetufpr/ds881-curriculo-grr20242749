FROM node:20-alpine

WORKDIR /app

# Copia arquivos de definição de pacotes
COPY package.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Exibe na porta 8080 do contêiner
EXPOSE 8080

CMD ["npm", "start"]
