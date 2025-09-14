# Guide de Configuration Rapide

## 🚨 Erreur "supabaseKey is required"

Cette erreur indique que les variables d'environnement Supabase ne sont pas configurées.

## 🔧 Solution Rapide

### Option 1: Script automatique
```bash
node scripts/setup-env.js
```

### Option 2: Configuration manuelle

1. **Créez le fichier `.env.local`** à la racine du projet :
```bash
touch .env.local
```

2. **Ajoutez le contenu suivant** dans `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Remplacez les valeurs** par vos vraies clés Supabase

## 🔑 Obtenir les clés Supabase

### 1. Créer un projet Supabase
- Allez sur [https://supabase.com](https://supabase.com)
- Créez un compte ou connectez-vous
- Cliquez sur "New Project"

### 2. Récupérer les clés
- Dans votre projet, allez dans **Settings > API**
- Copiez :
  - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
  - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Configurer la base de données
- Allez dans **SQL Editor**
- Exécutez le contenu du fichier `database/schema.sql`
- Optionnel : Exécutez `database/demo-data.sql` pour des données de test

## 🎯 Exemple de configuration

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MDk5NTIwMCwiZXhwIjoxOTU2MzU1MjAwfQ.example
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjQwOTk1MjAwLCJleHAiOjE5NTYzNTUyMDB9.example
```

## ✅ Vérification

Après configuration, redémarrez votre serveur :
```bash
npm run dev
```

L'application devrait maintenant fonctionner sans erreur !

## 🆘 Problèmes courants

### "Missing Supabase environment variables"
- Vérifiez que le fichier `.env.local` existe
- Vérifiez que les variables sont correctement nommées
- Redémarrez le serveur après modification

### "Invalid API key"
- Vérifiez que vous avez copié la bonne clé
- Assurez-vous qu'il n'y a pas d'espaces avant/après

### "Database connection failed"
- Vérifiez que l'URL du projet est correcte
- Assurez-vous que le projet Supabase est actif

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Guide de démarrage Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Variables d'environnement Next.js](https://nextjs.org/docs/basic-features/environment-variables)
