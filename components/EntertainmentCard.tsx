
import React, { useState } from 'react';
import { BookOpen, Dices, Info, Sparkles, ChevronRight, X, MessageCircle, Heart, Star, Lock } from 'lucide-react';
import { BOOKS_CATALOG, GAMES_CATALOG, MASSAGE_MENU, COMPLEX_INFO } from '../constants';
import { InventoryItem, Therapy } from '../types';

type Category = 'books' | 'games' | 'massages' | null;

const CatalogModal: React.FC<{ 
  title: string; 
  icon: React.ReactNode; 
  color: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, icon, color, onClose, children }) => (
  <div className="fixed inset-0 z-[60] bg-[#f8fafc] animate-fade-in flex flex-col h-[100dvh]">
    <div className={`px-6 pt-12 pb-6 flex items-center justify-between ${color} text-white shadow-lg relative overflow-hidden flex-shrink-0`}>
       {/* Abstract background shapes */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
       <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-5 -mb-5"></div>
       
       <div className="flex items-center space-x-4 relative z-10">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
             {icon}
          </div>
          <div>
            <span className="text-xs font-medium text-white/80 uppercase tracking-widest">Catálogo</span>
            <h2 className="text-2xl font-bold leading-none">{title}</h2>
          </div>
       </div>
       <button onClick={onClose} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10 backdrop-blur-sm">
          <X className="w-6 h-6" />
       </button>
    </div>
    
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-20 scroll-smooth">
       {children}
    </div>
  </div>
);

const getWhatsAppLink = (message: string) => {
    const cleanPhone = COMPLEX_INFO.managerPhone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

// --- BOOK CARD DESIGN ---
const BookCard: React.FC<{ item: InventoryItem }> = ({ item }) => {
    const whatsappUrl = getWhatsAppLink(`Hola, quisiera pedir prestado el libro "${item.title}".`);
    
    return (
        <div className={`bg-white rounded-r-xl rounded-l-md shadow-sm border border-gray-100 flex h-full transition-all duration-300 ${!item.available ? 'opacity-60 grayscale-[0.5]' : 'hover:shadow-md hover:-translate-y-1'}`}>
            {/* "Spine" of the book */}
            <div className={`w-3 rounded-l-md flex-shrink-0 ${item.available ? 'bg-amber-600' : 'bg-gray-300'}`}></div>
            
            <div className="p-4 flex flex-col justify-between flex-1">
                <div className="mb-3">
                    <h4 className="font-bold text-gray-800 text-base leading-snug line-clamp-2 mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 font-medium italic">{item.authorOrType}</p>
                </div>

                <div className="flex justify-between items-end mt-auto pt-3 border-t border-gray-50">
                    {item.available ? (
                         <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                            DISPONIBLE
                        </span>
                    ) : (
                        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100 flex items-center">
                            <Lock className="w-3 h-3 mr-1" />
                            PRESTADO
                        </span>
                    )}

                    {item.available && (
                        <a 
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-600 p-2 rounded-full hover:bg-amber-50 transition-colors"
                        >
                            <MessageCircle className="w-5 h-5" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- GAME CARD DESIGN ---
const GameCard: React.FC<{ item: InventoryItem }> = ({ item }) => {
    const whatsappUrl = getWhatsAppLink(`Hola, quisiera pedir prestado el juego "${item.title}".`);
    
    return (
        <div className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col h-full relative overflow-hidden transition-all duration-300 ${!item.available ? 'opacity-50' : 'hover:shadow-md hover:scale-[1.02]'}`}>
             {/* Decorative blob */}
             <div className="absolute top-[-20%] right-[-20%] w-24 h-24 bg-indigo-50 rounded-full blur-xl z-0"></div>

             <div className="relative z-10 flex-1 flex flex-col">
                 <div className="flex justify-between items-start mb-2">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Dices className="w-6 h-6" />
                    </div>
                    {item.available ? (
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    ) : (
                        <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    )}
                 </div>

                 <h4 className="font-bold text-gray-800 text-lg leading-tight mb-1">{item.title}</h4>
                 <p className="text-xs text-indigo-400 font-bold uppercase tracking-wide mb-4">{item.authorOrType}</p>

                 <div className="mt-auto">
                    {item.available ? (
                        <a 
                           href={whatsappUrl}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                        >
                           <MessageCircle className="w-3.5 h-3.5" />
                           <span>PEDIR</span>
                        </a>
                    ) : (
                        <button disabled className="w-full text-center text-xs font-bold text-gray-400 py-2 bg-gray-50 rounded-lg cursor-not-allowed">
                            OCUPADO
                        </button>
                    )}
                 </div>
             </div>
        </div>
    );
};

// --- SPA HERO CARD DESIGN ---
const SpaHeroCard: React.FC<{ therapy: Therapy }> = ({ therapy }) => {
    const whatsappUrl = getWhatsAppLink(`Hola, me gustaría consultar disponibilidad para masajes.`);

    return (
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-rose-100">
            {/* Visual Header */}
            <div className="bg-gradient-to-br from-rose-400 to-rose-600 p-8 text-white relative">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl transform -translate-x-1/3 translate-y-1/3"></div>
                 
                 <div className="relative z-10">
                    <div className="flex items-center space-x-2 mb-2 opacity-90">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-widest">Wellness Center</span>
                    </div>
                    <h3 className="text-3xl font-bold leading-tight mb-2">{therapy.title}</h3>
                    <p className="text-rose-100 text-sm font-medium">{therapy.duration}</p>
                 </div>
            </div>

            {/* Content Body */}
            <div className="p-6">
                <p className="text-gray-600 leading-relaxed text-base mb-6">
                    {therapy.description}
                </p>

                <div className="bg-rose-50 rounded-xl p-4 mb-6 border border-rose-100">
                    <h5 className="text-sm font-bold text-rose-800 mb-2 flex items-center">
                        <Star className="w-4 h-4 mr-2 fill-current" />
                        Incluye
                    </h5>
                    <ul className="text-sm text-gray-700 space-y-1.5 ml-1">
                        <li className="flex items-center"><div className="w-1 h-1 bg-rose-400 rounded-full mr-2"></div>Aromaterapia</li>
                        <li className="flex items-center"><div className="w-1 h-1 bg-rose-400 rounded-full mr-2"></div>Música relajante</li>
                        <li className="flex items-center"><div className="w-1 h-1 bg-rose-400 rounded-full mr-2"></div>Aceites orgánicos</li>
                    </ul>
                </div>

                <a 
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center bg-rose-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all active:scale-95"
                >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Consultar Turnos
                </a>
            </div>
        </div>
    );
};


const MenuButton: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  subtitle: string; 
  gradient: string; 
  onClick: () => void 
}> = ({ icon, title, subtitle, gradient, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-95 group relative overflow-hidden"
  >
    <div className={`absolute inset-y-0 left-0 w-1 ${gradient}`}></div>
    <div className={`p-3 rounded-full mr-4 ${gradient} bg-opacity-10 text-gray-700 group-hover:bg-opacity-20 transition-colors`}>
        <div className="text-gray-800">
           {icon}
        </div>
    </div>
    <div className="flex-1 text-left">
      <h3 className="font-bold text-gray-800 text-lg group-hover:text-nono-600 transition-colors">{title}</h3>
      <p className="text-xs text-gray-500 font-medium">{subtitle}</p>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-nono-600" />
  </button>
);

const EntertainmentCard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(null);

  return (
    <>
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
         <h3 className="text-lg font-bold text-nono-900">Amenities & Relax</h3>
         <Sparkles className="w-5 h-5 text-nono-300" />
      </div>

      <div className="space-y-3">
        <MenuButton 
            icon={<BookOpen className="w-6 h-6 text-amber-600" />}
            title="Biblioteca"
            subtitle="Novelas, historia local y guías."
            gradient="bg-amber-500"
            onClick={() => setActiveCategory('books')}
        />
        <MenuButton 
            icon={<Dices className="w-6 h-6 text-indigo-600" />}
            title="Ludoteca"
            subtitle="Juegos de mesa para todos."
            gradient="bg-indigo-500"
            onClick={() => setActiveCategory('games')}
        />
        <MenuButton 
            icon={<Heart className="w-6 h-6 text-rose-600" />}
            title="Wellness & Spa"
            subtitle="Masajes y terapias relajantes."
            gradient="bg-rose-500"
            onClick={() => setActiveCategory('massages')}
        />
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-gray-100">
         <div className="flex bg-nono-50 rounded-lg p-3">
            <Info className="w-5 h-5 text-nono-600 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-nono-800 font-medium leading-relaxed">
              Seleccioná una categoría para ver el catálogo. Los préstamos son gratuitos durante tu estadía.
            </p>
         </div>
      </div>
    </div>

    {/* --- BOOK MODAL --- */}
    {activeCategory === 'books' && (
        <CatalogModal 
            title="Biblioteca Serrana" 
            icon={<BookOpen className="w-8 h-8" />} 
            color="bg-gradient-to-br from-amber-600 to-amber-800"
            onClose={() => setActiveCategory(null)}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BOOKS_CATALOG.map(book => <BookCard key={book.id} item={book} />)}
            </div>
            <p className="text-center text-xs text-gray-400 mt-8 mb-4">
                ¿Buscas algo específico? Preguntanos en recepción.
            </p>
        </CatalogModal>
    )}

    {/* --- GAMES MODAL --- */}
    {activeCategory === 'games' && (
        <CatalogModal 
            title="Ludoteca Familiar" 
            icon={<Dices className="w-8 h-8" />} 
            color="bg-gradient-to-br from-indigo-600 to-indigo-800"
            onClose={() => setActiveCategory(null)}
        >
            <div className="grid grid-cols-2 gap-4">
                {GAMES_CATALOG.map(game => <GameCard key={game.id} item={game} />)}
            </div>
        </CatalogModal>
    )}

    {/* --- MASSAGE MODAL --- */}
    {activeCategory === 'massages' && (
        <CatalogModal 
            title="Espacio Wellness" 
            icon={<Heart className="w-8 h-8" />} 
            color="bg-gradient-to-br from-rose-500 to-rose-700"
            onClose={() => setActiveCategory(null)}
        >
            <div className="max-w-md mx-auto">
                 {MASSAGE_MENU.map(therapy => <SpaHeroCard key={therapy.id} therapy={therapy} />)}
                 
                 <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 mb-2 font-medium">Horarios de atención</p>
                    <div className="inline-block bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm text-gray-700">
                        Todos los días de 10:00 a 20:00 hs
                    </div>
                 </div>
            </div>
        </CatalogModal>
    )}
    </>
  );
};

export default EntertainmentCard;
