# Portfolio Sarkis EKPINDA

Portfolio professionnel de Sarkis EKPINDA - Développeur Web Backend & Intelligence Artificielle

## 🚀 Technologies

### Frontend
- **React 18** avec TypeScript
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations fluides
- **Axios** - Client HTTP
- **React Router** - Navigation
- **Shadcn/ui** - Composants UI

### Backend (connecté)
- Express/MongoDB (API REST sur `http://localhost:5000/api`)

### Infrastructure
- **Docker** & Docker Compose
- **Cloudinary** - Stockage d'images

## 📦 Installation

### Prérequis
- Node.js 20+
- npm ou yarn
- Backend API en cours d'exécution sur `http://localhost:5000/api`

### Installation locale

```bash
# Cloner le repository
git clone <repo-url>
cd portfolio-frontend

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Configurer les variables d'environnement dans .env.local
# VITE_API_BASE_URL=http://localhost:5000/api
# VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
# VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Lancer en développement
npm run dev
```

L'application sera accessible sur `http://localhost:8080`

### Installation avec Docker

```bash
# Build et lancement
docker-compose up --build

# En arrière-plan
docker-compose up -d

# Arrêter
docker-compose down
```

L'application sera accessible sur `http://localhost:3000`

## 🎨 Structure du projet

```
src/
├── assets/          # Images et ressources
├── components/      # Composants réutilisables
│   ├── ui/         # Composants UI (shadcn)
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx
│   ├── ContactForm.tsx
│   ├── ImageUploader.tsx
│   └── ProtectedRoute.tsx
├── hooks/           # Hooks personnalisés
│   ├── useProjects.ts
│   ├── useProject.ts
│   └── useAuth.ts
├── lib/            # Utilitaires
│   ├── api.ts      # Configuration Axios & API calls
│   ├── auth.ts     # Gestion authentication
│   └── validators.ts
├── pages/          # Pages de l'application
│   ├── Index.tsx           # Page d'accueil
│   ├── ProjectList.tsx     # Liste des projets
│   ├── ProjectDetail.tsx   # Détail d'un projet
│   ├── Contact.tsx         # Page de contact
│   ├── AdminLogin.tsx      # Connexion admin
│   ├── AdminProjects.tsx   # Gestion projets admin
│   ├── AdminProjectNew.tsx # Création projet
│   └── AdminProjectEdit.tsx # Edition projet
└── App.tsx         # Configuration du routing
```

## 🔐 Authentification Admin

Pour accéder à l'interface d'administration :

1. Aller sur `/admin/login`
2. Se connecter avec les identifiants configurés dans le backend
3. Accès à la gestion des projets sur `/admin/projets`

Les routes admin sont protégées par JWT.

## 📝 Comment ajouter un projet

### Via l'interface Admin

1. Se connecter sur `/admin/login`
2. Cliquer sur "Nouveau projet"
3. Remplir le formulaire :
   - **Titre** (requis)
   - **Description** (requise)
   - **Technologies** (requises, séparées par des virgules)
   - **URL GitHub** (optionnel)
   - **URL de la démo** (optionnel)
   - **Image de couverture** (optionnel - upload via Cloudinary)
4. Cliquer sur "Créer le projet"

### Upload d'images (Cloudinary)

Pour activer l'upload d'images :

1. **Créer un compte Cloudinary** sur https://cloudinary.com
2. **Créer un preset d'upload** :
   - Aller dans Settings > Upload
   - Créer un nouvel Upload preset (unsigned)
   - Noter le nom du preset
3. **Configurer les variables d'environnement** :
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
   ```
4. **Recommandations** :
   - Taille d'image : 1200-1600px de largeur
   - Format : JPG, PNG ou WEBP
   - Poids max : 5 MB (compression automatique)

## ✉️ Envoi d'e-mails (EmailJS)

Le formulaire de contact peut envoyer les e-mails côté client via EmailJS.
Si les variables d'environnement suivantes sont définies, l'envoi passera par EmailJS et l'application enregistrera le message sur le backend en arrière-plan (fire-and-forget) :

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Étapes:
- Créez un compte sur https://www.emailjs.com/
- Ajoutez un service (Gmail, Outlook, SMTP, etc.)
- Créez un template avec les champs: from_name, from_email, subject, message
- Copiez les IDs/clé publique et renseignez-les dans les variables ci-dessus
- Sur Vercel, ajoutez ces variables dans Project Settings > Environment Variables et redeployez

Sans ces variables, le formulaire utilisera uniquement l'API backend (`POST /api/contact`).

## 🎯 Fonctionnalités

### Public
- ✅ Page d'accueil avec hero animé
- ✅ Section "À propos" avec stack technique
- ✅ Galerie de projets avec pagination
- ✅ Détail de projet
- ✅ Formulaire de contact validé
- ✅ Design responsive (mobile, tablette, desktop)
- ✅ Animations Framer Motion
- ✅ SEO optimisé

### Admin (protégé)
- ✅ Connexion sécurisée (JWT)
- ✅ Liste des projets
- ✅ Création de projet
- ✅ Édition de projet
- ✅ Suppression de projet
- ✅ Upload d'images via Cloudinary

## 🌐 API Endpoints (Backend)

### Publiques
- `GET /api/projets` - Liste des projets (pagination)
- `GET /api/projets/:id` - Détail d'un projet
- `POST /api/contact` - Envoi formulaire de contact

### Protégées (JWT)
- `POST /api/auth` - Connexion admin
- `POST /api/projets` - Création projet
- `PUT /api/projets/:id` - Mise à jour projet
- `DELETE /api/projets/:id` - Suppression projet

## 🎨 Personnalisation du design

Le design system est défini dans :
- `src/index.css` - Variables CSS et styles globaux
- `tailwind.config.ts` - Configuration Tailwind

Couleurs principales :
- Background : `#0f172a` (bleu nuit)
- Accent : `#38bdf8` (cyan)
- Text : `#e2e8f0` (gris clair)

## 📄 Licence

Tous droits réservés © 2025 Sarkis EKPINDA

## 🤝 Contact

- Email : contact@sarkis-ekpinda.dev
- GitHub : [github.com/sarkis-ekpinda](https://github.com)
- LinkedIn : [linkedin.com/in/sarkis-ekpinda](https://linkedin.com)

---

**Note importante** : Ce projet utilise React+Vite (et non Next.js) car il est hébergé sur Lovable. Toutes les fonctionnalités demandées sont implémentées avec cette stack.
