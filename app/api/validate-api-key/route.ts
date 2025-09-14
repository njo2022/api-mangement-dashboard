import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Utiliser la clé de service pour contourner RLS
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes pour la validation API');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
  try {
    const { apiKey } = await request.json();

    // Vérifier le format de base de la clé API
    if (!apiKey || typeof apiKey !== 'string') {
      return NextResponse.json({
        isValid: false,
        error: 'Format de clé API invalide'
      }, { status: 400 });
    }

    // Vérifier que la clé commence par le préfixe attendu
    if (!apiKey.startsWith('dominium-')) {
      return NextResponse.json({
        isValid: false,
        error: 'La clé API doit commencer par "dominium-"'
      }, { status: 400 });
    }

    // Vérifier la longueur minimale
    if (apiKey.length < 20) {
      return NextResponse.json({
        isValid: false,
        error: 'La clé API est trop courte'
      }, { status: 400 });
    }

    console.log('🔍 Validation de la clé API côté serveur:', apiKey.substring(0, 10) + '...');

    // Vérifier l'existence de la clé dans la base de données avec la clé de service
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, user_id, name, type, usage_count')
      .eq('key_value', apiKey)
      .single();

    if (error) {
      console.log('❌ Erreur Supabase côté serveur:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      
      // Si c'est une erreur "aucune ligne trouvée", c'est normal
      if (error.code === 'PGRST116') {
        console.log('ℹ️ Clé API introuvable dans la base de données');
        return NextResponse.json({
          isValid: false,
          error: 'Clé API introuvable'
        }, { status: 404 });
      }
      
      return NextResponse.json({
        isValid: false,
        error: 'Erreur lors de la validation'
      }, { status: 500 });
    }

    // Si on trouve une clé, elle est valide
    if (data) {
      console.log('✅ Clé API valide trouvée côté serveur:', data.id);
      return NextResponse.json({
        isValid: true,
        keyInfo: {
          id: data.id,
          name: data.name,
          type: data.type,
          usage_count: data.usage_count,
          user_id: data.user_id
        }
      });
    }

    console.log('❌ Aucune clé API trouvée');
    return NextResponse.json({
      isValid: false,
      error: 'Clé API introuvable'
    }, { status: 404 });

  } catch (error) {
    console.error('❌ Erreur lors de la validation de la clé API côté serveur:', {
      message: error instanceof Error ? error.message : 'Erreur inconnue',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json({
      isValid: false,
      error: 'Erreur inattendue lors de la validation'
    }, { status: 500 });
  }
}

