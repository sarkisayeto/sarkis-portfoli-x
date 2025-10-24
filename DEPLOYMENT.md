# Guide de Déploiement sur DigitalOcean

## 📋 Prérequis

- Compte DigitalOcean
- Nom de domaine (optionnel mais recommandé)
- Accès SSH à ton ordinateur local

---

## 🚀 Étape 1 : Créer un Droplet DigitalOcean

1. **Connexion à DigitalOcean**
   - Va sur https://cloud.digitalocean.com
   - Clique sur "Create" → "Droplets"

2. **Configuration du Droplet**
   - **Image** : Ubuntu 22.04 LTS x64
   - **Plan** : Basic
   - **CPU** : Regular (2 GB RAM / 1 CPU - ~$12/mois minimum recommandé)
   - **Datacenter** : Choisir le plus proche de tes utilisateurs (ex: Frankfurt, Amsterdam)
   - **Authentication** : SSH keys (recommandé) ou Password
   - **Hostname** : `portfolio-kissotech`

3. **Créer le Droplet**

---

## 🔧 Étape 2 : Configuration Initiale du Serveur

### Se connecter via SSH

```bash
ssh root@YOUR_DROPLET_IP
```

### Mettre à jour le système

```bash
apt update && apt upgrade -y
```

### Installer Docker et Docker Compose

```bash
# Installer les dépendances
apt install -y apt-transport-https ca-certificates curl software-properties-common

# Ajouter la clé GPG Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Ajouter le repo Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installer Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io

# Installer Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Vérifier l'installation
docker --version
docker-compose --version
```

### Créer un utilisateur non-root (recommandé)

```bash
adduser kissotech
usermod -aG sudo kissotech
usermod -aG docker kissotech
```

---

## 📦 Étape 3 : Déployer l'Application

### 1. Cloner ton repository

```bash
# Se connecter avec l'utilisateur créé
su - kissotech

# Installer git
sudo apt install -y git

# Cloner le repo
git clone https://github.com/sarkisayeto/sarkis-portfoli-x.git
cd sarkis-portfoli-x
```

### 2. Configuration Backend

```bash
cd portfolio-backend

# Créer le fichier .env (copier depuis .env.example)
nano .env
```

**Contenu du fichier `.env` pour production :**

```bash
# Configuration du serveur
PORT=5000
NODE_ENV=production

# Configuration MongoDB (Docker local)
MONGO_URI=mongodb://mongo:27017/portfolio

# Email de l'administrateur
ADMIN_EMAIL=sarkisekpinda832@gmail.com

# Configuration SMTP Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=sarkisekpinda832@gmail.com
SMTP_PASS=tmcl tgoz uyxd ejzr

# CORS - Ton domaine de production
CORS_ORIGIN=https://votredomaine.com,https://www.votredomaine.com

# JWT Secret (générer un nouveau pour la prod)
JWT_SECRET=e64e8ff3d1460a1745f1d1597ae609962490d5e3942783fd34adbf095b0290d3

# Identifiants Admin
ADMIN_USER=Sarkisekpinda
ADMIN_PASS=sarkis@2025!
```

**Lancer le backend :**

```bash
docker-compose up -d --build
```

### 3. Configuration Frontend

```bash
cd ../frontend

# Éditer docker-compose.yml pour la production
nano docker-compose.yml
```

**Mettre à jour `VITE_API_BASE_URL` :**

```yaml
args:
  - VITE_API_BASE_URL=https://votredomaine.com/api
  # ou http://YOUR_DROPLET_IP:5000/api si pas de domaine
```

**Lancer le frontend :**

```bash
docker-compose up -d --build
```

---

## 🌐 Étape 4 : Configurer Nginx (Reverse Proxy)

### Installer Nginx

```bash
sudo apt install -y nginx
```

### Créer la configuration

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

**Contenu (sans domaine) :**

```nginx
server {
    listen 80;
    server_name YOUR_DROPLET_IP;

    # Frontend
    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Activer la configuration :**

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Ouvrir les ports du firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
```

---

