# 🔧 Guide de Dépannage

## Erreur "supabaseKey is required"

### 🚨 Symptômes
- Erreur runtime : `supabaseKey is required`
- L'application ne se charge pas
- Message d'erreur dans la console du navigateur

### ✅ Solutions par ordre de priorité

#### 1. **Solution Rapide - Nettoyage complet**
```bash
npm run clean-restart
```
Ce script va :
- Vérifier que `.env.local` existe
- Nettoyer le cache Next.js
- Redémarrer le serveur proprement

#### 2. **Vérification manuelle des variables**
```bash
# Vérifier que le fichier existe
type .env.local

# Vérifier le contenu
cat .env.local
```

Le fichier doit contenir :
```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 3. **Redémarrage forcé**
```bash
# Arrêter le serveur (Ctrl+C)
# Puis :
rm -rf .next
npm run dev
```

#### 4. **Recréation du fichier .env.local**
```bash
# Supprimer l'ancien fichier
rm .env.local

# Recréer avec le script
npm run setup-env

# Configurer vos vraies clés Supabase
# Puis redémarrer
npm run dev
```

### 🔍 Diagnostic

#### Vérifier les variables d'environnement
```bash
# Dans le terminal du serveur, vérifiez que les variables sont chargées
echo $NEXT_PUBLIC_SUPABASE_URL
```

#### Vérifier la console du navigateur
- Ouvrez les outils de développement (F12)
- Allez dans l'onglet Console
- Cherchez les messages d'erreur liés à Supabase

#### Vérifier les logs du serveur
- Regardez le terminal où tourne `npm run dev`
- Cherchez les messages d'erreur ou d'avertissement

### 🛠️ Solutions avancées

#### Problème de cache persistant
```bash
# Nettoyage complet
rm -rf .next
rm -rf node_modules/.cache
npm run dev
```

#### Problème de variables d'environnement
```bash
# Vérifier le format du fichier .env.local
# Assurez-vous qu'il n'y a pas d'espaces avant/après les =
# Assurez-vous qu'il n'y a pas de guillemets autour des valeurs
```

#### Problème de clés Supabase
- Vérifiez que vos clés sont valides sur [supabase.com](https://supabase.com)
- Assurez-vous que le projet Supabase est actif
- Vérifiez que les clés correspondent au bon projet

### 📋 Checklist de vérification

- [ ] Fichier `.env.local` existe
- [ ] Variables `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` sont définies
- [ ] Les clés ne contiennent pas d'espaces ou de caractères invalides
- [ ] Le serveur a été redémarré après modification de `.env.local`
- [ ] Le cache Next.js a été nettoyé
- [ ] Les clés Supabase sont valides et actives

### 🆘 Si rien ne fonctionne

1. **Vérifiez votre configuration Supabase**
   - Allez sur [supabase.com](https://supabase.com)
   - Vérifiez que votre projet est actif
   - Regénérez les clés si nécessaire

2. **Recréez complètement le projet**
   ```bash
   rm -rf .next
   rm .env.local
   npm run setup-env
   # Configurez vos clés
   npm run dev
   ```

3. **Contactez le support**
   - Incluez les logs d'erreur complets
   - Incluez le contenu de votre `.env.local` (sans les vraies clés)
   - Décrivez les étapes que vous avez essayées

### 📚 Ressources utiles

- [Documentation Supabase](https://supabase.com/docs)
- [Variables d'environnement Next.js](https://nextjs.org/docs/basic-features/environment-variables)
- [Guide de configuration Supabase](SETUP-GUIDE.md)
