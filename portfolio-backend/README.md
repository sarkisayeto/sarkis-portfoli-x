# Portfolio Backend

## Installation locale

1. Copier `.env.example` vers `.env` et compléter les variables.
2. Lancer MongoDB (ou utiliser docker-compose ci-dessous).
3. `npm install`
4. `npm run dev`

## Variables importantes
- `MONGO_URI` — URI MongoDB
- `ADMIN_EMAIL` — adresse admin recevant les messages
- `SMTP_*` — config SMTP
- `JWT_SECRET` — secret pour signer les tokens
- `ADMIN_USER` + `ADMIN_PASS` — identifiants admin simples (pour login)

## Endpoints clés
- `GET /api/projets` — liste publique (pagination possible)
- `GET /api/projets/:id` — détail
- `POST /api/contact` — formulaire contact
- `POST /api/auth` — login admin -> retourne token
- `POST /api/projets` (protected) — création projet
- `PUT /api/projets/:id` (protected)
- `DELETE /api/projets/:id` (protected)

## Déploiement via Docker
- `docker-compose up --build`

```

---

## Notes / améliorations conseillées
- Pour la production, ne stocke pas `ADMIN_PASS` en clair — crée un modèle `Admin` et stocke le mot de passe hashé (bcrypt). J'ai gardé la version simple pour déployer rapidement.
- Tu peux ajouter upload d'images (Cloudinary / S3) pour `coverImage`.
- Ajouter tests unitaires & e2e.
- Limiter CORS uniquement au frontend de ton portfolio.
