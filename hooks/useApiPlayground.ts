import { useState, useCallback } from 'react';
import { validateApiKey } from '@/utils/apiValidation';

interface ToastState {
  isVisible: boolean;
  message: string;
  type: 'success' | 'error';
}

export function useApiPlayground() {
  const [toast, setToast] = useState<ToastState>({
    isVisible: false,
    message: '',
    type: 'success'
  });

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({
      isVisible: true,
      message,
      type
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  const validateApiKeyAndShowResult = useCallback(async (apiKey: string) => {
    try {
      const isValid = await validateApiKey(apiKey);
      
      if (isValid) {
        showToast("Clé API valide", "success");
      } else {
        showToast("Clé API invalide", "error");
      }
      
      return isValid;
    } catch (error) {
      console.error('Erreur lors de la validation:', error);
      showToast("Erreur lors de la validation de la clé API", "error");
      return false;
    }
  }, [showToast]);

  return {
    toast,
    showToast,
    hideToast,
    validateApiKeyAndShowResult
  };
}
