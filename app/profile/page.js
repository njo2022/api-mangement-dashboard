"use client";

import { Layout } from "@/components/Layout";

export default function Profile() {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-2">Gérez votre profil utilisateur</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Profil utilisateur</h2>
          <p className="text-gray-600">Cette page contiendra les informations de votre profil.</p>
        </div>
      </div>
    </Layout>
  );
}
