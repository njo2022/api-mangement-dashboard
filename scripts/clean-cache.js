#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🧹 Nettoyage du cache Next.js...');

// Supprimer le dossier .next
const nextDir = path.join(__dirname, '..', '.next');
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('✅ Dossier .next supprimé');
} else {
  console.log('ℹ️  Dossier .next introuvable');
}

// Supprimer le dossier node_modules/.cache
const cacheDir = path.join(__dirname, '..', 'node_modules', '.cache');
if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log('✅ Cache node_modules supprimé');
} else {
  console.log('ℹ️  Cache node_modules introuvable');
}

console.log('🎉 Nettoyage terminé !');
console.log('💡 Vous pouvez maintenant relancer: npm run dev');
