# --- Estágio 1: Build ---
# Prepara um ambiente temporário com todas as ferramentas para compilar o projeto
FROM --platform=linux/amd64 node:18-alpine AS build

WORKDIR /app

# Copia e instala TODAS as dependências (de desenvolvimento e de produção)
COPY package*.json ./
RUN npm install

# Copia todo o código-fonte (src, prisma, etc)
COPY . .

# Executa o build, que compila o TypeScript para JavaScript e cria a pasta 'dist'
RUN npm run build


# --- Estágio 2: Produção ---
# Prepara o ambiente final, limpo e otimizado para rodar a aplicação
FROM --platform=linux/amd64 node:18-alpine

WORKDIR /app

# Define o ambiente como produção
ENV NODE_ENV=production

# Copia o package.json para a imagem final
COPY package*.json ./

# Copia o schema do Prisma do estágio de build.
# ESSENCIAL que isso venha ANTES do 'npm install'
COPY --from=build /app/prisma ./prisma

# Instala SOMENTE as dependências de produção.
# Isso roda o 'prisma generate' automaticamente de forma correta.
RUN npm install --omit=dev

# Copia a pasta 'dist' inteira, já compilada, do estágio de build
COPY --from=build /app/dist ./dist

# Expõe a porta que a aplicação vai usar
EXPOSE 3001

# --- COMANDO FINAL ---
# Executa a aplicação diretamente pelo Node, usando o caminho correto do arquivo.
# Este é o ponto mais crucial para resolver o seu erro.
CMD sh -c "npx prisma migrate deploy && node dist/src/main.js"
