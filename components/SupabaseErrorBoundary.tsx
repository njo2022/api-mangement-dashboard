"use client";

import { useSupabaseStatus } from '@/hooks/useSupabaseStatus';

interface SupabaseErrorBoundaryProps {
  children: React.ReactNode;
}

export function SupabaseErrorBoundary({ children }: SupabaseErrorBoundaryProps) {
  const { isConfigured, isLoading, error } = useSupabaseStatus();

  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de la configuration...</p>
        </div>
      </div>
    );
  }

  // Afficher l'erreur si Supabase n'est pas configuré
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Configuration Supabase manquante
            </h1>
            
            <p className="text-gray-600 mb-6">
              {error || 'Les variables d\'environnement Supabase ne sont pas configurées.'}
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">Solution rapide :</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Créez un fichier <code className="bg-gray-200 px-1 rounded">.env.local</code> à la racine du projet</li>
                <li>Ajoutez les variables d'environnement Supabase</li>
                <li>Redémarrez le serveur de développement</li>
              </ol>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  // Copier les instructions dans le presse-papier
                  const instructions = `NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key`;
                  navigator.clipboard.writeText(instructions);
                  alert('Instructions copiées dans le presse-papier !');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                📋 Copier le template
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                🔄 Recharger la page
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-500">
              <p>Voir <code className="bg-gray-200 px-1 rounded">SETUP-GUIDE.md</code> pour plus d'informations</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
