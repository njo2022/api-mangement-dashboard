#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Configuration des variables d\'environnement Supabase\n');

const envPath = path.join(process.cwd(), '.env.local');
const templatePath = path.join(process.cwd(), 'env-template.txt');

// Vérifier si .env.local existe déjà
if (fs.existsSync(envPath)) {
  console.log('⚠️  Le fichier .env.local existe déjà.');
  console.log('   Si vous voulez le recréer, supprimez-le d\'abord.\n');
  process.exit(0);
}

// Lire le template
if (!fs.existsSync(templatePath)) {
  console.error('❌ Le fichier env-template.txt n\'existe pas.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

// Créer le fichier .env.local
fs.writeFileSync(envPath, template);

console.log('✅ Fichier .env.local créé avec succès!');
console.log('\n📝 Prochaines étapes:');
console.log('1. Ouvrez le fichier .env.local');
console.log('2. Remplacez les valeurs par vos vraies clés Supabase:');
console.log('   - NEXT_PUBLIC_SUPABASE_URL: URL de votre projet Supabase');
console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY: Clé anonyme de votre projet');
console.log('   - SUPABASE_SERVICE_ROLE_KEY: Clé de service de votre projet');
console.log('\n🔗 Pour obtenir ces clés:');
console.log('1. Allez sur https://supabase.com');
console.log('2. Créez un nouveau projet ou sélectionnez un projet existant');
console.log('3. Allez dans Settings > API');
console.log('4. Copiez l\'URL du projet et les clés');
console.log('\n📊 N\'oubliez pas d\'exécuter le schéma SQL dans Supabase:');
console.log('   Voir database/schema.sql pour les tables nécessaires');
console.log('\n🎉 Une fois configuré, redémarrez votre serveur de développement!');
