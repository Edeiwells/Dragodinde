# 🐉 Élevage de Dragodinde

Application complète de gestion d'élevage de dragodinde avec une architecture Docker en 3 conteneurs.

## 🏗️ Architecture

- **Frontend** : React (port 3000)
- **Backend** : Node.js/Express (port 3001)
- **Base de données** : PostgreSQL (port 5432)

## 📋 Fonctionnalités

- ✅ CRUD complet pour les dragodindes
- ✅ Interface moderne et responsive
- ✅ API REST sécurisée
- ✅ Base de données PostgreSQL
- ✅ Validation des données
- ✅ Gestion d'erreurs
- ✅ Architecture en conteneurs Docker

## 🚀 Installation et utilisation

### Prérequis

- Docker
- Docker Compose

### Lancement rapide

```bash
# Cloner le projet
git clone <votre-repo>
cd dragodinde

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

### Table `dragodindes`

| Colonne       | Type               | Description                 |
| ------------- | ------------------ | --------------------------- |
| id            | SERIAL PRIMARY KEY | Identifiant unique          |
| couleurs      | VARCHAR(255)       | Couleurs de la dragodinde   |
| sexe          | VARCHAR(10)        | 'Male' ou 'Femelle'         |
| generation    | INTEGER            | Numéro de génération (≥ 0)  |
| nb_production | INTEGER            | Nombre de productions (≥ 0) |
| created_at    | TIMESTAMP          | Date de création            |
| updated_at    | TIMESTAMP          | Date de modification        |

## 🔧 API Endpoints

| Méthode | Endpoint               | Description                      |
| ------- | ---------------------- | -------------------------------- |
| GET     | `/api/dragodindes`     | Récupérer toutes les dragodindes |
| GET     | `/api/dragodindes/:id` | Récupérer une dragodinde         |
| POST    | `/api/dragodindes`     | Créer une dragodinde             |
| PUT     | `/api/dragodindes/:id` | Modifier une dragodinde          |
| DELETE  | `/api/dragodindes/:id` | Supprimer une dragodinde         |

## 🛠️ Développement

### Structure du projet

```
dragodinde/
├── backend/              # API Node.js/Express
│   ├── server.js        # Serveur principal
│   ├── package.json     # Dépendances backend
│   ├── Dockerfile       # Image Docker backend
│   └── .env            # Variables d'environnement
├── frontend/            # Interface React
│   ├── src/
│   │   ├── App.js      # Composant principal
│   │   ├── components/ # Composants React
│   │   └── App.css     # Styles
│   ├── package.json    # Dépendances frontend
│   ├── Dockerfile      # Image Docker frontend
│   └── nginx.conf      # Configuration Nginx
├── database/           # Base de données
│   └── init.sql       # Script d'initialisation
├── docker-compose.yml  # Configuration production
└── docker-compose.dev.yml # Configuration développement
```

### Commandes utiles

```bash
# Voir les logs
docker-compose logs -f

# Redémarrer un service
docker-compose restart backend

# Arrêter l'application
docker-compose down

# Supprimer les volumes (données)
docker-compose down -v

# Rebuild les images
docker-compose build

# Mode développement avec hot reload
docker-compose -f docker-compose.dev.yml up
```

### Variables d'environnement

#### Backend (.env)

```env
DB_HOST=db
DB_PORT=5432
DB_NAME=dragodinde_db
DB_USER=postgres
DB_PASSWORD=password
PORT=3001
```

#### Frontend

```env
REACT_APP_API_URL=http://localhost:3001/api
```

## 🎨 Interface utilisateur

L'interface propose :

- Formulaire d'ajout/modification de dragodindes
- Liste interactive avec actions (modifier, supprimer)
- Design moderne avec dégradés et animations
- Responsive design pour mobile et desktop
- Validation en temps réel
- Messages d'erreur explicites

## 🔒 Sécurité

- Validation des données côté backend et frontend
- Contraintes de base de données
- Gestion des erreurs appropriée
- CORS configuré pour le développement

## 📈 Données d'exemple

L'application se lance avec des données d'exemple :

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
