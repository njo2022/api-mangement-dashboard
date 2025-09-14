#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔐 Configuration Clerk - Assistant de configuration\n');

const envPath = path.join(__dirname, '..', '.env.local');

// Vérifier si le fichier .env.local existe
if (!fs.existsSync(envPath)) {
  console.log('📝 Création du fichier .env.local...');
  
  const envTemplate = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-clerk-publishable-key
CLERK_SECRET_KEY=sk_test_your-clerk-secret-key`;

  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ Fichier .env.local créé');
} else {
  console.log('✅ Fichier .env.local existe déjà');
}

console.log('\n🔧 Étapes de configuration :\n');

console.log('1. 📋 Créez un compte Clerk :');
console.log('   → Allez sur https://clerk.com');
console.log('   → Créez une nouvelle application');
console.log('   → Choisissez "Next.js" comme framework\n');

console.log('2. 🔑 Récupérez vos clés :');
console.log('   → Dashboard Clerk → API Keys');
console.log('   → Copiez NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY');
console.log('   → Copiez CLERK_SECRET_KEY\n');

console.log('3. 📝 Mettez à jour .env.local :');
console.log('   → Remplacez les valeurs par vos vraies clés\n');

console.log('4. 🎨 Personnalisez l\'interface :');
console.log('   → Dashboard Clerk → Customize → Appearance');
console.log('   → Configurez les couleurs et textes\n');

console.log('5. 🔗 Configurez OAuth (optionnel) :');
console.log('   → Dashboard Clerk → Social Connections');
console.log('   → Activez Google, GitHub, etc.\n');

console.log('6. 🧪 Testez :');
console.log('   → npm run dev');
console.log('   → Allez sur http://localhost:3000');
console.log('   → Cliquez sur "Tableau de bord API"\n');

console.log('📚 Guide complet : CLERK_SETUP_GUIDE.md');
console.log('🆘 Support : https://clerk.com/docs\n');

// Vérifier la configuration actuelle
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  
  console.log('📋 Configuration actuelle :\n');
  
  const hasSupabaseUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL=') && 
                        !envContent.includes('your-project-id');
  const hasSupabaseAnon = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=') && 
                         !envContent.includes('your-anon-key');
  const hasSupabaseService = envContent.includes('SUPABASE_SERVICE_ROLE_KEY=') && 
                            !envContent.includes('your-service-role-key');
  const hasClerkPublishable = envContent.includes('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=') && 
                             !envContent.includes('your-clerk-publishable-key');
  const hasClerkSecret = envContent.includes('CLERK_SECRET_KEY=') && 
                        !envContent.includes('your-clerk-secret-key');
  
  console.log(`🗄️  Supabase URL: ${hasSupabaseUrl ? '✅' : '❌'}`);
  console.log(`🗄️  Supabase Anon Key: ${hasSupabaseAnon ? '✅' : '❌'}`);
  console.log(`🗄️  Supabase Service Key: ${hasSupabaseService ? '✅' : '❌'}`);
  console.log(`🔐 Clerk Publishable Key: ${hasClerkPublishable ? '✅' : '❌'}`);
  console.log(`🔐 Clerk Secret Key: ${hasClerkSecret ? '✅' : '❌'}\n`);
  
  if (hasClerkPublishable && hasClerkSecret) {
    console.log('🎉 Configuration Clerk complète !');
    console.log('🚀 Vous pouvez maintenant démarrer l\'application avec : npm run dev');
  } else {
    console.log('⚠️  Configuration incomplète');
    console.log('📝 Suivez les étapes ci-dessus pour compléter la configuration');
  }
}
