# Instructions pour l'application Dragodinde


Ce projet est une application de gestion d'élevage de dragodinde avec une architecture Docker en 3 conteneurs :

## Architecture

- **Backend** : Node.js/Express avec API REST (port 3001)
- **Frontend** : React (port 3000)
- **Base de données** : PostgreSQL (port 5432)

## Modèle de données

Table `dragodindes` avec les colonnes :

- `id` : INTEGER PRIMARY KEY AUTO_INCREMENT
- `couleurs` : VARCHAR(255) - couleurs de la dragodinde
- `sexe` : ENUM('Male', 'Femelle') - sexe de la dragodinde
- `generation` : INTEGER - numéro de génération
- `nb_production` : INTEGER - nombre de productions

## API Endpoints

- `GET /api/dragodindes` - Récupérer toutes les dragodindes
- `POST /api/dragodindes` - Créer une nouvelle dragodinde
- `PUT /api/dragodindes/:id` - Mettre à jour une dragodinde
- `DELETE /api/dragodindes/:id` - Supprimer une dragodinde

## Règles de développement

- CRUD public sans authentification
- Utiliser des noms en français pour l'interface utilisateur
- Validation côté frontend et backend
- Gestion d'erreurs appropriée
- Interface moderne et responsive
