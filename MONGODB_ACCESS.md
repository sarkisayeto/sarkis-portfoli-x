# Guide d'Accès à MongoDB

## 🗄️ Méthodes d'Accès à la Base de Données

### 1. Accès Direct via Docker (Local)

#### Ligne de commande Mongo Shell

```powershell
# Accéder au conteneur MongoDB
docker exec -it portfolio-backend-mongo-1 mongosh

# Une fois dans mongosh, utiliser la base portfolio
use portfolio

# Lister toutes les collections
show collections

# Voir tous les projets
db.projets.find().pretty()

# Compter le nombre de projets
db.projets.countDocuments()

# Voir tous les messages de contact
db.messagecontacts.find().pretty()

# Rechercher un projet par ID
db.projets.findOne({_id: ObjectId("VOTRE_ID_ICI")})

# Rechercher par titre
db.projets.find({title: /react/i})

# Supprimer un projet
db.projets.deleteOne({_id: ObjectId("VOTRE_ID_ICI")})

# Mettre à jour un projet
db.projets.updateOne(
  {_id: ObjectId("VOTRE_ID_ICI")},
  {$set: {title: "Nouveau titre"}}
)

# Quitter
exit
```

---

### 2. MongoDB Compass (Interface Graphique) - RECOMMANDÉ

#### Installation

1. Télécharger MongoDB Compass : https://www.mongodb.com/try/download/compass
2. Installer sur ton PC Windows

#### Connexion Locale (Docker)

**Connection String :**
```
mongodb://localhost:27017/portfolio
```

**Étapes :**
1. Ouvrir MongoDB Compass
2. Cliquer sur "New Connection"
3. Coller la connection string ci-dessus
4. Cliquer sur "Connect"

#### Connexion Production (via SSH Tunnel) - SÉCURISÉ

**Sur PowerShell :**
```powershell
# Créer un tunnel SSH (laisser cette fenêtre ouverte)
ssh -L 27017:localhost:27017 kissotech@YOUR_DROPLET_IP
```

**Dans MongoDB Compass :**
```
mongodb://localhost:27017/portfolio
```

---

### 3. Studio 3T (Alternative Pro avec UI avancée)

**Connection String (Local) :**
```
mongodb://localhost:27017/portfolio
```

---

### 4. VS Code Extension

#### Installation

1. Dans VS Code, ouvrir les Extensions (Ctrl+Shift+X)
2. Rechercher "MongoDB for VS Code"
3. Installer l'extension officielle MongoDB

#### Connexion

1. Cliquer sur l'icône MongoDB dans la barre latérale
2. "Add Connection"
3. Connection String : `mongodb://localhost:27017/portfolio`
4. Se connecter

---

## 🔐 Sécuriser MongoDB en Production

### Ajouter Authentication

**Modifier `portfolio-backend/docker-compose.yml` :**

```yaml
services:
  mongo:
    image: mongo:7-jammy
    container_name: portfolio-backend-mongo-1
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
    volumes:
      - mongo-data:/data/db
    networks:
      - portfolio-network
    # NE PAS exposer le port en production sauf si nécessaire
    # ports:
    #   - "27017:27017"
```

**Créer `.env.mongo` :**

```bash
MONGO_ROOT_PASSWORD=VotreMotDePasseTresFort123!
```

**Mettre à jour `.env` du backend :**

```bash
MONGO_URI=mongodb://admin:VotreMotDePasseTresFort123!@mongo:27017/portfolio?authSource=admin
```

**Connection String pour Compass (production avec auth) :**

```
mongodb://admin:VotreMotDePasseTresFort123!@YOUR_DROPLET_IP:27017/portfolio?authSource=admin
```

---

## 📊 Commandes MongoDB Utiles

### Gestion des Projets

```javascript
// Créer un projet
db.projets.insertOne({
  title: "Mon Projet",
  description: "Description détaillée",
  technologies: ["React", "Node.js", "MongoDB"],
  githubUrl: "https://github.com/user/repo",
  liveDemoUrl: "https://demo.example.com",
  coverImage: "https://example.com/image.jpg",
  createdAt: new Date(),
  updatedAt: new Date()
})

// Lister tous les projets avec pagination
db.projets.find().limit(10).skip(0).sort({createdAt: -1})

// Compter projets
db.projets.countDocuments()

// Mettre à jour
db.projets.updateOne(
  {_id: ObjectId("ID")},
  {
    $set: {
      title: "Nouveau titre",
      updatedAt: new Date()
    }
  }
)

// Supprimer
db.projets.deleteOne({_id: ObjectId("ID")})
```

