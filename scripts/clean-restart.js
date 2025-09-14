#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Nettoyage et redémarrage de l\'application\n');

try {
  // Vérifier si .env.local existe
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    console.log('❌ Fichier .env.local manquant!');
    console.log('   Exécutez d\'abord: npm run setup-env');
    process.exit(1);
  }

  console.log('✅ Fichier .env.local trouvé');

  // Nettoyer le cache Next.js
  console.log('🧹 Nettoyage du cache Next.js...');
  try {
    execSync('rm -rf .next', { stdio: 'inherit' });
  } catch (error) {
    // Sur Windows, utiliser rmdir
    try {
      execSync('rmdir /s /q .next', { stdio: 'inherit' });
    } catch (windowsError) {
      console.log('⚠️  Impossible de nettoyer le cache automatiquement');
      console.log('   Supprimez manuellement le dossier .next');
    }
  }

  // Nettoyer node_modules/.cache si il existe
  const cachePath = path.join(process.cwd(), 'node_modules', '.cache');
  if (fs.existsSync(cachePath)) {
    console.log('🧹 Nettoyage du cache des modules...');
    try {
      execSync('rm -rf node_modules/.cache', { stdio: 'inherit' });
    } catch (error) {
      try {
        execSync('rmdir /s /q node_modules\\.cache', { stdio: 'inherit' });
      } catch (windowsError) {
        console.log('⚠️  Impossible de nettoyer le cache des modules');
      }
    }
  }

  console.log('✅ Cache nettoyé');
  console.log('\n🚀 Redémarrage du serveur de développement...');
  console.log('   (Appuyez sur Ctrl+C pour arrêter le serveur)');
  console.log('');

  // Redémarrer le serveur
  execSync('npm run dev', { stdio: 'inherit' });

} catch (error) {
  console.error('❌ Erreur lors du nettoyage:', error.message);
  process.exit(1);
}
