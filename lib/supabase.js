import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Fonction pour créer le client Supabase avec gestion d'erreur
function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Variables d\'environnement Supabase manquantes!')
    console.error('📝 Créez un fichier .env.local avec les variables suivantes:')
    console.error('   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co')
    console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key')
    console.error('   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key')
    console.error('📖 Voir env-template.txt pour plus d\'informations')
    
    // Retourner un client factice pour éviter les erreurs de compilation
    return createClient('https://placeholder.supabase.co', 'placeholder-key')
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = createSupabaseClient()

// Client pour les opérations côté serveur avec service role key
export const supabaseAdmin = (() => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !serviceRoleKey) {
    console.warn('⚠️ Service role key manquante, utilisation du client standard')
    return createSupabaseClient()
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
})()
