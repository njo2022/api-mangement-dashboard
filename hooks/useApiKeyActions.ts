import { useState, useCallback } from 'react';
import { ApiKey } from '@/types/dashboard';
import { generateApiKey } from '@/utils/apiKeyGenerator';

interface UseApiKeyActionsProps {
  createApiKey: (name: string, type: string, keyValue: string) => Promise<void>;
  updateApiKey: (id: string, name: string, type: string) => Promise<void>;
  deleteApiKey: (id: string) => Promise<void>;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
}

export function useApiKeyActions({
  createApiKey,
  updateApiKey,
  deleteApiKey,
  showSuccess,
  showError
}: UseApiKeyActionsProps) {
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});

  const toggleShowKey = useCallback((id: string) => {
    setShowKey(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccess('Copied API Key to clipboard');
    } catch (err) {
      showError('Failed to copy to clipboard');
    }
  }, [showSuccess, showError]);

  const handleCreateApiKey = useCallback(async (name: string, type: string) => {
    try {
      const keyValue = generateApiKey();
      await createApiKey(name, type, keyValue);
      showSuccess('API Key created successfully');
    } catch (error) {
      console.error('Error creating API key:', error);
      showError('Erreur lors de la création de la clé API');
      throw error;
    }
  }, [createApiKey, showSuccess, showError]);

  const handleUpdateApiKey = useCallback(async (id: string, name: string, type: string) => {
    try {
      await updateApiKey(id, name, type);
      showSuccess('API Key updated successfully');
    } catch (error) {
      console.error('Error updating API key:', error);
      showError('Erreur lors de la mise à jour de la clé API');
      throw error;
    }
  }, [updateApiKey, showSuccess, showError]);

  const handleDeleteApiKey = useCallback(async (id: string) => {
    try {
      await deleteApiKey(id);
      showSuccess('Clé API supprimée avec succès');
    } catch (error) {
      console.error('Error deleting API key:', error);
      showError('Erreur lors de la suppression de la clé API');
      throw error;
    }
  }, [deleteApiKey, showSuccess, showError]);

  return {
    showKey,
    toggleShowKey,
    copyToClipboard,
    handleCreateApiKey,
    handleUpdateApiKey,
    handleDeleteApiKey
  };
}
