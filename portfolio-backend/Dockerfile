FROM node:20-alpine

# Installer les dépendances nécessaires pour compiler bcrypt
RUN apk add --no-cache python3 make g++

WORKDIR /usr/src/app

# Copier les fichiers package.json
COPY package*.json ./

# Installer toutes les dépendances (production + dev pour la compilation)
RUN npm install

# Copier le reste du code
COPY . .

EXPOSE 5000

CMD ["node","app.js"]