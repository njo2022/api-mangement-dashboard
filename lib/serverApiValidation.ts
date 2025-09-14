import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables for server API validation');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Valide une clé API côté serveur en vérifiant son existence dans la base de données
 * @param apiKey - La clé API à valider
 * @returns Promise<boolean> - true si la clé est valide, false sinon
 */
export async function validateApiKeyServer(apiKey: string): Promise<boolean> {
  try {
    // Vérifier le format de base de la clé API
    if (!apiKey || typeof apiKey !== 'string') {
      console.log('❌ Clé API invalide: format incorrect');
      return false;
    }

    // Vérifier que la clé commence par le préfixe attendu
    if (!apiKey.startsWith('dominium-')) {
      console.log('❌ Clé API invalide: ne commence pas par "dominium-"');
      return false;
    }

    // Vérifier la longueur minimale
    if (apiKey.length < 20) {
      console.log('❌ Clé API invalide: trop courte');
      return false;
    }

    console.log('🔍 Validation côté serveur de la clé API:', apiKey.substring(0, 10) + '...');

    // Vérifier dans la base de données Supabase
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, name, type, usage_count, user_id, is_active')
      .eq('key_value', apiKey)
      .eq('is_active', true)
      .single();

    if (error) {
      console.log('❌ Erreur lors de la recherche de la clé API:', error.message);
      return false;
    }

    if (!data) {
      console.log('❌ Clé API non trouvée dans la base de données');
      return false;
    }

    console.log('✅ Clé API valide trouvée:', data.id);
    return true;

  } catch (error) {
    console.error('❌ Erreur lors de la validation côté serveur de la clé API:', {
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      stack: error instanceof Error ? error.stack : undefined
    });
    return false;
  }
}

/**
 * Valide une clé API côté serveur et retourne des informations détaillées
 * @param apiKey - La clé API à valider
 * @returns Promise<{isValid: boolean, keyInfo?: any, error?: string}>
 */
export async function validateApiKeyServerDetailed(apiKey: string): Promise<{
  isValid: boolean;
  keyInfo?: {
    id: string;
    name: string;
    type: string;
    usage_count: number;
    user_id: string;
    is_active: boolean;
  };
  error?: string;
}> {
  try {
    // Vérifier le format de base de la clé API
    if (!apiKey || typeof apiKey !== 'string') {
      return {
        isValid: false,
        error: 'Format de clé API invalide'
      };
    }

    // Vérifier que la clé commence par le préfixe attendu
    if (!apiKey.startsWith('dominium-')) {
      return {
        isValid: false,
        error: 'La clé API doit commencer par "dominium-"'
      };
    }

    // Vérifier la longueur minimale
    if (apiKey.length < 20) {
      return {
        isValid: false,
        error: 'La clé API est trop courte'
      };
    }

    // Vérifier dans la base de données Supabase
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, name, type, usage_count, user_id, is_active')
      .eq('key_value', apiKey)
      .eq('is_active', true)
      .single();

    if (error) {
      return {
        isValid: false,
        error: `Erreur lors de la recherche: ${error.message}`
      };
    }

    if (!data) {
      return {
        isValid: false,
        error: 'Clé API non trouvée ou inactive'
      };
    }

    return {
      isValid: true,
      keyInfo: data
    };

  } catch (error) {
    console.error('Erreur lors de la validation côté serveur de la clé API:', {
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      stack: error instanceof Error ? error.stack : undefined
    });
    return {
      isValid: false,
      error: 'Erreur inattendue lors de la validation'
    };
  }
}
