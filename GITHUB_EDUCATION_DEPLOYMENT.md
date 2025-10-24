git commit --allow-empty -m "Update API URL"
git push heroku main
git add .
git commit -m "Update backend"
git push heroku main
git add .
git commit -m "Update frontend"
git push heroku main
git commit --allow-empty -m "Rebuild"
git push heroku main

# Guide de Déploiement Gratuit : Railway/Render + get.tech

## 1️⃣ Enregistrer ton domaine .tech (get.tech)

1. Va sur https://education.github.com/pack
2. Cherche "get.tech" et clique sur "Get access"
3. Choisis ton nom de domaine (ex: kissotech.tech)
4. Enregistre-le gratuitement (1 an offert)

## 2️⃣ Créer ta base MongoDB Atlas (GRATUIT - Étapes détaillées)

### Étape 2.1 : Créer un compte MongoDB Atlas

1. Va sur https://www.mongodb.com/cloud/atlas/register
2. **Inscris-toi** avec :
   - Email (utilise ton email étudiant si possible pour les crédits)
   - Mot de passe
   - OU connecte-toi avec Google/GitHub
3. Accepte les conditions
4. Clique sur **"Get Started Free"** ou **"Start Free"**

### Étape 2.2 : Choisir le plan gratuit (M0)

Après connexion, MongoDB Atlas te demande de créer un déploiement :

Où trouver le bouton "Build a Database" dans la nouvelle interface :
- Si c’est un nouveau compte/projet vide, tu verras un grand bouton vert **Build a Database** au centre de l’écran d’accueil du projet.
- Sinon, ouvre le menu de gauche → **Database Deployments** (ou parfois **Deployment → Database**) puis clique en haut à droite sur **Create** → **Deploy a Database**.
- Tu peux aussi changer de projet via le sélecteur en haut (nom du Project). Si tu n’as pas de projet, clique sur **New Project** d’abord.

1. **Choisis le type Shared (M0 gratuit)** :
   - Clique sur **Build a Database** (ou Create → Database Deployment)
   - Dans les onglets, choisis **Shared** (pas Dedicated, pas Serverless/Flex)
   - Dans la liste des tiers, sélectionne **M0 Sandbox (Free)**
   - Un badge **Free** doit apparaître à côté du tier

2. **Choisis la région** (Provider & Region) :
    - Provider : **AWS** (recommandé) — le Free Tier est disponible sur davantage de régions AWS
    - Region : sélectionne une région affichant le badge **Free** (exemples courants) :
       - us-east-1 (N. Virginia)
       - eu-central-1 (Frankfurt)
       - eu-west-1/2 (Ireland/London)
    - ⚠️ Le tier M0 n’apparaît pas dans toutes les régions. Si tu ne vois pas le badge Free, change de région jusqu’à le voir.

