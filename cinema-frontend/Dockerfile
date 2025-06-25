# /cinema-frontend/Dockerfile

# --- Estágio 1: Build ---
FROM --platform=linux/amd64 node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Argumento de build para a URL da API
ARG NEXT_PUBLIC_API_URL

# Define a variável de ambiente durante o build
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# --- PASSO DE DEBUG ---
# Vamos imprimir a variável para confirmar que o Docker a recebeu.
# Este comando também ajuda a "quebrar" o cache da linha seguinte.
RUN echo "A API_URL durante o build é: $NEXT_PUBLIC_API_URL"

# Compila o projeto
RUN npm run build

# --- Estágio 2: Produção (Nginx) ---
FROM --platform=linux/amd64 nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]