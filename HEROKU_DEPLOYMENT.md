# Guide de Déploiement sur Heroku

## 📋 Prérequis

- Compte Heroku (gratuit ou payant)
- Heroku CLI installé
- Git configuré sur ton PC
- Compte MongoDB Atlas (base de données cloud gratuite)

---

## 🚀 Étape 1 : Préparation

### 1.1 Installer Heroku CLI

**Windows (PowerShell) :**
```powershell
# Télécharger et installer depuis
https://devcenter.heroku.com/articles/heroku-cli

# Vérifier l'installation
heroku --version
```

### 1.2 Se connecter à Heroku

```powershell
heroku login
# Appuie sur une touche pour ouvrir le navigateur et te connecter
```

### 1.3 Créer un compte MongoDB Atlas (Base de données cloud)

1. Va sur https://www.mongodb.com/cloud/atlas/register
2. Crée un compte gratuit
3. Crée un cluster (FREE tier - M0)
4. Dans "Database Access", crée un utilisateur :
   - Username : `portfolioadmin`
   - Password : (générer un mot de passe sécurisé)
5. Dans "Network Access", ajoute `0.0.0.0/0` (autoriser toutes les IPs)
6. Récupère la Connection String :
   - Clique sur "Connect" → "Connect your application"
   - Copie l'URI : `mongodb+srv://portfolioadmin:<password>@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority`

---

## 📦 Étape 2 : Préparer le Backend pour Heroku

### 2.1 Créer un fichier Procfile

```powershell
cd H:\projet_perso\portfolio_kissotech\portfolio-backend
```

Créer `Procfile` (sans extension) :

```
web: node app.js
```

### 2.2 Mettre à jour package.json

Vérifier que `package.json` contient :

```json
{
  "engines": {
    "node": "20.x",
    "npm": "10.x"
  },
  "scripts": {
    "start": "node app.js"
  }
}
```

### 2.3 Créer l'application Heroku Backend

```powershell
cd H:\projet_perso\portfolio_kissotech\portfolio-backend

# Créer l'app Heroku
heroku create kissotech-portfolio-api

# Ou si le nom est pris
heroku create kissotech-portfolio-api-$(Get-Random -Maximum 9999)
```

### 2.4 Configurer les variables d'environnement

```powershell
# MongoDB Atlas URI (remplace <password> et <cluster>)
heroku config:set MONGO_URI="mongodb+srv://portfolioadmin:TON_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority" --app kissotech-portfolio-api

# Port (Heroku le définit automatiquement)
heroku config:set NODE_ENV=production --app kissotech-portfolio-api

# Email admin
heroku config:set ADMIN_EMAIL=sarkisekpinda832@gmail.com --app kissotech-portfolio-api

# SMTP Gmail
heroku config:set SMTP_HOST=smtp.gmail.com --app kissotech-portfolio-api
heroku config:set SMTP_PORT=587 --app kissotech-portfolio-api
heroku config:set SMTP_USER=sarkisekpinda832@gmail.com --app kissotech-portfolio-api
heroku config:set SMTP_PASS="tmcl tgoz uyxd ejzr" --app kissotech-portfolio-api

# JWT Secret
heroku config:set JWT_SECRET=e64e8ff3d1460a1745f1d1597ae609962490d5e3942783fd34adbf095b0290d3 --app kissotech-portfolio-api

# Admin credentials
heroku config:set ADMIN_USER=Sarkisekpinda --app kissotech-portfolio-api
heroku config:set ADMIN_PASS="sarkis@2025!" --app kissotech-portfolio-api

# CORS (sera mis à jour après le déploiement frontend)
heroku config:set CORS_ORIGIN="*" --app kissotech-portfolio-api
```

### 2.5 Modifier app.js pour Heroku

Le PORT doit être dynamique (Heroku définit process.env.PORT) :

```javascript
const PORT = process.env.PORT || 5000;
```

### 2.6 Déployer le Backend

```powershell
cd H:\projet_perso\portfolio_kissotech\portfolio-backend

# Initialiser git si pas déjà fait
git init
git add .
git commit -m "Prepare backend for Heroku"

# Ajouter Heroku remote
heroku git:remote -a kissotech-portfolio-api

# Déployer
git push heroku main
# Si ta branche s'appelle master : git push heroku master:main
```

### 2.7 Vérifier le déploiement

```powershell
# Ouvrir l'app dans le navigateur
heroku open --app kissotech-portfolio-api

# Voir les logs
heroku logs --tail --app kissotech-portfolio-api

# Tester l'API
heroku open --app kissotech-portfolio-api/health
# Devrait retourner : {"success":true,"status":"ok"}
```

