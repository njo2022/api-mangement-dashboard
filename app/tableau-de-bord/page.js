"use client";

import { useState, useCallback } from "react";
import { useApiKeys } from "@/hooks/useApiKeys";
import { useSubscription } from "@/hooks/useSubscription";
import { useApiKeyForm } from "@/hooks/useApiKeyForm";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { useApiKeyActions } from "@/hooks/useApiKeyActions";
import { PlanCard } from "@/components/dashboard/PlanCard";
import { ApiKeysTable } from "@/components/dashboard/ApiKeysTable";
import { ApiKeyModal } from "@/components/dashboard/ApiKeyModal";
import { Toast } from "@/components/Toast";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Layout } from "@/components/Layout";
import { ApiKey } from "@/types/dashboard";

export default function TableauDeBord() {
  // Pour la démo, nous utilisons un userId fixe (UUID valide)
  // Dans une vraie application, cela viendrait de l'authentification
  const userId = "550e8400-e29b-41d4-a716-446655440000";
  
  const { 
    apiKeys, 
    loading: apiKeysLoading, 
    error: apiKeysError,
    createApiKey,
    updateApiKey,
    deleteApiKey
  } = useApiKeys(userId);
  
  const { 
    subscription, 
    loading: subscriptionLoading,
    error: subscriptionError,
    updateSubscription
  } = useSubscription(userId);

  // Custom hooks for state management
  const { toast, showSuccess, showError, showInfo, hideToast } = useToast();
  const { modal: confirmModal, showConfirm, hideConfirm, handleConfirm } = useConfirmModal();
  const { isOpen: showModal, openModal, closeModal } = useModal({
    onClose: () => setEditingKey(null)
  });

  const [editingKey, setEditingKey] = useState(null);

  // API Key actions hook
  const {
    showKey,
    toggleShowKey,
    copyToClipboard,
    handleCreateApiKey,
    handleUpdateApiKey,
    handleDeleteApiKey
  } = useApiKeyActions({
    createApiKey,
    updateApiKey,
    deleteApiKey,
    showSuccess,
    showError
  });

  // Form management
  const {
    formData,
    isSubmitting,
    errors,
    updateField,
    handleSubmit,
    resetForm,
    setFormDataFromApiKey
  } = useApiKeyForm({
    onSubmit: editingKey 
      ? (data) => handleUpdateApiKey(editingKey.id, data.name, data.type)
      : (data) => handleCreateApiKey(data.name, data.type),
    initialData: editingKey ? { name: editingKey.name, type: editingKey.type } : undefined
  });

  // Event handlers
  const handleCreateKey = useCallback(() => {
    setEditingKey(null);
    resetForm();
    openModal();
  }, [resetForm, openModal]);

  const handleEditKey = useCallback((key) => {
    showConfirm(
      "Modifier la clé API",
      `Êtes-vous sûr de vouloir modifier la clé API "${key.name}" ?`,
      () => {
        setEditingKey(key);
        setFormDataFromApiKey(key);
        openModal();
      },
      "info"
    );
  }, [showConfirm, setFormDataFromApiKey, openModal]);

  const handleDeleteKey = useCallback((key) => {
    showConfirm(
      "Supprimer la clé API",
      `Êtes-vous sûr de vouloir supprimer définitivement la clé API "${key.name}" ? Cette action est irréversible.`,
      () => handleDeleteApiKey(key.id),
      "danger"
    );
  }, [showConfirm, handleDeleteApiKey]);

  const handleModalSubmit = useCallback(async () => {
    try {
      await handleSubmit();
      closeModal();
    } catch (error) {
      // Error handling is done in the hooks
    }
  }, [handleSubmit, closeModal]);

  const handleTogglePayAsYouGo = useCallback(async () => {
    if (!subscription) return;
    
    try {
      await updateSubscription(subscription.plan_id, !subscription.is_pay_as_you_go);
      showSuccess('Plan updated successfully');
    } catch (error) {
      console.error('Error updating subscription:', error);
      showError('Erreur lors de la mise à jour du plan');
    }
  }, [subscription, updateSubscription, showSuccess, showError]);

  const handleManagePlan = useCallback(() => {
    // TODO: Implement plan management navigation
    showInfo('Plan management feature coming soon');
  }, [showInfo]);

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Gérez vos clés API et votre abonnement</p>
        </div>

        {/* Current Plan Section */}
        <div className="mb-8">
          <PlanCard
            subscription={subscription}
            loading={subscriptionLoading}
            onTogglePayAsYouGo={handleTogglePayAsYouGo}
            onManagePlan={handleManagePlan}
          />
        </div>

        {/* API Keys Section */}
        <ApiKeysTable
          apiKeys={apiKeys}
          loading={apiKeysLoading}
          error={apiKeysError}
          showKey={showKey}
          onToggleShowKey={toggleShowKey}
          onCopyKey={copyToClipboard}
          onEditKey={handleEditKey}
          onDeleteKey={handleDeleteKey}
          onCreateKey={handleCreateKey}
        />

        {/* API Key Modal */}
        <ApiKeyModal
          isOpen={showModal}
          isEditing={!!editingKey}
          formData={formData}
          isSubmitting={isSubmitting}
          errors={errors}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
          onFieldChange={updateField}
        />

        {/* Toast Notification */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />

        {/* Confirm Modal */}
        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onClose={hideConfirm}
          onConfirm={handleConfirm}
          title={confirmModal.title}
          message={confirmModal.message}
          type={confirmModal.type}
          confirmText="Confirmer"
          cancelText="Annuler"
        />
      </div>
    </Layout>
  );
}