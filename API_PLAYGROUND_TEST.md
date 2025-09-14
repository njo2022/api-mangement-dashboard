# 🧪 Guide de Test - API Playground

## Test de la validation des clés API

### ✅ Clé de test disponible

Pour tester la fonctionnalité sans configurer la base de données, utilisez cette clé de test :

```
dominium-test-key-12345678901234567890
```

### 🔧 Comment tester

1. **Allez sur la page API Playground**
   - Cliquez sur "API Playground" dans la barre latérale
   - Ou naviguez vers `/api-playground`

2. **Utilisez la clé de test**
   - Cliquez sur "Utiliser la clé de test" dans le formulaire
   - Ou copiez-collez : `dominium-test-key-12345678901234567890`

3. **Validez la clé**
   - Cliquez sur "Valider la clé API"
   - Vous devriez voir un popup vert : "Clé API valide"

4. **Testez l'appel API**
   - Après validation réussie, la section "Test d'appel API" apparaît
   - Cliquez sur "Tester l'API"
   - Vous devriez voir une réponse JSON avec les détails de la requête

### 🧪 Tests à effectuer

#### Test 1: Clé valide
- **Clé** : `dominium-test-key-12345678901234567890`
- **Résultat attendu** : Popup vert "Clé API valide"

#### Test 2: Clé invalide - Format incorrect
- **Clé** : `invalid-key`
- **Résultat attendu** : Popup rouge "Clé API invalide"

#### Test 3: Clé invalide - Préfixe incorrect
- **Clé** : `wrong-prefix-12345678901234567890`
- **Résultat attendu** : Popup rouge "Clé API invalide"

#### Test 4: Clé invalide - Trop courte
- **Clé** : `dominium-short`
- **Résultat attendu** : Popup rouge "Clé API invalide"

#### Test 5: Clé vide
- **Clé** : (vide)
- **Résultat attendu** : Message d'erreur "Veuillez saisir une clé API"

### 🔍 Vérification des logs

Ouvrez la console du navigateur (F12) pour voir les logs détaillés :

- ✅ `Clé de test détectée - validation réussie`
- ❌ `Clé API invalide: ne commence pas par "dominium-"`
- ❌ `Clé API invalide: trop courte`
- 🔍 `Validation de la clé API: dominium-...`

### 🛠️ Dépannage

#### Problème: Erreur "supabaseKey is required"
- **Solution** : Vérifiez que le fichier `.env.local` existe et contient les bonnes clés
- **Commande** : `npm run clean-restart`

#### Problème: Erreur de validation
- **Solution** : Vérifiez les logs dans la console du navigateur
- **Vérification** : Assurez-vous que la base de données Supabase est configurée

#### Problème: Pas de réponse de l'API
- **Solution** : Vérifiez que l'endpoint `/api/test` fonctionne
- **Test** : Allez sur `http://localhost:3000/api/test` dans le navigateur

### 📊 Résultats attendus

#### Validation réussie
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

#### Validation échouée
- Popup rouge avec message d'erreur
- Pas de section "Test d'appel API"

### 🎯 Prochaines étapes

Une fois les tests réussis :

1. **Configurez la base de données Supabase**
   - Exécutez le schéma SQL dans Supabase
   - Créez de vraies clés API via le tableau de bord

2. **Testez avec de vraies clés**
   - Créez une clé API dans le tableau de bord
   - Testez sa validation dans l'API Playground

3. **Supprimez la clé de test**
   - Retirez le code de test de `utils/apiValidation.ts`
   - Déployez en production
