import { useState, useEffect } from 'react';

interface SupabaseStatus {
  isConfigured: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useSupabaseStatus(): SupabaseStatus {
  const [status, setStatus] = useState<SupabaseStatus>({
    isConfigured: false,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const checkSupabaseConfig = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!url || !key) {
          setStatus({
            isConfigured: false,
            isLoading: false,
            error: 'Variables d\'environnement Supabase manquantes'
          });
          return;
        }

        // Vérifier si les clés ne sont pas des placeholders
        if (url.includes('placeholder') || key.includes('placeholder')) {
          setStatus({
            isConfigured: false,
            isLoading: false,
            error: 'Configuration Supabase non valide'
          });
          return;
        }

        setStatus({
          isConfigured: true,
          isLoading: false,
          error: null
        });

      } catch (error) {
        setStatus({
          isConfigured: false,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Erreur inconnue'
        });
      }
    };

    checkSupabaseConfig();
  }, []);

  return status;
}
