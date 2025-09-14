"use client";

import { Layout } from "@/components/Layout";

export default function Settings() {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Configurez vos préférences</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Paramètres</h2>
          <p className="text-gray-600">Cette page contiendra les paramètres de votre compte.</p>
        </div>
      </div>
    </Layout>
  );
}
