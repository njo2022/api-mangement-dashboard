import Link from 'next/link';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dominium
            </span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation API</h1>
          <p className="text-xl text-gray-600">
            Guide complet pour intégrer et utiliser l&apos;API Dominium
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="sticky top-8 space-y-2">
              <h3 className="font-semibold text-gray-900 mb-4">Table des matières</h3>
              <a href="#introduction" className="block py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Introduction
              </a>
              <a href="#authentication" className="block py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Authentification
              </a>
              <a href="#endpoints" className="block py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Endpoints
              </a>
              <a href="#examples" className="block py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Exemples
              </a>
              <a href="#error-codes" className="block py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Codes d&apos;erreur
              </a>
              <a href="#rate-limits" className="block py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                Limites de taux
              </a>
              <a href="#sdk" className="block py-2 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                SDK & Bibliothèques
              </a>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              
              {/* Introduction */}
              <section id="introduction" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Introduction</h2>
                <p className="text-gray-600 mb-6">
                  L&apos;API Dominium vous permet de gérer vos clés API, valider leur utilisation, 
                  et suivre les statistiques d&apos;usage de manière sécurisée et efficace.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">🚀 Démarrage rapide</h3>
                  <ol className="list-decimal list-inside space-y-2 text-blue-800">
                    <li>Créez un compte sur Dominium</li>
                    <li>Générez votre première clé API</li>
                    <li>Testez votre clé avec notre playground</li>
                    <li>Intégrez l&apos;API dans votre application</li>
                  </ol>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">URL de base</h3>
                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                  <code className="text-gray-800 font-mono">
                    https://votre-domaine.com/api
                  </code>
                </div>
              </section>

              {/* Authentication */}
              <section id="authentication" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Authentification</h2>
                <p className="text-gray-600 mb-6">
                  Toutes les requêtes à l&apos;API Dominium nécessitent une authentification via une clé API.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">Format de la clé API</h3>
                <div className="bg-gray-100 rounded-lg p-4 mb-6">
                  <code className="text-gray-800 font-mono">
                    dominium-xxxxxxxxxxxxxxxxxxxxxx
                  </code>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">Utilisation</h3>
                <p className="text-gray-600 mb-4">
                  Incluez votre clé API dans l&apos;en-tête Authorization de toutes vos requêtes :
                </p>
                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`Authorization: Bearer dominium-xxxxxxxxxxxxxxxxxxxxxx`}
                  </pre>
                </div>
              </section>

              {/* Endpoints */}
              <section id="endpoints" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Endpoints</h2>

                {/* Test Endpoint */}
                <div className="border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      POST
                    </span>
                    <code className="text-gray-800 font-mono">/api/test</code>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Teste la validité de votre clé API et simule un appel API.
                  </p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Paramètres</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <pre className="text-gray-800 font-mono text-sm">
{`{
  "query": "Test de l'API",
  "type": "test"
}`}
                    </pre>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-2">Réponse</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-gray-800 font-mono text-sm">
{`{
  "success": true,
  "message": "API call successful",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "request": {
    "method": "POST",
    "endpoint": "/api/test",
    "body": {...}
  },
  "apiKey": {
    "prefix": "dominium-6...",
    "length": 32
  },
  "data": {
    "query": "Test de l'API",
    "type": "test",
    "processed": true
  }
}`}
                    </pre>
                  </div>
                </div>

                {/* Validate Endpoint */}
                <div className="border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      POST
                    </span>
                    <code className="text-gray-800 font-mono">/api/validate-api-key</code>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Valide une clé API et retourne des informations détaillées.
                  </p>
                  
                  <h4 className="font-semibold text-gray-900 mb-2">Paramètres</h4>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <pre className="text-gray-800 font-mono text-sm">
{`{
  "apiKey": "dominium-xxxxxxxxxxxxxxxxxxxxxx"
}`}
                    </pre>
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-2">Réponse</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <pre className="text-gray-800 font-mono text-sm">
{`{
  "isValid": true,
  "keyInfo": {
    "id": "uuid",
    "name": "Ma clé API",
    "type": "production",
    "usage_count": 42,
    "user_id": "user-uuid",
    "is_active": true
  }
}`}
                    </pre>
                  </div>
                </div>
              </section>

              {/* Examples */}
              <section id="examples" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Exemples</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">JavaScript/Node.js</h3>
                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`const apiKey = 'dominium-xxxxxxxxxxxxxxxxxxxxxx';

// Test de l'API
const response = await fetch('/api/test', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${apiKey}\`
  },
  body: JSON.stringify({
    query: "Test de l'API",
    type: "test"
  })
});

const data = await response.json();
console.log(data);`}
                  </pre>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">Python</h3>
                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`import requests

api_key = 'dominium-xxxxxxxxxxxxxxxxxxxxxx'

# Test de l'API
response = requests.post(
    '/api/test',
    headers={
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}'
    },
    json={
        'query': "Test de l'API",
        'type': 'test'
    }
)

data = response.json()
print(data)`}
                  </pre>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-4">cURL</h3>
                <div className="bg-gray-900 rounded-lg p-4 mb-6">
                  <pre className="text-green-400 font-mono text-sm">
{`curl -X POST /api/test \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer dominium-xxxxxxxxxxxxxxxxxxxxxx" \\
  -d '{
    "query": "Test de l'\''API",
    "type": "test"
  }'`}
                  </pre>
                </div>
              </section>

              {/* Error Codes */}
              <section id="error-codes" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Codes d&apos;erreur</h2>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Code
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Solution
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          400
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Requête malformée
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Vérifiez le format de votre requête
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          401
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Clé API manquante ou invalide
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Vérifiez votre clé API et l&apos;en-tête Authorization
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          403
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Accès refusé
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Vérifiez les permissions de votre clé API
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          429
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Limite de taux dépassée
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Attendez avant de faire une nouvelle requête
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          500
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Erreur interne du serveur
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          Contactez le support technique
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Rate Limits */}
              <section id="rate-limits" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Limites de taux</h2>
                <p className="text-gray-600 mb-6">
                  Pour assurer la stabilité du service, nous appliquons des limites de taux sur nos endpoints.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Plan Gratuit</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li>• 100 requêtes/heure</li>
                      <li>• 1000 requêtes/jour</li>
                      <li>• 1 clé API</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Plan Pro</h3>
                    <ul className="space-y-2 text-green-800">
                      <li>• 1000 requêtes/heure</li>
                      <li>• 10000 requêtes/jour</li>
                      <li>• 10 clés API</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* SDK */}
              <section id="sdk" className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">SDK & Bibliothèques</h2>
                <p className="text-gray-600 mb-6">
                  Utilisez nos SDK officiels pour intégrer facilement l&apos;API Dominium dans votre application.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">JavaScript/Node.js</h3>
                    <p className="text-gray-600 mb-4">SDK officiel pour JavaScript et Node.js</p>
                    <div className="bg-gray-100 rounded-lg p-3 mb-4">
                      <code className="text-gray-800 font-mono text-sm">
                        npm install @dominium/sdk
                      </code>
                    </div>
                    <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Documentation →
                    </Link>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Python</h3>
                    <p className="text-gray-600 mb-4">SDK officiel pour Python</p>
                    <div className="bg-gray-100 rounded-lg p-3 mb-4">
                      <code className="text-gray-800 font-mono text-sm">
                        pip install dominium-sdk
                      </code>
                    </div>
                    <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Documentation →
                    </Link>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">PHP</h3>
                    <p className="text-gray-600 mb-4">SDK officiel pour PHP</p>
                    <div className="bg-gray-100 rounded-lg p-3 mb-4">
                      <code className="text-gray-800 font-mono text-sm">
                        composer require dominium/sdk
                      </code>
                    </div>
                    <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Documentation →
                    </Link>
                  </div>
                </div>
              </section>

              {/* Support */}
              <section className="mb-12">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
                  <h2 className="text-2xl font-bold mb-4">Besoin d&apos;aide ?</h2>
                  <p className="mb-6">
                    Notre équipe de support est là pour vous aider à intégrer l&apos;API Dominium.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/api-playground" 
                      className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Tester l&apos;API
                    </Link>
                    <Link 
                      href="/tableau-de-bord" 
                      className="inline-flex items-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Dashboard
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