---

## 🎨 Étape 3 : Préparer le Frontend pour Heroku

### 3.1 Créer un serveur pour le frontend

Heroku ne peut pas juste servir des fichiers statiques, il faut un serveur.

**Créer `server.js` dans le dossier frontend :**

```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques du dossier dist
app.use(express.static(path.join(__dirname, 'dist')));

// Toutes les routes renvoient index.html (pour React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
```

### 3.2 Créer Procfile pour frontend

```
web: node server.js
```

### 3.3 Mettre à jour package.json du frontend

```json
{
  "engines": {
    "node": "20.x",
    "npm": "10.x"
  },
  "scripts": {
    "start": "node server.js",
    "build": "vite build",
    "heroku-postbuild": "npm run build"
  },
  "dependencies": {
    "express": "^4.18.2",
    // ... autres dépendances existantes
  }
}
```

### 3.4 Installer Express

```powershell
cd H:\projet_perso\portfolio_kissotech\frontend
npm install express --save
```

### 3.5 Mettre à jour les variables d'environnement

**Créer `.env.production` :**

```bash
VITE_API_BASE_URL=https://kissotech-portfolio-api.herokuapp.com/api
VITE_CLOUDINARY_CLOUD_NAME=dprxvnotk
VITE_CLOUDINARY_UPLOAD_PRESET=portfolio_KissoTech
VITE_WHATSAPP_NUMBER=+2290155963913
VITE_WHATSAPP_MESSAGE=Bonjour, j'aimerais en savoir plus sur vos services. Merci !
```

### 3.6 Créer l'application Heroku Frontend

```powershell
cd H:\projet_perso\portfolio_kissotech\frontend

# Créer l'app Heroku
heroku create kissotech-portfolio

# Ou si le nom est pris
heroku create kissotech-portfolio-$(Get-Random -Maximum 9999)
```

### 3.7 Configurer les variables d'environnement frontend

```powershell
# API URL (avec le nom de ton app backend)
heroku config:set VITE_API_BASE_URL=https://kissotech-portfolio-api.herokuapp.com/api --app kissotech-portfolio

# Cloudinary
heroku config:set VITE_CLOUDINARY_CLOUD_NAME=dprxvnotk --app kissotech-portfolio
heroku config:set VITE_CLOUDINARY_UPLOAD_PRESET=portfolio_KissoTech --app kissotech-portfolio

# WhatsApp
heroku config:set VITE_WHATSAPP_NUMBER=+2290155963913 --app kissotech-portfolio
heroku config:set VITE_WHATSAPP_MESSAGE="Bonjour, j'aimerais en savoir plus sur vos services. Merci !" --app kissotech-portfolio
```

### 3.8 Mettre à jour le CORS du backend

```powershell
# Retour au backend pour autoriser le domaine frontend
heroku config:set CORS_ORIGIN="https://kissotech-portfolio.herokuapp.com" --app kissotech-portfolio-api
```

### 3.9 Déployer le Frontend

```powershell
cd H:\projet_perso\portfolio_kissotech\frontend

# Initialiser git si pas déjà fait
git init
git add .
git commit -m "Prepare frontend for Heroku"

# Ajouter Heroku remote
heroku git:remote -a kissotech-portfolio

# Déployer
git push heroku main
```

### 3.10 Vérifier le déploiement

```powershell
# Ouvrir l'app
heroku open --app kissotech-portfolio

# Voir les logs
heroku logs --tail --app kissotech-portfolio
```

---

## 🌐 Étape 4 : Configuration Finale

### 4.1 Ajouter un domaine personnalisé (optionnel)

```powershell
# Ajouter un domaine (nécessite un plan payant ou Hobby)
heroku domains:add www.kissotech.com --app kissotech-portfolio

# Configurer le DNS chez ton registrar
# Ajouter un CNAME : www -> kissotech-portfolio.herokuapp.com
```

### 4.2 Activer SSL automatique

SSL est automatiquement activé sur Heroku pour les domaines `.herokuapp.com`

---

## 📊 Accès à MongoDB Atlas

### Via MongoDB Compass

**Connection String :**
```
mongodb+srv://portfolioadmin:TON_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio
```

1. Ouvrir MongoDB Compass
2. Coller la connection string
3. Remplacer `<password>` par ton mot de passe
4. Se connecter

### Commandes utiles

