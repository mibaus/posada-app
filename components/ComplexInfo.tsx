
import React from 'react';
import { Clock, Phone, AlertCircle, MapPin, MessageCircle } from 'lucide-react';
import { COMPLEX_INFO } from '../constants';

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string; isLink?: boolean; href?: string }> = ({ icon, label, value, isLink, href }) => {
  const linkUrl = href || `tel:${value}`;
  const target = href?.startsWith('http') ? '_blank' : undefined;

  return (
    <div className="flex items-center p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-3">
        <div className="p-2 bg-nono-50 text-nono-600 rounded-full mr-4">
        {icon}
        </div>
        <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
        {isLink ? (
            <a 
                href={linkUrl} 
                target={target}
                rel={target ? "noopener noreferrer" : undefined}
                className="text-nono-700 font-semibold text-lg hover:underline decoration-nono-500 underline-offset-2"
            >
            {value}
            </a>
        ) : (
            <p className="text-gray-800 font-semibold text-lg">{value}</p>
        )}
        </div>
    </div>
  );
};

const ComplexInfo: React.FC = () => {
  const cleanManagerPhone = COMPLEX_INFO.managerPhone.replace(/[^0-9]/g, '');
  const wppUrl = `https://wa.me/${cleanManagerPhone}`;

  return (
    <div className="space-y-6 pb-36">
      <div className="px-1">
        <h2 className="text-2xl font-bold text-nono-900 mb-2">Información Útil</h2>
        <p className="text-gray-600 mb-6">Todo lo que necesitas saber para una estadía perfecta.</p>
      </div>

      <div className="space-y-1">
        <InfoItem 
          icon={<Clock className="w-5 h-5" />} 
          label="Check-out" 
          value={COMPLEX_INFO.checkoutTime} 
        />
        <InfoItem 
          icon={<MessageCircle className="w-5 h-5" />} 
          label="Administración" 
          value={COMPLEX_INFO.managerPhone} 
          isLink 
          href={wppUrl}
        />
        <InfoItem 
          icon={<AlertCircle className="w-5 h-5 text-terracotta-500" />} 
          label="Emergencias Médicas" 
          value={COMPLEX_INFO.emergencyPhone} 
          isLink 
        />
      </div>

      <div className="bg-nono-50 rounded-2xl p-6 border border-nono-100">
        <div className="flex items-center mb-4">
          <MapPin className="w-5 h-5 text-nono-600 mr-2" />
          <h3 className="font-bold text-nono-800">Ubicación del Complejo</h3>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Estamos ubicados en el corazón del Valle de Traslasierra, a 5 minutos de la plaza de Nono y a pasos del Río de los Sauces.
        </p>
        <a 
          href="https://www.google.com/maps/search/?api=1&query=Nono+Cordoba" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full py-3 bg-white border border-nono-200 text-nono-700 font-medium rounded-lg shadow-sm hover:bg-nono-50 transition-colors"
        >
          Ver en Google Maps
        </a>
      </div>
    </div>
  );
};

export default ComplexInfo;
