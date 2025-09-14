# 🚀 Guide de démarrage rapide - Supabase

## Étapes pour connecter votre application à Supabase

### 1. Créer un projet Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte ou connectez-vous
3. Cliquez sur "New Project"
4. Choisissez votre organisation et donnez un nom au projet
5. Attendez que le projet soit créé (2-3 minutes)

### 2. Récupérer vos clés API
1. Dans votre projet Supabase, allez dans **Settings** > **API**
2. Copiez les valeurs suivantes :
   - **Project URL** (ex: `https://abcdefgh.supabase.co`)
   - **anon public** key (commence par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)
   - **service_role** key (commence par `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Configurer les variables d'environnement
1. Ouvrez le fichier `.env.local` dans votre projet
2. Remplacez les valeurs par vos vraies clés :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Créer la base de données
1. Dans Supabase, allez dans **SQL Editor**
2. Cliquez sur "New query"
3. Copiez tout le contenu du fichier `database/schema.sql`
4. Collez-le dans l'éditeur
5. Cliquez sur "Run" pour exécuter le script

### 5. Tester l'application
```bash
npm run dev
```

Ouvrez [http://localhost:3000/tableau-de-bord](http://localhost:3000/tableau-de-bord) dans votre navigateur.

## ✅ Vérification

Si tout fonctionne correctement, vous devriez voir :
- Le dashboard se charge sans erreur
- Un plan "Researcher" par défaut
- La possibilité de créer des clés API
- Les données sont sauvegardées en base

## 🆘 Dépannage

### Erreur "Missing Supabase environment variables"
- Vérifiez que `.env.local` existe et contient les bonnes valeurs
- Redémarrez le serveur de développement

### Erreur "Failed to fetch API keys"
- Vérifiez que le schéma SQL a été exécuté
- Vérifiez que vos clés API sont correctes

### Erreur CORS
- Vérifiez que votre URL de projet est correcte
- Assurez-vous d'utiliser HTTPS

## 📚 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Guide complet](README-SUPABASE.md)
- [Architecture](ARCHITECTURE.md)
