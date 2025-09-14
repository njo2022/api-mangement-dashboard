import { useState, useCallback } from 'react';
import { ApiKeyFormData, ApiKey } from '@/types/dashboard';

interface UseApiKeyFormProps {
  onSubmit: (data: ApiKeyFormData) => Promise<void>;
  initialData?: Partial<ApiKeyFormData>;
}

export function useApiKeyForm({ onSubmit, initialData }: UseApiKeyFormProps) {
  const [formData, setFormData] = useState<ApiKeyFormData>({
    name: initialData?.name || '',
    type: initialData?.type || 'dev'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ApiKeyFormData>>({});

  const updateField = useCallback((field: keyof ApiKeyFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<ApiKeyFormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la clé est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({ name: '', type: 'dev' });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, validateForm]);

  const resetForm = useCallback(() => {
    setFormData({ name: '', type: 'dev' });
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const setFormDataFromApiKey = useCallback((apiKey: ApiKey) => {
    setFormData({
      name: apiKey.name,
      type: apiKey.type
    });
  }, []);

  return {
    formData,
    isSubmitting,
    errors,
    updateField,
    handleSubmit,
    resetForm,
    setFormDataFromApiKey
  };
}
