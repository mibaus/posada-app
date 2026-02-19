import React, { useState } from 'react';
import { Home, Compass, Info, Sun, Waves, Mountain, Utensils } from 'lucide-react';
import WiFiCard from './components/WiFiCard';
import ActivityFeed from './components/ActivityFeed';
import ComplexInfo from './components/ComplexInfo';
import EntertainmentCard from './components/EntertainmentCard';
import { Tab } from './types';

// Simple Weather Widget Component
const WeatherWidget = () => (
  <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-amber-50 rounded-full">
        <Sun className="w-6 h-6 text-amber-500" />
      </div>
      <div>
        <span className="block text-2xl font-bold text-gray-800">24°C</span>
        <span className="text-xs text-gray-500 font-medium">Soleado hoy</span>
      </div>
    </div>
    <div className="text-right">
      <span className="text-xs font-bold text-nono-600 uppercase tracking-wide bg-nono-50 px-2 py-1 rounded-md">Nono, Cba</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8 pb-36 animate-fade-in">
            <div className="mt-4">
              <h1 className="text-4xl font-bold text-nono-900 leading-tight mb-2">
                Posada<br />
                <span className="text-nono-600">de Nono</span>
              </h1>
              <p className="text-gray-500 font-medium text-lg">Tu hogar en Traslasierra</p>
            </div>

            <WeatherWidget />

            <section>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-1 bg-nono-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">Conectividad</h2>
              </div>
              <WiFiCard />
            </section>

            <section>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-1 bg-terracotta-500 rounded-full"></div>
                <h2 className="text-xl font-bold text-gray-800">Relax en la cabaña</h2>
              </div>
              <EntertainmentCard />
            </section>
          </div>
        );
      case 'explore':
        return <ActivityFeed />;
      case 'info':
        return <ComplexInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f6] font-sans text-gray-900 selection:bg-nono-200">
      <main className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-[#f4f7f6]">
        {/* Top Content Area */}
        <div className="px-6 pt-8 min-h-screen">
          {renderContent()}
        </div>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-lg border-t border-gray-200 px-6 py-4 grid grid-cols-3 gap-4 items-center z-50 rounded-t-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'home' ? 'text-nono-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Home className={`w-6 h-6 ${activeTab === 'home' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold tracking-wide">Inicio</span>
          </button>

          <button
            onClick={() => setActiveTab('explore')}
            className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'explore' ? 'text-nono-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Compass className={`w-6 h-6 ${activeTab === 'explore' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold tracking-wide">Explorar</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'info' ? 'text-nono-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Info className={`w-6 h-6 ${activeTab === 'info' ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold tracking-wide">Info</span>
          </button>
        </nav>
      </main>
    </div>
  );
};

export default App;