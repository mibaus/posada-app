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
    className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 mb-6 cursor-pointer overflow-hidden flex flex-col"
  >
    {/* Image Container */}
    <div className="relative h-56 w-full overflow-hidden">
      <img
        src={activity.imageUrl || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800'}
        alt={activity.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

      {/* Dynamic Tags */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
        <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 shadow-lg ${getCategoryColor(activity.category).replace('bg-', 'bg-').replace('text-', 'text-')}`}>
          {getCategoryLabel(activity.category)}
        </span>
        {activity.isRecommended && (
          <span className="flex items-center text-[10px] font-bold text-white bg-terracotta-500 px-3 py-1.5 rounded-full shadow-lg">
            <Star className="w-3 h-3 mr-1 fill-current" /> Destacado
          </span>
        )}
      </div>

      {/* Distance Badge */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center space-x-1.5">
        <Navigation className="w-3.5 h-3.5 text-nono-600" />
        <span className="text-[10px] font-bold text-nono-900 uppercase tracking-tight">{activity.distance}</span>
      </div>
    </div>

    <div className="p-6 relative">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-nono-600 transition-colors leading-tight">
          {activity.title}
        </h3>
        <div className="p-2 rounded-full bg-nono-50 text-nono-600 self-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <MapPin className="w-4 h-4 mr-1 text-nono-400" />
        <span className="font-medium">{activity.location}</span>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
        {activity.description}
      </p>
    </div>
  </div>
);

const ActivityDetailView: React.FC<{ activity: Activity; onClose: () => void }> = ({ activity, onClose }) => {
  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto animate-fade-in flex flex-col">
      {/* Hero Image Header */}
      <div className="relative h-[45vh] w-full flex-shrink-0">
        <img
          src={activity.imageUrl || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200'}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />

        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-3 bg-white/20 backdrop-blur-xl rounded-full text-white hover:bg-white/40 border border-white/30 transition-all shadow-2xl active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="absolute bottom-12 px-6 w-full">
          <div className="flex items-center space-x-2 mb-3">
            <span className="px-4 py-1.5 bg-nono-600/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-white border border-nono-400/50 shadow-xl">
              {getCategoryLabel(activity.category)}
            </span>
            {activity.isRecommended && (
              <span className="px-4 py-1.5 bg-terracotta-500 rounded-full text-[10px] font-bold uppercase tracking-widest text-white flex items-center shadow-xl">
                <Star className="w-3 h-3 mr-1 fill-current" /> Recomendado
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 leading-tight drop-shadow-sm">{activity.title}</h1>
          <div className="flex items-center text-gray-600 mt-2 font-medium">
            <MapPin className="w-4 h-4 mr-1.5 text-nono-500" />
            <span>{activity.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-32 bg-white">
        {/* Quick Stats Banner */}
        <div className="flex space-x-4 mb-10 overflow-x-auto no-scrollbar py-2">
          {activity.openingHours && (
            <div className="flex-shrink-0 bg-nono-50/50 px-5 py-4 rounded-3xl border border-nono-100 min-w-[140px]">
              <Clock className="w-5 h-5 text-nono-600 mb-2" />
              <p className="text-[10px] text-nono-400 font-bold uppercase tracking-widest">Horario</p>
              <p className="text-sm text-gray-900 font-bold mt-1">{activity.openingHours}</p>
            </div>
          )}
          <div className="flex-shrink-0 bg-nono-50/50 px-5 py-4 rounded-3xl border border-nono-100 min-w-[140px]">
            <Navigation className="w-5 h-5 text-nono-600 mb-2" />
            <p className="text-[10px] text-nono-400 font-bold uppercase tracking-widest">Llegada</p>
            <p className="text-sm text-gray-900 font-bold mt-1">{activity.distance}</p>
          </div>
        </div>

        {/* Narrative Description */}
        <div className="prose prose-slate mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Sparkles className="w-5 h-5 mr-3 text-amber-500" />
            La Experiencia
          </h3>
          <p className="text-gray-600 leading-relaxed text-lg font-medium opacity-90">
            {activity.fullDescription || activity.description}
          </p>
        </div>

        {/* Local Secrets / Tips */}
        {activity.tips && activity.tips.length > 0 && (
          <div className="mb-10 p-6 bg-amber-50 rounded-[2.5rem] border border-amber-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 text-amber-900 rotate-12">
              <Info className="w-24 h-24" />
            </div>
            <h3 className="text-lg font-bold text-amber-900 mb-5 flex items-center relative z-10">
              <Info className="w-5 h-5 mr-2" />
              Tips de la Posada
            </h3>
            <div className="space-y-4 relative z-10">
              {activity.tips.map((tip, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-amber-400 font-bold text-lg mr-3 mt-[-2px] tracking-tighter">0{index + 1}</span>
                  <p className="text-amber-900/80 text-sm font-medium leading-relaxed italic">"{tip}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Premium Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 pb-10 bg-gradient-to-t from-white via-white to-transparent z-50">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.address || activity.title + " Nono Cordoba")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-nono-900 text-white font-bold py-5 rounded-2xl shadow-[0_20px_40px_-10px_rgba(40,58,55,0.3)] hover:bg-black transition-all active:scale-95 group overflow-hidden"
        >
          <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <Navigation className="w-5 h-5 mr-3 animate-pulse" />
          <span className="tracking-tight text-lg">Ver ruta en Maps</span>
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
              className={`flex-shrink-0 whitespace-nowrap px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border ${activeCategory === cat.id
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
              onClick={() => { setActiveCategory('all'); setSearchTerm('') }}
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