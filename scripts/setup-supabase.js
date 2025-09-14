#!/usr/bin/env node

/**
 * Script de configuration Supabase
 * Ce script aide à configurer Supabase pour le projet
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Configuration Supabase pour le Dashboard API Keys\n');

// Vérifier si .env.local existe
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('❌ Fichier .env.local non trouvé');
  console.log('📝 Créez un fichier .env.local avec les variables suivantes :\n');
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://votre-project-id.supabase.co');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key');
  console.log('SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key\n');
} else {
  console.log('✅ Fichier .env.local trouvé');
  console.log('⚠️  N\'oubliez pas de remplacer les valeurs par vos vraies clés Supabase !\n');
}

// Vérifier si le schéma SQL existe
const schemaPath = path.join(process.cwd(), 'database', 'schema.sql');
const demoDataPath = path.join(process.cwd(), 'database', 'demo-data.sql');

if (fs.existsSync(schemaPath)) {
  console.log('✅ Schéma SQL trouvé dans database/schema.sql');
  console.log('📋 N\'oubliez pas d\'exécuter ce schéma dans l\'éditeur SQL de Supabase');
} else {
  console.log('❌ Schéma SQL non trouvé');
}

if (fs.existsSync(demoDataPath)) {
  console.log('✅ Données de démo trouvées dans database/demo-data.sql');
  console.log('📋 Exécutez aussi ce script pour avoir des données de test\n');
} else {
  console.log('❌ Données de démo non trouvées');
}

console.log('📚 Consultez README-SUPABASE.md pour les instructions détaillées');
console.log('🔗 Supabase Dashboard: https://supabase.com/dashboard');
console.log('\n✨ Configuration terminée !');
