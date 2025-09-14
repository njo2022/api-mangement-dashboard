import { NextRequest, NextResponse } from 'next/server';
import { validateApiKey } from '@/utils/apiValidation';

export async function POST(request: NextRequest) {
  try {
    // Récupérer la clé API depuis les headers
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Clé API manquante ou invalide' },
        { status: 401 }
      );
    }

    const apiKey = authHeader.substring(7); // Enlever "Bearer "

    // Valider la clé API
    const isValid = await validateApiKey(apiKey);
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Clé API invalide' },
        { status: 401 }
      );
    }

    // Récupérer le body de la requête
    const body = await request.json();

    // Simuler une réponse de l'API
    const response = {
      success: true,
      message: 'API call successful',
      timestamp: new Date().toISOString(),
      request: {
        method: 'POST',
        endpoint: '/api/test',
        body: body
      },
      apiKey: {
        prefix: apiKey.substring(0, 10) + '...',
        length: apiKey.length
      },
      data: {
        query: body.query || 'No query provided',
        type: body.type || 'test',
        processed: true
      }
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erreur dans l\'endpoint API test:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur interne du serveur',
        message: error instanceof Error ? error.message : 'Erreur inconnue'
      },
      { status: 500 }
    );
  }
}
