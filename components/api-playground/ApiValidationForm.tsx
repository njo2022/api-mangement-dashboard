import { useState } from "react";
import { validateApiKey } from "@/utils/apiValidation";
import { ApiExample } from "./ApiExample";

interface ApiValidationFormProps {
  onValidationResult: (apiKey: string) => Promise<boolean>;
}

export function ApiValidationForm({ onValidationResult }: ApiValidationFormProps) {
  const [apiKey, setApiKey] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState("");
  const [validatedKey, setValidatedKey] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError("Veuillez saisir une clé API");
      return;
    }

    setIsValidating(true);
    setError("");

    try {
      const isValid = await onValidationResult(apiKey.trim());
      if (isValid) {
        setValidatedKey(apiKey.trim());
      }
    } catch (error) {
      console.error("Erreur lors de la validation:", error);
      setError("Erreur lors de la validation de la clé API");
    } finally {
      setIsValidating(false);
    }
  };

  const handleClear = () => {
    setApiKey("");
    setError("");
    setValidatedKey(null);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Validation de clé API
        </h2>
        <p className="text-gray-600">
          Saisissez votre clé API pour vérifier sa validité et son statut.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            Clé API
          </label>
          <div className="relative">
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="dominium-xxxxxxxxxxxxxxxxxxxxxxxx"
              disabled={isValidating}
            />
            {apiKey && (
              <button
                type="button"
                onClick={() => setApiKey("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isValidating}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <p>Format attendu: <code className="bg-gray-100 px-2 py-1 rounded">dominium-xxxxxxxxxxxxxxxxxxxxxxxx</code></p>
            <p className="mt-1 text-xs">
              La clé sera vérifiée dans la base de données Supabase
            </p>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isValidating || !apiKey.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            {isValidating ? (
              <>
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Validation en cours...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Valider la clé API</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            disabled={isValidating}
            className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            Effacer
          </button>
        </div>
      </form>

      {/* Information Section */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">
              Comment obtenir une clé API ?
            </h3>
            <p className="text-sm text-blue-700">
              Rendez-vous sur votre <a href="/tableau-de-bord" className="underline hover:no-underline">tableau de bord</a> pour créer et gérer vos clés API.
            </p>
          </div>
        </div>
      </div>

      {/* API Example Section - Only show when key is validated */}
      {validatedKey && (
        <ApiExample apiKey={validatedKey} />
      )}
    </div>
  );
}
