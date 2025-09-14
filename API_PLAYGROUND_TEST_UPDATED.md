# 🧪 Guide de Test - API Playground (Version Base de Données)

## ✅ Clés API de test disponibles

Les clés suivantes ont été ajoutées à votre base de données Supabase et peuvent être testées :

### 🔑 **Clés de test en base de données :**

1. **Clé de développement :**
   ```
   dominium-test-dev-12345678901234567890
   ```
   - Type: `dev`
   - Statut: Active dans la base de données

2. **Clé de production :**
   ```
   dominium-test-prod-12345678901234567890
   ```
   - Type: `prod`
   - Statut: Active dans la base de données

## 🧪 **Comment tester :**

### 1. **Allez sur l'API Playground**
- Naviguez vers `http://localhost:3000/api-playground`
- Ou cliquez sur "API Playground" dans la barre latérale

### 2. **Testez une clé valide**
- Copiez une des clés ci-dessus
- Collez-la dans le champ "Clé API"
- Cliquez sur "Valider la clé API"
- **Résultat attendu :** Popup vert "Clé API valide"

### 3. **Testez l'appel API**
- Après validation réussie, la section "Test d'appel API" apparaît
- Cliquez sur "Tester l'API"
- **Résultat attendu :** Réponse JSON avec les détails de la requête

## 🔍 **Vérification des logs**

Ouvrez la console du navigateur (F12) pour voir les logs détaillés :

### ✅ **Clé valide :**
```
🔍 Validation de la clé API: dominium-t...
✅ Clé API valide trouvée: b8a50236-7c38-4a1d-b179-ecfd05681fb7
```

### ❌ **Clé invalide :**
```
🔍 Validation de la clé API: invalid-k...
❌ Erreur Supabase: { message: "No rows found", code: "PGRST116" }
ℹ️ Clé API introuvable dans la base de données
```

## 🧪 **Tests à effectuer :**

### Test 1: Clé de développement valide
- **Clé** : `dominium-test-dev-12345678901234567890`
- **Résultat attendu** : Popup vert "Clé API valide"

### Test 2: Clé de production valide
- **Clé** : `dominium-test-prod-12345678901234567890`
- **Résultat attendu** : Popup vert "Clé API valide"

### Test 3: Clé inexistante
- **Clé** : `dominium-nonexistent-12345678901234567890`
- **Résultat attendu** : Popup rouge "Clé API invalide"

### Test 4: Format incorrect
- **Clé** : `wrong-format-key`
- **Résultat attendu** : Popup rouge "Clé API invalide"

### Test 5: Clé trop courte
- **Clé** : `dominium-short`
- **Résultat attendu** : Popup rouge "Clé API invalide"

## 📊 **Réponse API attendue :**

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

## 🔧 **Ajouter d'autres clés de test :**

Si vous voulez ajouter d'autres clés de test, modifiez le script :

```bash
# Éditez le fichier
nano scripts/add-test-api-keys.js

# Puis exécutez
npm run add-test-keys
```

## 🎯 **Prochaines étapes :**

1. **Testez les clés** dans l'API Playground
2. **Vérifiez les logs** dans la console du navigateur
3. **Créez de vraies clés** via le tableau de bord
4. **Testez avec vos vraies clés** dans l'API Playground

## 🆘 **Dépannage :**

### Problème: "Clé API invalide" pour une clé valide
- Vérifiez que la base de données Supabase est accessible
- Vérifiez les logs dans la console du navigateur
- Assurez-vous que les clés ont été ajoutées avec `npm run add-test-keys`

### Problème: Erreur de connexion à la base de données
- Vérifiez votre fichier `.env.local`
- Vérifiez que votre projet Supabase est actif
- Redémarrez le serveur avec `npm run clean-restart`

---

**🎉 Maintenant vous pouvez tester la validation des clés API avec de vraies données de base de données !**