### Gestion des Messages de Contact

```javascript
// Lister tous les messages
db.messagecontacts.find().sort({createdAt: -1})

// Messages non lus (si vous ajoutez un champ read)
db.messagecontacts.find({read: false})

// Marquer comme lu
db.messagecontacts.updateOne(
  {_id: ObjectId("ID")},
  {$set: {read: true}}
)

// Supprimer ancien messages (+ de 90 jours)
db.messagecontacts.deleteMany({
  createdAt: {$lt: new Date(Date.now() - 90*24*60*60*1000)}
})
```

### Maintenance

```javascript
// Voir la taille de la base
db.stats()

// Voir les indexes
db.projets.getIndexes()

// Créer un index sur le titre (pour recherche rapide)
db.projets.createIndex({title: "text", description: "text"})

// Recherche full-text
db.projets.find({$text: {$search: "react"}})

// Compacter la base (libérer espace)
db.runCommand({compact: "projets"})
```

---

## 💾 Backup et Restauration

### Backup

```bash
# Depuis le serveur (SSH)
docker exec portfolio-backend-mongo-1 mongodump --out /data/backup

# Copier le backup vers ton PC
docker cp portfolio-backend-mongo-1:/data/backup ./backup-$(date +%Y%m%d)

# Ou directement depuis PowerShell (local)
docker exec portfolio-backend-mongo-1 mongodump --archive --gzip > backup-portfolio-$(Get-Date -Format 'yyyyMMdd').gz
```

### Restauration

```bash
# Local
docker exec -i portfolio-backend-mongo-1 mongorestore --archive --gzip < backup-portfolio-20250123.gz

# Ou avec les fichiers backup
docker cp ./backup portfolio-backend-mongo-1:/data/restore
docker exec portfolio-backend-mongo-1 mongorestore /data/restore
```

---

## 🔍 Monitoring

### Voir les statistiques

```javascript
// Taille de chaque collection
db.projets.stats()
db.messagecontacts.stats()

// Nombre de documents
db.projets.countDocuments()
db.messagecontacts.countDocuments()

// Opérations en cours
db.currentOp()

// Logs du serveur
db.adminCommand({getLog: "global"})
```

### Depuis Docker

```bash
# Logs MongoDB
docker logs -f portfolio-backend-mongo-1

# Stats ressources du conteneur
docker stats portfolio-backend-mongo-1

# Espace disque utilisé
docker exec portfolio-backend-mongo-1 df -h
```

---

## 🛡️ Sécurité Production

### 1. Ne JAMAIS exposer MongoDB directement sur Internet

```yaml
# ❌ MAUVAIS (en production)
mongo:
  ports:
    - "27017:27017"

# ✅ BON (pas de ports exposés)
mongo:
  # Pas de section ports
```

### 2. Utiliser SSH Tunnel pour accès distant

```bash
# Sur ton PC local
ssh -L 27017:localhost:27017 user@server

# Puis dans Compass
mongodb://localhost:27017/portfolio
```

### 3. Backups automatiques

Créer un cron job sur le serveur :

```bash
# Éditer crontab
crontab -e

# Ajouter backup quotidien à 3h du matin
0 3 * * * docker exec portfolio-backend-mongo-1 mongodump --out /data/backup-$(date +\%Y\%m\%d)
```

---

## 📱 Accès Rapide

### Connection Strings

**Local (dev) :**
```
mongodb://localhost:27017/portfolio
```

**Production (sans auth - NE PAS UTILISER) :**
```
mongodb://YOUR_IP:27017/portfolio
```

**Production (avec auth - recommandé) :**
```
mongodb://admin:PASSWORD@YOUR_IP:27017/portfolio?authSource=admin
```

**Production via SSH Tunnel (le plus sécurisé) :**
```bash
# Terminal 1: Tunnel SSH
ssh -L 27017:localhost:27017 user@server

# MongoDB Compass: Connection String
mongodb://localhost:27017/portfolio
```

---

Besoin d'aide pour configurer MongoDB Compass ou créer des backups automatiques ? 🗄️
