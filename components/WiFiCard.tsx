import React, { useState } from 'react';
import { Wifi, Copy, Check } from 'lucide-react';
import { COMPLEX_INFO } from '../constants';

const WiFiCard: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(COMPLEX_INFO.wifiPass);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-nono-600 to-nono-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-24 h-24 bg-nono-400/20 rounded-full blur-xl pointer-events-none" />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <h3 className="text-nono-100 text-sm font-medium mb-1">Red WiFi</h3>
          <p className="text-2xl font-bold tracking-wide">{COMPLEX_INFO.wifiSSID}</p>
        </div>
        <Wifi className="w-8 h-8 text-nono-200" />
      </div>

      <div className="mt-6 flex items-center justify-between bg-black/20 rounded-xl p-3 backdrop-blur-sm border border-white/10">
        <div className="flex flex-col">
          <span className="text-xs text-nono-200">Contraseña</span>
          <span className="font-mono text-lg">{COMPLEX_INFO.wifiPass}</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors active:scale-95"
          aria-label="Copiar contraseña"
        >
          {copied ? <Check className="w-5 h-5 text-green-300" /> : <Copy className="w-5 h-5 text-white" />}
        </button>
      </div>
      
      {copied && (
        <div className="absolute inset-0 flex items-center justify-center bg-nono-700/90 backdrop-blur-sm z-20 transition-all">
          <div className="flex flex-col items-center animate-bounce">
            <Check className="w-10 h-10 text-white mb-2" />
            <span className="font-semibold text-white">¡Copiado!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WiFiCard;
