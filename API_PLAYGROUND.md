# API Playground - Documentation

## Vue d'ensemble

L'API Playground est une nouvelle fonctionnalité qui permet aux utilisateurs de tester et valider leurs clés API directement depuis l'interface web. Cette page est accessible via la barre latérale en cliquant sur "API Playground".

## Fonctionnalités

### 1. Validation de clé API
- **Formulaire de validation** : Permet de saisir une clé API et vérifier sa validité
- **Validation en temps réel** : Vérification immédiate avec la base de données Supabase
- **Messages de feedback** : Popups verts pour les clés valides, rouges pour les clés invalides

### 2. Test d'appel API
- **Exemple d'utilisation** : Après validation réussie, affiche un exemple d'appel API
- **Endpoint de test** : `/api/test` pour démontrer l'utilisation de la clé
- **Réponse détaillée** : Affiche la réponse complète de l'API

## Structure des fichiers

```
app/
  api-playground/
    └── page.tsx                    # Page principale API Playground
  api/
    test/
      └── route.ts                  # Endpoint de test API

components/
  api-playground/
    ├── ApiValidationForm.tsx       # Formulaire de validation
    └── ApiExample.tsx              # Exemple d'utilisation API

hooks/
  └── useApiPlayground.ts           # Hook personnalisé pour la gestion d'état

utils/
  └── apiValidation.ts              # Logique de validation des clés API
```

## Utilisation

### 1. Accès à la page
- Cliquer sur "API Playground" dans la barre latérale
- Ou naviguer directement vers `/api-playground`

### 2. Validation d'une clé API
1. Saisir la clé API dans le champ de texte
2. Cliquer sur "Valider la clé API"
3. Attendre la réponse (popup vert/rouge)

### 3. Test d'appel API
1. Après validation réussie, la section "Test d'appel API" apparaît
2. Cliquer sur "Tester l'API" pour faire un appel de test
3. Voir la réponse détaillée de l'API

## Validation des clés API

### Critères de validation
- **Format** : Doit commencer par "dominium-"
- **Longueur** : Minimum 20 caractères
- **Existence** : Doit exister dans la table `api_keys` de Supabase
- **Statut** : Doit être active (`is_active = true`)

### Messages d'erreur
- "Clé API valide" (vert) : Clé trouvée et active
- "Clé API invalide" (rouge) : Clé introuvable ou inactive
- "Erreur lors de la validation" : Erreur technique

## Endpoint de test API

### URL
```
POST /api/test
```

### Headers requis
```
Authorization: Bearer {api_key}
Content-Type: application/json
```

### Body de la requête
```json
{
  "query": "Test de l'API",
  "type": "test"
}
```

### Réponse de succès
```json
{
  "success": true,
  "message": "API call successful",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "request": {
    "method": "POST",
    "endpoint": "/api/test",
    "body": {
      "query": "Test de l'API",
      "type": "test"
    }
  },
  "apiKey": {
    "prefix": "dominium-...",
    "length": 32
  },
  "data": {
    "query": "Test de l'API",
    "type": "test",
    "processed": true
  }
}
```

## Sécurité

### Validation côté serveur
- Toutes les clés API sont validées côté serveur
- Vérification de l'existence et du statut dans la base de données
- Pas d'exposition des clés complètes dans les réponses

### Gestion des erreurs
- Messages d'erreur génériques pour éviter l'exposition d'informations sensibles
- Logging des erreurs côté serveur pour le debugging
- Timeout et gestion des erreurs réseau

## Personnalisation

### Styles
- Utilise Tailwind CSS pour le styling
- Composants réutilisables (Toast, Modal, etc.)
- Design cohérent avec le reste de l'application

### Configuration
- Validation des clés configurable dans `utils/apiValidation.ts`
- Messages personnalisables dans les composants
- Endpoints API modifiables dans `app/api/`

## Développement

### Ajout de nouvelles validations
1. Modifier `utils/apiValidation.ts`
2. Ajouter les nouveaux critères de validation
3. Mettre à jour les messages d'erreur

### Ajout de nouveaux endpoints de test
1. Créer un nouveau fichier dans `app/api/`
2. Implémenter la validation de clé API
3. Ajouter l'endpoint dans `ApiExample.tsx`

### Tests
- Tester avec des clés API valides et invalides
- Vérifier les messages d'erreur
- Tester les appels API avec différents paramètres
