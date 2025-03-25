# ✅ TodoSmart — Gestionnaire de Tâches & Catégories

**TodoSmart** est une application web moderne et interactive développée dans le cadre d’un projet scolaire de BUT2 à l’IUT. Elle permet de gérer efficacement des tâches et des catégories à travers une interface claire, réactive et personnalisable.

---

## 🎯 Objectifs du projet

Ce projet a été conçu pour répondre à un ensemble de fonctionnalités précises autour de la gestion de tâches, telles que :

- La **création**, **modification**, **suppression** et **visualisation** de tâches et de catégories (CRUD complet)
- Un système de **tri** (nom, date de création, date d’échéance)
- Des **filtres combinés** (catégories, états, urgence, fait/pas fait)
- La possibilité de **lier des tâches à une ou plusieurs catégories**
- Une interface claire avec une **modale d’ajout intelligente** adaptée à la page active (tâches ou catégories)
- L’import de données via un **fichier JSON**
- Une **page d’accueil ergonomique** qui propose de démarrer à partir de zéro ou depuis un fichier existant
- Un **graphique circulaire** pour visualiser la répartition des tâches par état
- Un affichage visuel dynamique :
    - Les tâches urgentes sont mises en évidence
    - Les tâches terminées sont barrées

---

## 🖥️ Fonctionnement général

- À l’ouverture, l’utilisateur peut importer un fichier JSON ou démarrer sans données
- Par défaut, l’interface affiche les tâches non terminées triées par échéance
- Il est possible de basculer vers la vue **Catégories** à tout moment
- Un bouton unique permet d’ajouter une tâche ou une catégorie, selon la vue active
- Tous les éléments de tri et de filtre sont accessibles via une fenêtre contextuelle stylisée

---

## 🛠️ Technologies utilisées

- **React** (TypeScript)
- **CSS Modules**
- **React Icons**
- **Gestion d’état via `useState` et context personnalisé**
- **Import JSON dynamique**

---

## 📚 Projet académique

> Ce projet a été réalisé dans le cadre du parcours BUT2 Informatique à l’IUT, pour le semestre R4A.11 — Programmation Web avancée.

Il s’inscrit dans un travail encadré par des consignes précises portant sur la structuration des données, l’interactivité de l’interface, et l’intégration de fonctionnalités complexes comme les filtres multi-critères et la gestion relationnelle Tâches / Catégories.

---

## 📦 Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/vaaloo/todosmart.git
cd todolist
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Lancer l'application

```bash
npm start
```

L'application sera accessible à l'adresse : [http://localhost:3000](http://localhost:3000)

---

### ⚙️ Pré-requis

- Node.js ≥ 18.x
- npm ≥ 9.x
- Un navigateur moderne (Chrome, Firefox, Edge…)

## 👨‍💻 Auteurs

- Vaaloo — [vaaloo.fr](https://vaaloo.fr)
- Projet pédagogique - 2024/2025