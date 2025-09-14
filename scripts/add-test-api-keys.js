#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes!');
  console.error('   Assurez-vous que .env.local contient NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addTestApiKeys() {
  console.log('🔑 Ajout de clés API de test dans la base de données...\n');

  const testUserId = '550e8400-e29b-41d4-a716-446655440000'; // User ID de démo

  const testApiKeys = [
    {
      name: 'Clé de test - Développement',
      type: 'dev',
      key_value: 'dominium-test-dev-12345678901234567890',
      user_id: testUserId,
      usage_count: 0
    },
    {
      name: 'Clé de test - Production',
      type: 'prod',
      key_value: 'dominium-test-prod-12345678901234567890',
      user_id: testUserId,
      usage_count: 0
    }
  ];

  try {
    for (const apiKey of testApiKeys) {
      console.log(`📝 Ajout de la clé: ${apiKey.name}`);
      
      const { data, error } = await supabase
        .from('api_keys')
        .insert([apiKey])
        .select();

      if (error) {
        if (error.code === '23505') {
          console.log(`   ⚠️  Clé déjà existante: ${apiKey.key_value}`);
        } else {
          console.error(`   ❌ Erreur:`, error.message);
        }
      } else {
        console.log(`   ✅ Clé ajoutée avec succès: ${data[0].id}`);
      }
    }

    console.log('\n🎉 Clés API de test ajoutées!');
    console.log('\n📋 Clés disponibles pour les tests:');
    console.log('   • dominium-test-dev-12345678901234567890 (dev)');
    console.log('   • dominium-test-prod-12345678901234567890 (prod)');
    console.log('\n🧪 Vous pouvez maintenant tester ces clés dans l\'API Playground!');

  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des clés:', error.message);
    process.exit(1);
  }
}

addTestApiKeys();
