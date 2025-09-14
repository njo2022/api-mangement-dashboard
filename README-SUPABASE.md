# Configuration Supabase pour le Dashboard API Keys

Ce guide vous explique comment configurer Supabase pour votre application de gestion des clés API.

## 1. Configuration de Supabase

### Créer un projet Supabase

1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau compte ou connectez-vous
3. Créez un nouveau projet
4. Notez votre URL de projet et vos clés API

### Variables d'environnement

Le fichier `.env.local` a été créé automatiquement avec les variables suivantes :

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Important :** Remplacez les valeurs par vos vraies clés Supabase :
1. Ouvrez le fichier `.env.local`
2. Remplacez `your-project-id` par votre ID de projet Supabase
3. Remplacez `your_anon_key` par votre clé anonyme
4. Remplacez `your_service_role_key` par votre clé de service role

## 2. Configuration de la base de données

### Exécuter le schéma SQL

1. Allez dans l'éditeur SQL de votre projet Supabase
2. Copiez et exécutez le contenu du fichier `database/schema.sql`
3. Cela créera les tables nécessaires :
   - `api_keys` : pour stocker les clés API
   - `subscription_plans` : pour les plans d'abonnement
   - `user_subscriptions` : pour les abonnements des utilisateurs

### Insérer les données de démo (optionnel)

1. Créez une nouvelle query dans l'éditeur SQL
2. Copiez tout le contenu du fichier `database/demo-data.sql`
3. Collez-le dans l'éditeur
4. Cliquez sur "Run" pour exécuter le script

Cela créera :
- 2 clés API de démo
- 1 abonnement "Researcher" pour l'utilisateur de démo

### Tables créées

#### api_keys
- `id` : UUID unique
- `name` : nom de la clé
- `type` : type (dev/prod)
- `key_value` : valeur de la clé API
- `usage_count` : nombre d'utilisations
- `usage_percent` : pourcentage d'utilisation
- `user_id` : ID de l'utilisateur
- `created_at` / `updated_at` : timestamps

#### subscription_plans
- `id` : UUID unique
- `name` : nom du plan
- `max_credits` : crédits maximum
- `price` : prix du plan
- `is_active` : statut actif

#### user_subscriptions
- `id` : UUID unique
- `user_id` : ID de l'utilisateur
- `plan_id` : ID du plan
- `current_usage` : utilisation actuelle
- `is_pay_as_you_go` : mode pay-as-you-go

## 3. Sécurité (RLS)

Le schéma inclut Row Level Security (RLS) pour :
- Les utilisateurs ne peuvent voir que leurs propres clés API
- Les utilisateurs ne peuvent modifier que leurs propres données
- Protection contre l'accès non autorisé

## 4. Fonctionnalités implémentées

### API Routes
- `GET /api/api-keys` : Récupérer les clés API d'un utilisateur
- `POST /api/api-keys` : Créer une nouvelle clé API
- `GET /api/api-keys/[id]` : Récupérer une clé spécifique
- `PUT /api/api-keys/[id]` : Mettre à jour une clé
- `DELETE /api/api-keys/[id]` : Supprimer une clé
- `GET /api/user/subscription` : Récupérer l'abonnement
- `PUT /api/user/subscription` : Mettre à jour l'abonnement

### Hooks personnalisés
- `useApiKeys` : Gestion des clés API
- `useSubscription` : Gestion des abonnements

### Fonctionnalités du Dashboard
- Affichage des clés API avec état de chargement
- Création, modification, suppression des clés
- Gestion des abonnements et plans
- Toggle pay-as-you-go
- Masquage/affichage des clés
- Copie des clés dans le presse-papiers

## 5. Utilisation

### Démarrage de l'application

```bash
npm run dev
```

### Test avec un utilisateur de démo

L'application utilise actuellement un `userId` fixe pour la démo :
```javascript
const userId = "demo-user-123";
```

Dans une vraie application, vous devriez :
1. Implémenter l'authentification Supabase
2. Récupérer l'ID utilisateur depuis la session
3. Utiliser les politiques RLS pour la sécurité

## 6. Prochaines étapes

1. **Authentification** : Intégrer Supabase Auth
2. **Validation** : Ajouter Zod pour la validation des données
3. **Tests** : Créer des tests unitaires et d'intégration
4. **Monitoring** : Ajouter des logs et monitoring
5. **Rate Limiting** : Implémenter la limitation de taux
6. **Webhooks** : Ajouter des webhooks pour les événements

## 7. Dépannage

### Erreurs communes

1. **Variables d'environnement manquantes**
   - Vérifiez que `.env.local` existe et contient les bonnes valeurs

2. **Erreurs de base de données**
   - Vérifiez que le schéma SQL a été exécuté
   - Vérifiez les permissions RLS

3. **Erreurs CORS**
   - Vérifiez la configuration des domaines autorisés dans Supabase

### Logs

Les erreurs sont loggées dans la console du navigateur et du serveur. Vérifiez les logs pour diagnostiquer les problèmes.