3. **Nomme ton cluster** :
   - Cluster Name : `portfolio-cluster` (ou n'importe quel nom)
   - Laisse les autres options par défaut

4. Clique sur **"Create Deployment"** ou **"Create"**

⏳ MongoDB Atlas va créer ton cluster (ça prend 3-5 minutes)

#### Si tu ne vois que M10, M30, et Flex (pas de M0)

Pas de panique, c’est une question d’interface et de région :
- Assure-toi d’être sur l’onglet **Shared** (pas Dedicated ni Serverless/Flex)
- Change le **Provider** vers **AWS**
- Change la **Region** vers une région avec badge **Free** (ex: us-east-1 ou eu-central-1)
- Clique sur **See more regions** si la liste est réduite
- Si toujours indisponible, crée un **nouveau Project** ou **nouvelle Organization** (sans carte), puis réessaie

Dernier recours (non 100% gratuit) : choisis **Serverless (Flex)**, mais cela peut nécessiter une carte et facturer à l’usage — à éviter si tu veux rester totalement gratuit.

### Étape 2.3 : Configuration de sécurité (IMPORTANT !)

Une fois le cluster créé, MongoDB Atlas va te demander de configurer la sécurité :

#### A. Créer un utilisateur de base de données

Tu verras un popup "Security Quickstart" :

1. **Username** : `portfolioadmin` (ou ce que tu veux)
2. **Password** : Clique sur "Autogenerate Secure Password" OU crée ton propre mot de passe
   - **⚠️ COPIE ET SAUVEGARDE CE MOT DE PASSE** (tu en auras besoin !)
   - Exemple : `P@ssw0rd123!` (ou utilise le générateur)
3. Clique sur **"Create User"** ou **"Create Database User"**

#### B. Autoriser l'accès depuis n'importe où (Whitelist IP)

Toujours dans le popup "Security Quickstart" :

1. Tu verras "Where would you like to connect from?"
2. Choisis **"My Local Environment"** ou **"Cloud Environment"**
3. Dans la section "Add entries to your IP Access List" :
   - Clique sur **"Add My Current IP Address"** (pour tester maintenant)
   - **PUIS** clique sur **"Add a Different IP Address"**
   - Entre : `0.0.0.0/0` (pour autoriser toutes les IPs - nécessaire pour Railway/Vercel)
   - Description : `Allow all IPs`
4. Clique sur **"Add Entry"** puis **"Finish and Close"**

### Étape 2.4 : Récupérer la Connection String

1. Clique sur **"Database"** dans le menu de gauche (icône de cylindre)
2. Tu verras ton cluster `portfolio-cluster`
3. Clique sur le bouton **"Connect"**
4. Choisis **"Connect your application"** (ou "Drivers")
5. **Driver** : Sélectionne `Node.js`
6. **Version** : Sélectionne `5.5 or later` (ou la dernière version)
7. Tu verras une Connection String qui ressemble à :
   ```
   mongodb+srv://portfolioadmin:<password>@portfolio-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
8. **COPIE cette Connection String**
9. **Remplace `<password>`** par le mot de passe que tu as créé à l'étape 2.3.A
10. **Ajoute le nom de la base de données** après `.net/` :
    ```
    mongodb+srv://portfolioadmin:TON_MOT_DE_PASSE@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
    ```

### Étape 2.5 : Vérifier la configuration

Avant de passer à Railway, vérifie :

✅ Cluster M0 (gratuit) créé  
✅ Utilisateur de base de données créé (portfolioadmin)  
✅ IP `0.0.0.0/0` ajoutée dans Network Access  
✅ Connection String copiée et mot de passe remplacé  

### 🆘 Si tu ne vois pas le popup "Security Quickstart"

Si le popup ne s'affiche pas automatiquement :

**Pour créer un utilisateur :**
1. Menu gauche → **"Database Access"** (sous Security)
2. Clique sur **"+ ADD NEW DATABASE USER"**
3. Authentication Method : **"Password"**
4. Username : `portfolioadmin`
5. Password : (crée un mot de passe fort)
6. Database User Privileges : **"Read and write to any database"** (déjà sélectionné)
7. Clique sur **"Add User"**

**Pour autoriser les IPs :**
1. Menu gauche → **"Network Access"** (sous Security)
2. Clique sur **"+ ADD IP ADDRESS"**
3. Clique sur **"ALLOW ACCESS FROM ANYWHERE"**
4. Confirme avec `0.0.0.0/0`
5. Clique sur **"Confirm"**

### 📋 Exemple de Connection String finale

```
mongodb+srv://portfolioadmin:MonMotDePasse123@portfolio-cluster.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

**⚠️ Garde cette Connection String en sécurité - tu en auras besoin pour Railway !**

## 3️⃣ Déployer le backend Node.js sur Railway

1. Va sur https://railway.app/
2. Crée un compte (GitHub possible)
3. Clique sur "New Project" > "Deploy from GitHub repo" ou "Start Blank"
4. Importe ton dossier `portfolio-backend`
5. Ajoute les variables d'environnement (MONGO_URI, JWT_SECRET, SMTP_*, ADMIN_USER/PASS, CORS_ORIGIN)
6. Relie ton backend à MongoDB Atlas
7. Clique sur "Deploy"
8. Récupère l'URL Railway (ex: https://kissotech-backend.up.railway.app)

## 4️⃣ Déployer le frontend React/Vite sur Vercel, Netlify ou Railway

### Option 1 : Vercel
1. Va sur https://vercel.com/
2. Connecte ton repo GitHub
3. Configure les variables d'environnement (VITE_API_BASE_URL, VITE_CLOUDINARY_*, VITE_WHATSAPP_*)
4. Clique sur "Deploy"
5. Récupère l'URL Vercel (ex: https://kissotech.vercel.app)

### Option 2 : Netlify
1. Va sur https://netlify.com/
2. Connecte ton repo GitHub
3. Configure les variables d'environnement
4. Clique sur "Deploy"
5. Récupère l'URL Netlify

### Option 3 : Railway (tout-en-un)
1. Ajoute un nouveau service "Static Site" dans ton projet Railway
2. Importe le dossier `frontend`
3. Configure les variables d'environnement
4. Clique sur "Deploy"
5. Récupère l'URL Railway

## 5️⃣ Configurer ton domaine .tech sur get.tech

1. Va dans la gestion DNS de get.tech
2. Ajoute un enregistrement CNAME :
   - Name: www (ou @ pour le root)
   - Target: l'URL fournie par Vercel/Netlify/Railway (ex: kissotech.vercel.app)
3. Pour le backend, tu peux créer un sous-domaine (ex: api.kissotech.tech) et pointer vers Railway

## 6️⃣ Mettre à jour CORS et variables d'environnement

1. Dans Railway, mets à jour CORS_ORIGIN avec ton domaine .tech
2. Dans le frontend, mets à jour VITE_API_BASE_URL avec l'URL backend (api.kissotech.tech ou Railway direct)

## 7️⃣ Vérifier le SSL

Vercel, Netlify et Railway activent automatiquement le SSL sur les domaines personnalisés.

## 8️⃣ Tester ton site

- Accède à https://kissotech.tech
- Accède à https://api.kissotech.tech/api (ou l'URL Railway)
- Teste le login admin, l'upload d'image, le formulaire de contact, le bouton WhatsApp

## 9️⃣ Mise à jour du projet

Pour déployer une mise à jour, push simplement sur GitHub, Railway/Vercel/Netlify déploient automatiquement.

## 10️⃣ Dépannage

- Si le domaine .tech ne fonctionne pas, attends la propagation DNS (jusqu'à 48h)
- Vérifie les logs Railway/Vercel/Netlify pour les erreurs
- Mets à jour les variables d'environnement si besoin

---

## Checklist Finale

- [ ] Domaine .tech enregistré
- [ ] MongoDB Atlas configuré
- [ ] Backend déployé sur Railway
- [ ] Frontend déployé sur Vercel/Netlify/Railway
- [ ] DNS configurés sur get.tech
- [ ] SSL actif
- [ ] CORS mis à jour
- [ ] Tests complets (site, API, admin, upload, WhatsApp)

---

🎉 Ton portfolio est 100% gratuit, sans carte bancaire, avec ton propre domaine .tech !

Besoin d'aide pour une étape ? Demande-moi !
