# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm ci --silent

# Copie du code source
COPY . .

# Build de l'application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copie de la configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copie des fichiers buildés
COPY --from=build /app/build /usr/share/nginx/html

# Exposition du port
EXPOSE 3000

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]
