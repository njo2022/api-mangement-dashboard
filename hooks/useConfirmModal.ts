import { useState, useCallback } from 'react';
import { ConfirmModalState } from '@/types/dashboard';

export function useConfirmModal() {
  const [modal, setModal] = useState<ConfirmModalState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null,
    type: 'warning'
  });

  const showConfirm = useCallback((
    title: string,
    message: string,
    onConfirm: () => void,
    type: ConfirmModalState['type'] = 'warning'
  ) => {
    setModal({
      isOpen: true,
      title,
      message,
      onConfirm,
      type
    });
  }, []);

  const hideConfirm = useCallback(() => {
    setModal(prev => ({ ...prev, isOpen: false }));
  }, []);

  const handleConfirm = useCallback(() => {
    if (modal.onConfirm) {
      modal.onConfirm();
    }
    hideConfirm();
  }, [modal.onConfirm, hideConfirm]);

  return {
    modal,
    showConfirm,
    hideConfirm,
    handleConfirm
  };
}
