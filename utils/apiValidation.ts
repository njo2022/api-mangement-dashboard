/**
 * Valide une clé API en vérifiant son existence dans la base de données
 * @param apiKey - La clé API à valider
 * @returns Promise<boolean> - true si la clé est valide, false sinon
 */
export async function validateApiKey(apiKey: string): Promise<boolean> {
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

    console.log('🔍 Validation de la clé API:', apiKey.substring(0, 10) + '...');

    // Appeler la route API côté serveur pour valider la clé
    const response = await fetch('/api/validate-api-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey }),
    });

    const result = await response.json();

    if (result.isValid) {
      console.log('✅ Clé API valide trouvée:', result.keyInfo?.id);
      return true;
    } else {
      console.log('❌ Clé API invalide:', result.error);
      return false;
    }

  } catch (error) {
    console.error('❌ Erreur lors de la validation de la clé API:', {
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      stack: error instanceof Error ? error.stack : undefined
    });
    return false;
  }
}

/**
 * Valide une clé API et retourne des informations détaillées
 * @param apiKey - La clé API à valider
 * @returns Promise<{isValid: boolean, keyInfo?: any, error?: string}>
 */
export async function validateApiKeyDetailed(apiKey: string): Promise<{
  isValid: boolean;
  keyInfo?: {
    id: string;
    name: string;
    type: string;
    usage_count: number;
    user_id: string;
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

    // Appeler la route API côté serveur pour valider la clé
    const response = await fetch('/api/validate-api-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ apiKey }),
    });

    const result = await response.json();

    if (result.isValid) {
      return {
        isValid: true,
        keyInfo: result.keyInfo
      };
    } else {
      return {
        isValid: false,
        error: result.error
      };
    }

  } catch (error) {
    console.error('Erreur lors de la validation de la clé API:', {
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      stack: error instanceof Error ? error.stack : undefined
    });
    return {
      isValid: false,
      error: 'Erreur inattendue lors de la validation'
    };
  }
}
