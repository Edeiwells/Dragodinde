FROM node:18-alpine

WORKDIR /app

# Copie des fichiers de dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm ci --only=production

# Copie du code source
COPY . .

# Exposition du port
EXPOSE 3001

# Commande de démarrage
CMD ["npm", "start"]
