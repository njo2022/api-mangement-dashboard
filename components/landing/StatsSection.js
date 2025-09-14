export function StatsSection() {
  return (
    <section className="px-6 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Des chiffres qui parlent
          </h2>
          <p className="text-xl text-gray-600">
            Rejoignez une communauté grandissante de développeurs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Clés API gérées</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">99.9%</div>
            <div className="text-gray-600">Uptime garanti</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">1M+</div>
            <div className="text-gray-600">Requêtes traitées</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">24/7</div>
            <div className="text-gray-600">Support disponible</div>
          </div>
        </div>
      </div>
    </section>
  );
}
