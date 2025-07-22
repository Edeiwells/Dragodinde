# 🐉 Élevage de Dragodinde

Application complète de gestion d'élevage de dragodinde avec une architecture Docker en 3 conteneurs.

## 🏗️ Architecture

- **Frontend** : React (port 3000)
- **Backend** : Node.js/Express (port 3001)
- **Base de données** : PostgreSQL (port 5432)

## 📋 Fonctionnalités

- ✅ CRUD complet pour les dragodindes
- ✅ Création en lot de dragodindes identiques
- ✅ Interface moderne et responsive
- ✅ API REST avec architecture modulaire
- ✅ Base de données PostgreSQL
- ✅ Validation des données
- ✅ Gestion d'erreurs robuste
- ✅ Architecture en conteneurs Docker

## 🚀 Installation et utilisation

### Prérequis

- Docker
- Docker Compose

### Lancement rapide

```bash
# Cloner le projet
git clone https://github.com/Edeiwells/Dragodinde.git
cd Dragodinde

# Lancer l'application complète
docker-compose up -d

# Ou en mode développement
docker-compose -f docker-compose.dev.yml up -d
```

### Accès à l'application

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:3001/api
- **Base de données** : localhost:5432

## 📊 Modèle de données

### Dragodinde

| Champ | Type | Description |
|-------|------|-------------|
| id | INTEGER | Identifiant unique (auto-généré) |
| couleurs | VARCHAR(255) | Couleurs de la dragodinde |
| sexe | VARCHAR(10) | Sexe (Male/Femelle) |
| generation | INTEGER | Numéro de génération |
| nb_production | INTEGER | Nombre de reproductions |
| created_at | TIMESTAMP | Date de création |
| updated_at | TIMESTAMP | Date de dernière modification |

## 🔧 Structure du projet

```
Dragodinde/
├── backend/
│   ├── config/
│   │   └── database.js         # Configuration base de données
│   ├── controllers/
│   │   └── dragodindController.js # Logique métier
│   ├── middlewares/
│   │   └── validation.js       # Validation des données
│   ├── routes/
│   │   └── dragodindRoutes.js  # Définition des routes
│   ├── utils/
│   │   └── responseHelper.js   # Utilitaires de réponse
│   ├── server.js               # Point d'entrée du serveur
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── DragodindForm.js # Formulaire d'ajout/modification
│   │   │   └── DragodindList.js # Liste des dragodindes
│   │   ├── App.js              # Composant principal
│   │   ├── App.css             # Styles
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── database/
│   └── init.sql                # Script d'initialisation
├── docker-compose.yml          # Configuration production
├── docker-compose.dev.yml      # Configuration développement
└── README.md
```

## 🎯 API Endpoints

### Dragodindes

- `GET /api/dragodindes` - Récupérer toutes les dragodindes
- `GET /api/dragodindes/:id` - Récupérer une dragodinde
- `POST /api/dragodindes` - Créer une dragodinde
- `POST /api/dragodindes/batch` - Créer plusieurs dragodindes identiques
- `PUT /api/dragodindes/:id` - Modifier une dragodinde
- `DELETE /api/dragodindes/:id` - Supprimer une dragodinde

### Format de réponse API

```json
{
  "success": true,
  "data": { ... },
  "message": "Message optionnel"
}
```

## 🛠️ Développement

### Installation locale

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm start

# Base de données (Docker)
docker run -d -p 5432:5432 -e POSTGRES_DB=dragodinde_db -e POSTGRES_PASSWORD=password postgres:15-alpine
```

### Variables d'environnement

Backend (`.env`):
```
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dragodinde_db
DB_USER=postgres
DB_PASSWORD=password
NODE_ENV=development
```

Frontend (`.env`):
```
REACT_APP_API_URL=http://localhost:3001/api
```

## 📱 Fonctionnalités de l'interface

### Gestion des dragodindes

- **Ajout** : Formulaire avec validation des champs
- **Modification** : Édition en place avec préremplissage
- **Suppression** : Confirmation avant suppression
- **Création en lot** : Possibilité de créer plusieurs dragodindes identiques en une fois

### Interface utilisateur

- Design moderne et responsive
- Messages d'erreur informatifs
- Chargement avec indicateurs visuels
- Navigation intuitive

## 📝 Exemples de données

Exemples de dragodindes pour tester l'application :

- Rouge et Or (♂, Génération 1)
- Bleu Océan (♀, Génération 1, 2 productions)
- Vert Emeraude (♂, Génération 2, 1 production)
- Violet Royal (♀, Génération 1, 3 productions)
- Blanc Nacré (♂, Génération 3)

## 🚨 Dépannage

### Problèmes courants

1. **Port déjà utilisé** : Vérifiez qu'aucun autre service n'utilise les ports 3000, 3001 ou 5432
2. **Base de données non accessible** : Attendez que PostgreSQL soit complètement démarré
3. **Erreurs de build** : Supprimez les images et reconstruisez avec `docker-compose build --no-cache`

### Logs utiles

```bash
# Logs de tous les services
docker-compose logs

# Logs d'un service spécifique
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -am 'Ajout nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est sous licence MIT.