```bash
# Se connecter avec mongosh
mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/portfolio" --username portfolioadmin

# Lister les bases
show dbs

# Utiliser la base portfolio
use portfolio

# Voir les projets
db.projets.find()
```

---

## 🔄 Mise à jour de l'application

### Backend

```powershell
cd H:\projet_perso\portfolio_kissotech\portfolio-backend
git add .
git commit -m "Update backend"
git push heroku main

# Redémarrer l'app si nécessaire
heroku restart --app kissotech-portfolio-api
```

### Frontend

```powershell
cd H:\projet_perso\portfolio_kissotech\frontend
git add .
git commit -m "Update frontend"
git push heroku main

# Redémarrer l'app si nécessaire
heroku restart --app kissotech-portfolio
```

---

## 📝 Commandes Utiles Heroku

```powershell
# Voir les apps
heroku apps

# Voir les logs en temps réel
heroku logs --tail --app kissotech-portfolio-api

# Ouvrir l'app dans le navigateur
heroku open --app kissotech-portfolio

# Voir les variables d'environnement
heroku config --app kissotech-portfolio-api

# Redémarrer l'app
heroku restart --app kissotech-portfolio

# Voir l'état des dynos
heroku ps --app kissotech-portfolio

# Exécuter une commande
heroku run bash --app kissotech-portfolio-api

# Voir les métriques (nécessite add-on)
heroku addons:create papertrail --app kissotech-portfolio-api
```

---

## 💰 Tarification Heroku

### Free Tier (Eco Dynos - $5/mois par dyno)
- 1000 heures/mois gratuites (suffisant pour 1 app)
- L'app s'endort après 30 min d'inactivité
- Réveil automatique à la première requête (~10s)

### Hobby ($7/mois par dyno)
- Toujours actif (pas de sommeil)
- Domaines personnalisés
- SSL automatique

### Recommandation
- **Développement** : Eco Dynos
- **Production** : Hobby minimum

---

## 🔐 Sécurité

### 1. Changer les secrets en production

```powershell
# Générer un nouveau JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Le définir sur Heroku
heroku config:set JWT_SECRET=NOUVEAU_SECRET --app kissotech-portfolio-api
```

### 2. Activer 2FA sur Heroku

https://dashboard.heroku.com/account/security

### 3. Limiter les IPs MongoDB Atlas (optionnel)

Dans MongoDB Atlas > Network Access, remplacer `0.0.0.0/0` par les IPs Heroku si nécessaire

---

## 🎯 Checklist Déploiement

- [ ] Compte Heroku créé
- [ ] Heroku CLI installé
- [ ] Compte MongoDB Atlas créé
- [ ] Cluster MongoDB créé
- [ ] Backend déployé sur Heroku
- [ ] Frontend déployé sur Heroku
- [ ] Variables d'environnement configurées
- [ ] CORS mis à jour
- [ ] Tests de connexion API
- [ ] Tests d'authentification admin
- [ ] Upload d'images testé (Cloudinary)
- [ ] Formulaire de contact testé (SMTP)
- [ ] WhatsApp button testé

---

## 🐛 Dépannage

### L'app ne démarre pas

```powershell
# Voir les logs détaillés
heroku logs --tail --app kissotech-portfolio-api

# Vérifier les variables
heroku config --app kissotech-portfolio-api

# Redémarrer
heroku restart --app kissotech-portfolio-api
```

### Erreur de build

```powershell
# Vérifier package.json
# Vérifier que "start" script existe
# Vérifier engines.node

# Rebuild
git commit --allow-empty -m "Trigger rebuild"
git push heroku main
```

### Erreur CORS

```powershell
# Vérifier que le frontend est dans CORS_ORIGIN
heroku config:get CORS_ORIGIN --app kissotech-portfolio-api

# Mettre à jour si nécessaire
heroku config:set CORS_ORIGIN="https://kissotech-portfolio.herokuapp.com" --app kissotech-portfolio-api
```

### MongoDB connexion timeout

- Vérifier que Network Access dans MongoDB Atlas autorise `0.0.0.0/0`
- Vérifier le MONGO_URI dans les config vars
- Vérifier que le mot de passe ne contient pas de caractères spéciaux (ou les encoder)

---

## 📱 URLs Finales

**Frontend :**
- https://kissotech-portfolio.herokuapp.com

**Backend API :**
- https://kissotech-portfolio-api.herokuapp.com/api
- Health check : https://kissotech-portfolio-api.herokuapp.com/health

**MongoDB :**
- Atlas Dashboard : https://cloud.mongodb.com

---

Besoin d'aide pour une étape spécifique ? 🚀
