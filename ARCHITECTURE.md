# Architecture de l'Application Dashboard API Keys

## Vue d'ensemble

L'application est construite avec Next.js 15 et Supabase, suivant une architecture moderne avec séparation des responsabilités.

## Structure du projet

```
nextjs-project1/
├── app/
│   ├── api/
│   │   ├── api-keys/
│   │   │   ├── route.js          # CRUD des clés API
│   │   │   └── [id]/route.js     # Opérations sur une clé spécifique
│   │   └── user/
│   │       └── subscription/
│   │           └── route.js      # Gestion des abonnements
│   ├── tableau-de-bord/
│   │   └── page.js               # Interface utilisateur principale
│   └── layout.js
├── lib/
│   └── supabase.js               # Configuration client Supabase
├── hooks/
│   ├── useApiKeys.js             # Hook pour les clés API
│   └── useSubscription.js        # Hook pour les abonnements
├── database/
│   └── schema.sql                # Schéma de base de données
└── scripts/
    └── setup-supabase.js         # Script de configuration
```

## Flux de données

### 1. Frontend (React Components)
- **Dashboard** : Interface utilisateur principale
- **Hooks personnalisés** : Gestion de l'état et des appels API
- **État local** : Gestion des modals, formulaires, etc.

### 2. API Routes (Next.js)
- **GET /api/api-keys** : Récupération des clés API
- **POST /api/api-keys** : Création d'une nouvelle clé
- **PUT /api/api-keys/[id]** : Mise à jour d'une clé
- **DELETE /api/api-keys/[id]** : Suppression d'une clé
- **GET /api/user/subscription** : Récupération de l'abonnement
- **PUT /api/user/subscription** : Mise à jour de l'abonnement

### 3. Base de données (Supabase)
- **Tables** : api_keys, subscription_plans, user_subscriptions
- **RLS** : Row Level Security pour la sécurité
- **Triggers** : Mise à jour automatique des timestamps

## Sécurité

### Row Level Security (RLS)
- Les utilisateurs ne peuvent accéder qu'à leurs propres données
- Politiques de sécurité au niveau de la base de données
- Protection contre l'accès non autorisé

### Variables d'environnement
- Clés API stockées de manière sécurisée
- Séparation entre clés publiques et privées
- Service role key pour les opérations côté serveur

## Gestion d'état

### Hooks personnalisés
- **useApiKeys** : Gestion des clés API avec cache local
- **useSubscription** : Gestion des abonnements
- **État de chargement** : Gestion des états loading/error

### Optimisations
- Mise à jour optimiste de l'interface
- Gestion des erreurs avec retry
- Cache local pour éviter les appels API inutiles

## Fonctionnalités

### CRUD des clés API
- ✅ Création avec génération automatique de clés
- ✅ Lecture avec pagination et filtres
- ✅ Mise à jour des métadonnées
- ✅ Suppression avec confirmation

### Gestion des abonnements
- ✅ Affichage du plan actuel
- ✅ Toggle pay-as-you-go
- ✅ Suivi de l'utilisation
- ✅ Barre de progression

### Interface utilisateur
- ✅ Design responsive avec Tailwind CSS
- ✅ États de chargement et d'erreur
- ✅ Modals pour les formulaires
- ✅ Actions rapides (copier, masquer, etc.)

## Déploiement

### Variables d'environnement requises
```env
NEXT_PUBLIC_SUPABASE_URL=https://project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=anon_key
SUPABASE_SERVICE_ROLE_KEY=service_role_key
```

### Scripts disponibles
- `npm run dev` : Développement local
- `npm run build` : Build de production
- `npm run setup-supabase` : Configuration Supabase

## Prochaines étapes

### Authentification
- Intégration Supabase Auth
- Gestion des sessions utilisateur
- Protection des routes

### Validation
- Schémas Zod pour la validation
- Validation côté client et serveur
- Messages d'erreur personnalisés

### Tests
- Tests unitaires avec Jest
- Tests d'intégration avec Playwright
- Tests de l'API avec Supertest

### Monitoring
- Logs structurés
- Métriques de performance
- Alertes d'erreur

## Technologies utilisées

- **Frontend** : Next.js 15, React 19, Tailwind CSS
- **Backend** : Next.js API Routes
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Supabase Auth (à implémenter)
- **Déploiement** : Vercel (recommandé)