## 🔐 Étape 5 : SSL avec Let's Encrypt (si domaine)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d votredomaine.com -d www.votredomaine.com
```

---

## 📊 Accès à la Base de Données MongoDB

### Option 1 : Depuis le serveur (SSH)

```bash
# Se connecter au serveur
ssh kissotech@YOUR_DROPLET_IP

# Accéder au conteneur MongoDB
docker exec -it portfolio-backend-mongo-1 mongosh

# Une fois dans mongosh :
use portfolio
db.projets.find().pretty()
db.messagecontacts.find().pretty()
```

### Option 2 : MongoDB Compass (Interface graphique)

**Sur le serveur :**

```bash
cd portfolio-backend

# Éditer docker-compose.yml pour exposer MongoDB
nano docker-compose.yml
```

**Ajouter le mapping de port à mongo :**

```yaml
mongo:
  image: mongo:7-jammy
  container_name: portfolio-backend-mongo-1
  ports:
    - "27017:27017"  # AJOUTER CETTE LIGNE
  volumes:
    - mongo-data:/data/db
```

**Redémarrer :**

```bash
docker-compose down
docker-compose up -d
```

**Ouvrir le port (ATTENTION : sécuriser avec mot de passe) :**

```bash
sudo ufw allow 27017/tcp
```

**Sur ton PC local (MongoDB Compass) :**

- Connection String : `mongodb://YOUR_DROPLET_IP:27017/portfolio`

⚠️ **Sécurité** : Pour la production, il est FORTEMENT recommandé d'ajouter une authentification MongoDB :

```yaml
mongo:
  image: mongo:7-jammy
  environment:
    MONGO_INITDB_ROOT_USERNAME: admin
    MONGO_INITDB_ROOT_PASSWORD: VotreMotDePasseSecurise123!
  ports:
    - "27017:27017"
```

Et mettre à jour `MONGO_URI` dans `.env` :

```
MONGO_URI=mongodb://admin:VotreMotDePasseSecurise123!@mongo:27017/portfolio?authSource=admin
```

### Option 3 : Tunnel SSH (Plus sécurisé)

**Sur ton PC local :**

```bash
ssh -L 27017:localhost:27017 kissotech@YOUR_DROPLET_IP
```

Puis dans MongoDB Compass :

```
mongodb://localhost:27017/portfolio
```

---

## 🔄 Mise à jour de l'application

```bash
# Se connecter au serveur
ssh kissotech@YOUR_DROPLET_IP

# Backend
cd sarkis-portfoli-x/portfolio-backend
git pull origin main
docker-compose up -d --build

# Frontend
cd ../frontend
git pull origin main
docker-compose up -d --build
```

---

## 📝 Commandes Utiles

```bash
# Voir les logs backend
docker logs -f portfolio-backend-app-1

# Voir les logs frontend
docker logs -f portfolio-frontend

# Voir les logs MongoDB
docker logs -f portfolio-backend-mongo-1

# Redémarrer tous les conteneurs
docker restart portfolio-backend-app-1 portfolio-backend-mongo-1 portfolio-frontend

# Arrêter tout
cd portfolio-backend && docker-compose down
cd ../frontend && docker-compose down
```

---

## 🎯 Checklist Finale

- [ ] Droplet créé et configuré
- [ ] Docker et Docker Compose installés
- [ ] Backend déployé et accessible
- [ ] Frontend déployé et accessible
- [ ] Nginx configuré comme reverse proxy
- [ ] Firewall configuré (UFW)
- [ ] SSL configuré (si domaine)
- [ ] MongoDB sécurisé avec mot de passe
- [ ] Variables d'environnement de production configurées
- [ ] CORS mis à jour avec le domaine de production
- [ ] Tests d'authentification admin
- [ ] Backup MongoDB configuré (recommandé)

---

## 💡 Bonnes Pratiques

1. **Backups réguliers de MongoDB**
   ```bash
   docker exec portfolio-backend-mongo-1 mongodump --out /data/backup
   ```

2. **Logs centralisés**
   - Utiliser DigitalOcean Monitoring

3. **CI/CD avec GitHub Actions**
   - Auto-déploiement sur push main

4. **Monitoring**
   - Uptime monitoring (UptimeRobot, etc.)

---

Besoin d'aide pour une étape spécifique ? 🚀
