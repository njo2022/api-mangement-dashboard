"use client";

import { Layout } from "@/components/Layout";

export default function ApiPlayground() {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API Playground</h1>
          <p className="text-gray-600 mt-2">Testez vos clés API en temps réel</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test d&apos;API</h2>
          <p className="text-gray-600">Cette page sera bientôt disponible pour tester vos clés API.</p>
        </div>
      </div>
    </Layout>
  );
}
