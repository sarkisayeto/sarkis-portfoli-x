# Portfolio Kissotech

Portfolio professionnel full-stack avec backend Node.js/Express et frontend React/TypeScript.

## 🚀 Technologies

### Backend
- Node.js 20
- Express.js
- MongoDB Atlas (Mongoose)
- JWT Authentication
- Nodemailer (Gmail SMTP)
- Express Validator, Helmet, CORS, Rate Limiting

### Frontend
- React 18
- TypeScript
- Vite
- React Router v6
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Query (TanStack Query)
- Cloudinary (image upload)

## 📁 Structure du projet

```
portfolio_kissotech/
├── portfolio-backend/     # API Backend
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── package.json
├── frontend/              # Application React
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## 🛠️ Installation locale

### Backend

```bash
cd portfolio-backend
npm install
cp .env.example .env  # Configurez vos variables d'environnement
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🌐 Déploiement

- **Backend** : Railway (https://railway.app)
- **Frontend** : Vercel (https://vercel.com)
- **Base de données** : MongoDB Atlas M0 (Free tier)

## 📝 Variables d'environnement

Voir les fichiers `.env.example` dans chaque dossier.

## 👨‍💻 Auteur

**Sarkis Ekpinda**
- Email: sarkisekpinda832@gmail.com
- GitHub: [@sarkisayeto](https://github.com/sarkisayeto)

## 📄 Licence

MIT
