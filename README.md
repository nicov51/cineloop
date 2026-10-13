# CinéLoop

Back-office de gestion d'un vidéo-club. Application web permettant à un administrateur de gérer un catalogue de films, des fiches adhérents et les emprunts de DVD.


## Installation

### Prérequis
- Node.js 20+
- Docker Desktop
- Un client MySQL (DBeaver, MySQL Workbench, etc.)

### Étapes

```bash
git clone https://github.com/nicov51/cineLoop.git
cd cineLoop
npm install
docker compose up -d
```

## Concept

Un vidéo-club physique. Un seul utilisateur : l'administrateur (le gérant). Il gère :
- Le catalogue des films (ajout, modification, suppression)
- Les fiches des adhérents (les clients)
- Les emprunts : enregistrer une location, enregistrer un retour, suivre les retards

Les adhérents n'ont pas de compte. Ils ne réservent pas en ligne. Ils viennent physiquement, l'administrateur enregistre l'emprunt.

## Stack technique

| Élément | Choix | Justification |
|---|---|---|
| Runtime | **Node.js** | JavaScript côté serveur, écosystème riche |
| Framework | **Express** | Minimaliste, standard, bien documenté |
| Base de données | **MySQL** | Base relationnelle, adaptée aux relations 1-N et N-N du projet |
| Driver SQL | **mysql2** | Requêtes SQL écrites à la main, pour démontrer la maîtrise du SQL. Gère les promesses et le pool de connexions |
| Moteur de template | **EJS** | Rendu côté serveur, pas de séparation front/back, moins de code |
| Conteneurisation | **Docker** | Environnement identique en développement et en production |
| Déploiement | **VPS** | Hébergement du back-office |

### Pourquoi pas d'ORM ?

Le référentiel DWWM demande explicitement de « développer des composants d'accès aux données SQL ». L'utilisation d'un ORM (Sequelize, Prisma) masquerait le SQL. `mysql2` permet d'écrire les requêtes à la main, ce qui correspond à l'objectif pédagogique et à l'évaluation.

### Pourquoi EJS et pas un front séparé ?

Pour un back-office, EJS évite d'écrire une API REST complète et un front qui la consomme. Le rendu se fait côté serveur, tout est dans le même dépôt, le code est plus court et plus lisible pour un correcteur.

## Modèle de données

Six tables :

- `admin` — l'administrateur (email, mot de passe hashé)
- `adherent` — les clients du vidéo-club
- `film` — le catalogue
- `categorie` — les genres (Action, Comédie, etc.)
- `film_categorie` — table de liaison N-N entre films et catégories
- `reservation` — les emprunts

Relations :
- Un adhérent peut avoir plusieurs réservations (1-N)
- Un film peut être concerné par plusieurs réservations (1-N)
- Un film peut appartenir à plusieurs catégories, une catégorie contient plusieurs films (N-N)

## Structure du projet
cineLoop/
├── src/
│ ├── app.js # Point d'entrée Express
│ ├── db.js # Pool de connexions MySQL
│ ├── routes/ # Routes Express
│ ├── services/ # Logique métier
│ └── views/ # Templates EJS
├── sql/
│ ├── 01-schema.sql # Création des tables
│ └── 02-seed.sql # Données de test
├── Dockerfile
├── docker-compose.yml
├── .gitignore
└── package.json