import { memo } from 'react';
import { ApiKeyFormData } from '@/types/dashboard';

interface ApiKeyModalProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: ApiKeyFormData;
  isSubmitting: boolean;
  errors: Partial<ApiKeyFormData>;
  onClose: () => void;
  onSubmit: () => void;
  onFieldChange: (field: keyof ApiKeyFormData, value: string) => void;
}

export const ApiKeyModal = memo(({
  isOpen,
  isEditing,
  formData,
  isSubmitting,
  errors,
  onClose,
  onSubmit,
  onFieldChange
}: ApiKeyModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {isEditing ? "Modifier la clé API" : "Nouvelle clé API"}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de la clé
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => onFieldChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ex: default"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => onFieldChange('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="dev">dev</option>
                <option value="prod">prod</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={onSubmit}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-md transition-colors"
            >
              {isSubmitting ? "En cours..." : (isEditing ? "Mettre à jour" : "Créer")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

ApiKeyModal.displayName = 'ApiKeyModal';
