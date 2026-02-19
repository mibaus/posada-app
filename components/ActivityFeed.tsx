import React, { useState, useMemo, useRef } from 'react';
import { MapPin, Star, Filter, ArrowLeft, Clock, Info, Navigation, Mountain, Utensils, Palette, Trees, Sparkles, ChevronRight, Fuel, ShoppingBasket, CreditCard, Store } from 'lucide-react';
import { INITIAL_ACTIVITIES, CATEGORIES } from '../constants';
import { Activity } from '../types';

// Helper to get icon based on category and title for better context
const getCategoryIcon = (category: string, title: string, className = "w-6 h-6") => {
  if (category === 'services') {
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes('cajero') || lowerTitle.includes('banco')) return <CreditCard className={className} />;
      if (lowerTitle.includes('ypf') || lowerTitle.includes('estación') || lowerTitle.includes('shell')) return <Fuel className={className} />;
      if (lowerTitle.includes('mercado') || lowerTitle.includes('super')) return <ShoppingBasket className={className} />;
      return <Store className={className} />;
  }

  switch (category) {
    case 'nature': return <Mountain className={className} />;
    case 'food': return <Utensils className={className} />;
    case 'culture': return <Palette className={className} />;
    case 'adventure': return <Trees className={className} />;
    default: return <Sparkles className={className} />;
  }
};

// Helper to get color theme based on category
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'nature': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'food': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'culture': return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'adventure': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
    case 'services': return 'bg-slate-100 text-slate-800 border-slate-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getCategoryLabel = (category: string) => {
    const cat = CATEGORIES.find(c => c.id === category);
    return cat ? cat.label : 'Actividad';
};

