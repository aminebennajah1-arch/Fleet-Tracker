🚗 Fleet Tracker - Gestionnaire de Flotte Automobile

Ce projet est une application web full-stack permettant de gérer une flotte de véhicules et d'assurer le suivi de leurs entretiens.
Il a été développé pour répondre aux exigences de l'évaluation : utilisation de Node.js, intégration d'une base de données persistante (SQLite) et mise en place d'un système d'authentification sécurisé.

🛠️ Technologies Utilisées

Backend : Node.js, Express.js

Base de données : SQLite (fichier local database.sqlite)

Sécurité : JWT (JSON Web Tokens) pour l'authentification, bcrypt pour le hachage des mots de passe.

Frontend : React.js, React Router, Axios

Génération PDF : jsPDF et jsPDF-AutoTable

Design : CSS personnalisé (Thème sombre "Glassmorphism" moderne)

🔑 Fonctionnalités Principales

Authentification : Inscription et connexion sécurisées. Les routes de l'API et les pages de l'application sont protégées et inaccessibles sans token valide.

Gestion des véhicules (CRUD) : Ajout, visualisation et gestion du statut des véhicules de la flotte.

Carnet d'entretien : Historique détaillé par véhicule (date, kilométrage, type d'intervention et notes).

Génération de rapports : Exportation instantanée d'un rapport PDF complet incluant l'état de la flotte et l'historique détaillé des réparations.

⚙️ Prérequis

Assurez-vous d'avoir installé sur votre machine :

Node.js (version 14 ou supérieure)

npm (inclus avec Node.js)

🚀 Installation et Lancement

Le projet est divisé en deux parties (Backend et Frontend) qu'il faut lancer simultanément dans deux terminaux distincts.

Étape 1 : Configuration du Backend (Serveur & Base de données)

Ouvrez un terminal et naviguez dans le dossier backend :
cd backend

Installez les dépendances nécessaires :
npm install

(Optionnel) Vérifiez la présence du fichier .env contenant le port et la clé secrète JWT :
PORT=5000
JWT_SECRET=votre_cle_secrete_super_securisee

Lancez le serveur :
node server.js
Note : Au premier lancement, la base de données SQLite (database.sqlite) et ses tables se créeront automatiquement si elles n'existent pas.

Étape 2 : Configuration du Frontend (Interface Utilisateur)

Ouvrez un second terminal et naviguez dans le dossier frontend :
cd frontend

Installez les dépendances du client :
npm install

Lancez l'application React :
npm start

Étape 3 : Tester l'application

L'interface web s'ouvrira automatiquement dans votre navigateur à l'adresse http://localhost:3000.
Pour commencer, créez un nouveau compte utilisateur via la page d'inscription, connectez-vous, puis ajoutez votre premier véhicule pour accéder au carnet d'entretien.

