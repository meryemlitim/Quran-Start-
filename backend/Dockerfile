FROM node:20-alpine

# Dossier de travail dans le container
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du projet
COPY . .

# Build TypeScript
RUN npm run build

# Exposer le port de l'API
EXPOSE 3000

# Lancer l'API en mode production
CMD ["npm", "run", "start:prod"]