const ActivityCard: React.FC<{ activity: Activity; onSelect: (a: Activity) => void }> = ({ activity, onSelect }) => (
  <div 
    onClick={() => onSelect(activity)}
    className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 mb-4 cursor-pointer relative overflow-hidden"
  >
    {/* Decorative Background Element */}
    <div className="absolute top-0 right-0 p-8 opacity-[0.03] transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-500">
        {getCategoryIcon(activity.category, activity.title, "w-48 h-48 text-black")}
    </div>

    <div className="flex justify-between items-start relative z-10">
      <div className="flex-1">
        {/* Category Tag */}
        <div className="flex items-center space-x-2 mb-3">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${getCategoryColor(activity.category)}`}>
                {getCategoryLabel(activity.category)}
            </span>
            {activity.isRecommended && (
                <span className="flex items-center text-[10px] font-bold text-terracotta-600 bg-terracotta-50 px-2 py-1 rounded-md border border-terracotta-100">
                    <Star className="w-3 h-3 mr-1 fill-current" /> Destacado
                </span>
            )}
        </div>

        {/* Title & Info */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight group-hover:text-nono-600 transition-colors">
            {activity.title}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
            <MapPin className="w-4 h-4 mr-1 text-gray-400" />
            <span className="mr-3">{activity.location}</span>
            <span className="w-1 h-1 rounded-full bg-gray-300 mr-3"></span>
            <span className="text-nono-600 font-medium">{activity.distance}</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 pr-4">
            {activity.description}
        </p>
      </div>

      <div className="flex items-center justify-center h-full pl-2">
         <div className="p-2 rounded-full bg-gray-50 group-hover:bg-nono-50 text-gray-300 group-hover:text-nono-600 transition-colors">
            <ChevronRight className="w-5 h-5" />
         </div>
      </div>
    </div>
  </div>
);

const ActivityDetailView: React.FC<{ activity: Activity; onClose: () => void }> = ({ activity, onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto animate-fade-in flex flex-col">
      {/* Header Styled Area */}
      <div className={`relative pt-16 pb-12 px-6 flex-shrink-0 text-white overflow-hidden transition-colors duration-300 ${activity.category === 'services' ? 'bg-slate-800' : 'bg-gradient-to-br from-nono-700 to-nono-900'}`}>
        {/* Abstract Background Icon */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 opacity-10">
            {getCategoryIcon(activity.category, activity.title, "w-64 h-64")}
        </div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-4">
               <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-bold uppercase tracking-wider border border-white/10">
                 {getCategoryLabel(activity.category)}
               </span>
               {activity.isRecommended && (
                 <span className="px-3 py-1 bg-terracotta-500 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center shadow-lg">
                    <Star className="w-3 h-3 mr-1 fill-current" /> Recomendado
                 </span>
               )}
            </div>
            
            <h1 className="text-3xl font-bold leading-tight mb-2">{activity.title}</h1>
            <div className="flex items-center text-white/80">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">{activity.location}</span>
            </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 bg-white relative rounded-t-3xl -mt-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
           {activity.openingHours && (
             <div className="bg-nono-50 p-4 rounded-2xl border border-nono-100 flex flex-col justify-center">
                <div className="flex items-center text-nono-600 mb-2">
                   <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs text-nono-600 font-bold uppercase mb-1">Horario</span>
                <p className="text-sm text-gray-800 font-bold">{activity.openingHours}</p>
             </div>
           )}
           <div className="bg-nono-50 p-4 rounded-2xl border border-nono-100 flex flex-col justify-center">
              <div className="flex items-center text-nono-600 mb-2">
                 <Navigation className="w-5 h-5" />
              </div>
              <span className="text-xs text-nono-600 font-bold uppercase mb-1">Distancia</span>
              <p className="text-sm text-gray-800 font-bold">{activity.distance} <span className="text-gray-500 font-normal">desde posada</span></p>
           </div>
        </div>

        {/* Description */}
        <div className="mb-10">
           <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Acerca del lugar</h3>
           <p className="text-gray-600 leading-relaxed text-base">
             {activity.fullDescription || activity.description}
           </p>
        </div>

        {/* Local Tips */}
        {activity.tips && activity.tips.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
               <Info className="w-5 h-5 mr-2 text-nono-500" />
               Tips del Local
            </h3>
            <div className="space-y-3">
              {activity.tips.map((tip, index) => (
                <div key={index} className="flex items-start bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                  <div className="min-w-[20px] h-[20px] flex items-center justify-center rounded-full bg-yellow-200 text-yellow-700 mt-0.5 mr-3 text-xs font-bold">
                      {index + 1}
                  </div>
                  <p className="text-sm text-gray-700 italic font-medium">"{tip}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Bottom Spacer for fixed button */}
        <div className="h-24" />
      </div>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-gray-100 safe-area-bottom z-50">
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.address || activity.title + " Nono Cordoba")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-nono-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-nono-700 transition-colors active:scale-95 text-base"
        >
          <Navigation className="w-5 h-5 mr-2" />
          Cómo llegar con Google Maps
        </a>
      </div>
    </div>
  );
};

const ActivityFeed: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  
  // Logic for drag-to-scroll using Refs to avoid re-renders and closure staleness
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0);

  const filteredActivities = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return INITIAL_ACTIVITIES.filter(activity => {
      // Create a global match result including description
      const matchesSearch = activity.title.toLowerCase().includes(query) || 
                            activity.location.toLowerCase().includes(query) ||
                            (activity.description && activity.description.toLowerCase().includes(query));

      // If user is typing a search, ignore category filter (Search All)
      if (query) {
          return matchesSearch;
      }

      // Otherwise, filter by category
      const matchesCategory = activeCategory === 'all' || activity.category === activeCategory;
      return matchesCategory;
    });
  }, [activeCategory, searchTerm]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    dragDistance.current = 0;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
    dragDistance.current = Math.abs(walk);
  };

  const handleCategoryClick = (catId: string) => {
    // If we dragged more than 5px, treat it as a drag, not a click
    if (dragDistance.current > 5) return;
    setActiveCategory(catId);
    
    // Optional: If clicking a category, maybe clear search? 
    // The user didn't ask for this specifically, but it's often good UX.
    // However, to keep behavior predictable based on the prompt "buscar sin filtrar",
    // we keep the search term if they want to filter *within* the search later?
    // No, strictly following the request: Search bar = Global Search. 
    // Tabs = Category filter.
    // To avoid confusion, if I click a category, I probably want to see that category.
    // So clearing search is safe.
    setSearchTerm(''); 
  };

  return (
    <div className="pb-36">
      {/* Detail Overlay */}
      {selectedActivity && (
        <ActivityDetailView 
          activity={selectedActivity} 
          onClose={() => setSelectedActivity(null)} 
        />
      )}

      {/* Refactored Sticky Header with cleaner structure */}
      <div className="sticky top-0 bg-[#f4f7f6]/95 backdrop-blur-md z-40 pb-4 pt-2 -mx-6">
        
        {/* Constrained container for Title and Search */}
        <div className="px-6">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-2xl font-bold text-nono-900">Explorar</h2>
               <div className="bg-white p-2.5 rounded-xl shadow-sm border border-gray-100 text-gray-400">
                 <Filter className="w-5 h-5" />
               </div>
            </div>

            {/* Search */}
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Buscar actividades, lugares..." 
                className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-nono-400 shadow-sm transition-shadow placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
        </div>

        {/* Categories Horizontal Scroll with Mouse Drag support */}
        <div 
            ref={scrollRef}
            className={`flex overflow-x-auto space-x-3 pb-2 px-6 no-scrollbar cursor-grab active:cursor-grabbing select-none transition-opacity duration-300 ${searchTerm ? 'opacity-50 pointer-events-none grayscale' : 'opacity-100'}`}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className={`flex-shrink-0 whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${
                activeCategory === cat.id 
                  ? 'bg-nono-700 text-white border-nono-700 shadow-md' 
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-2 space-y-4">
        {filteredActivities.length > 0 ? (
          filteredActivities.map(activity => (
            <ActivityCard 
              key={activity.id} 
              activity={activity} 
              onSelect={setSelectedActivity}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
                <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 font-medium">No encontramos resultados.</p>
            <button 
              onClick={() => {setActiveCategory('all'); setSearchTerm('')}}
              className="mt-4 text-nono-600 font-bold hover:underline"
            >
              Ver todo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;