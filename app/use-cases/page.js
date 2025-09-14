"use client";

import { Layout } from "@/components/Layout";

export default function UseCases() {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Use Cases</h1>
          <p className="text-gray-600 mt-2">Découvrez comment utiliser nos APIs</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Cas d&apos;usage</h2>
          <p className="text-gray-600">Cette page contiendra des exemples d&apos;utilisation de nos APIs.</p>
        </div>
      </div>
    </Layout>
  );
}
