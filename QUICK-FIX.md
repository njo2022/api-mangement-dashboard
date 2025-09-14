# 🚨 Solution Rapide - Erreur "supabaseKey is required"

## Le problème
L'erreur `supabaseKey is required` indique que les variables d'environnement Supabase ne sont pas configurées.

## ✅ Solution en 3 étapes

### 1. Créer le fichier de configuration
```bash
npm run setup-env
```

### 2. Configurer vos clés Supabase
Ouvrez le fichier `.env.local` créé et remplacez les valeurs par vos vraies clés :

```env
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anonyme
SUPABASE_SERVICE_ROLE_KEY=votre-cle-service
```

### 3. Redémarrer le serveur
```bash
npm run dev
```

## 🔑 Où trouver vos clés Supabase ?

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un projet ou sélectionnez un projet existant
3. Allez dans **Settings > API**
4. Copiez :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

## 📊 Configuration de la base de données

Après avoir configuré les clés, exécutez le schéma SQL dans Supabase :

1. Allez dans **SQL Editor** de votre projet Supabase
2. Exécutez le contenu du fichier `database/schema.sql`
3. Optionnel : Exécutez `database/demo-data.sql` pour des données de test

## 🎉 C'est tout !

Une fois configuré, votre application devrait fonctionner parfaitement !

---

**Besoin d'aide ?** Voir [SETUP-GUIDE.md](SETUP-GUIDE.md) pour plus de détails.
