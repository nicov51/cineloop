# Utilise une image Node.js légère
FROM node:20-alpine

# Définit le dossier de travail dans le conteneur
WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code source
COPY . .

# Expose le port sur lequel l'app va tourner
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]