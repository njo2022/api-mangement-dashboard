import { memo } from 'react';
import { ApiKey } from '@/types/dashboard';

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  loading: boolean;
  error: string | null;
  showKey: Record<string, boolean>;
  onToggleShowKey: (id: string) => void;
  onCopyKey: (key: string) => void;
  onEditKey: (key: ApiKey) => void;
  onDeleteKey: (key: ApiKey) => void;
  onCreateKey: () => void;
}

const ApiKeyRow = memo(({ 
  apiKey, 
  showKey, 
  onToggleShowKey, 
  onCopyKey, 
  onEditKey, 
  onDeleteKey 
}: {
  apiKey: ApiKey;
  showKey: boolean;
  onToggleShowKey: () => void;
  onCopyKey: () => void;
  onEditKey: () => void;
  onDeleteKey: () => void;
}) => {
  const maskKey = (key: string) => {
    return key.substring(0, 8) + "*".repeat(24);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {apiKey.name}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          {apiKey.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-900">{apiKey.usage_count || 0}</span>
          {apiKey.usage_percent > 0 && (
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${apiKey.usage_percent}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono text-gray-800">
          {showKey ? apiKey.key_value : maskKey(apiKey.key_value)}
        </code>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleShowKey}
            className="text-gray-400 hover:text-gray-600"
            title="Voir/Masquer la clé"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            onClick={onCopyKey}
            className="text-gray-400 hover:text-gray-600"
            title="Copier la clé"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button
            onClick={onEditKey}
            className="text-gray-400 hover:text-gray-600"
            title="Modifier"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={onDeleteKey}
            className="text-gray-400 hover:text-red-600"
            title="Supprimer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
});

ApiKeyRow.displayName = 'ApiKeyRow';

export const ApiKeysTable = memo(({
  apiKeys,
  loading,
  error,
  showKey,
  onToggleShowKey,
  onCopyKey,
  onEditKey,
  onDeleteKey,
  onCreateKey
}: ApiKeysTableProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">API Keys</h2>
          <button
            onClick={onCreateKey}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>+</span>
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          The key is used to authenticate your requests to the{" "}
          <a href="#" className="text-blue-600 hover:underline">Research API</a>
          . To learn more, see the{" "}
          <a href="#" className="text-blue-600 hover:underline">documentation page</a>.
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NAME
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TYPE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                USAGE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                KEY
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                OPTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Chargement des clés API...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-red-500">
                  Erreur lors du chargement: {error}
                </td>
              </tr>
            ) : apiKeys.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  Aucune clé API trouvée. Créez votre première clé !
                </td>
              </tr>
            ) : (
              apiKeys.map((apiKey) => (
                <ApiKeyRow
                  key={apiKey.id}
                  apiKey={apiKey}
                  showKey={showKey[apiKey.id]}
                  onToggleShowKey={() => onToggleShowKey(apiKey.id)}
                  onCopyKey={() => onCopyKey(apiKey.key_value)}
                  onEditKey={() => onEditKey(apiKey)}
                  onDeleteKey={() => onDeleteKey(apiKey)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

ApiKeysTable.displayName = 'ApiKeysTable';
