"use client";

import { Layout } from "@/components/Layout";
import { ApiValidationForm } from "@/components/api-playground/ApiValidationForm";
import { Toast } from "@/components/Toast";
import { useApiPlayground } from "@/hooks/useApiPlayground";

export default function ApiPlayground() {
  const { toast, hideToast, validateApiKeyAndShowResult } = useApiPlayground();

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API Playground</h1>
          <p className="text-gray-600 mt-2">
            Testez et validez vos clés API pour vous assurer qu&apos;elles fonctionnent correctement
          </p>
        </div>

        {/* API Validation Form */}
        <div className="max-w-2xl">
          <ApiValidationForm 
            onValidationResult={validateApiKeyAndShowResult}
          />
        </div>

        {/* Toast Notification */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </div>
    </Layout>
  );
}
