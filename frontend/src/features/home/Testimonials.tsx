import React, { useState, useEffect } from 'react';
import { Quote, X, MessageSquareQuote, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Language } from '@shared/types';
import { TESTIMONIALS_DATA, TEACHERS_DATA } from '@/utils/constants';
import { translations } from '@/locales/translations';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface TestimonialData {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  photoUrl?: string;
  text: {
    en: string;
    am: string;
    om: string;
  };
}

const Testimonials: React.FC<{ externalLang?: Language }> = ({ externalLang }) => {
  const [lang, setLang] = useState<Language>(externalLang || 'en');
  const [selected, setSelected] = useState<TestimonialData | null>(null);
  const [activeCategory, setActiveCategory] = useState<'student' | 'teacher' | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (externalLang) setLang(externalLang);
  }, [externalLang]);

  // --- FUNCTION 1: CIRCULAR NAVIGATION LOGIC ---
  // This function calculates the next or previous index in the array.
  // It uses the modulo operator (%) to jump from the last item back to the first.
  const handleNavigate = (direction: 'next' | 'prev') => {
    if (!selected || !activeCategory) return;
    
    const currentList = activeCategory === 'teacher' ? TEACHERS_DATA : TESTIMONIALS_DATA;
    const currentIndex = currentList.findIndex(t => t.id === selected.id);
    
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % currentList.length;
    } else {
      // (length - 1) handles the jump from index 0 to the end
      nextIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    }
    
    setSelected(currentList[nextIndex]);
  };

  const t = translations.testimonials;

  const renderPhoto = (item: TestimonialData, size: 'sm' | 'lg' = 'sm') => {
    const isError = imgErrors[item.id];
    const containerClasses = size === 'sm' 
      ? "w-24 h-24 rounded-full mb-6 shadow-xl border-[4px] border-white overflow-hidden group-hover:scale-110 transition-transform duration-700 flex-shrink-0"
      : "w-48 h-48 md:w-60 md:h-60 rounded-[3rem] shadow-2xl border-[8px] border-white overflow-hidden flex-shrink-0";

    if (item.photoUrl && !isError) {
      return (
        <div className={`${containerClasses} bg-gray-200`}>
          <img 
            src={item.photoUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
            onError={() => setImgErrors(prev => ({ ...prev, [item.id]: true }))}
          />
        </div>
      );
    }

    return (
      <div className={`${containerClasses} ${item.color} flex items-center justify-center`}>
        <span className={`${size === 'sm' ? 'text-2xl' : 'text-7xl'} font-black tracking-tighter text-white`}>
          {item.initials}
        </span>
      </div>
    );
  };

  const renderCard = (item: TestimonialData, category: 'student' | 'teacher') => (
    <Card 
      key={item.id} 
      onClick={() => {
        setSelected(item);
        setActiveCategory(category);
      }}
      className="p-8 relative flex flex-col items-center text-center hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 group cursor-pointer w-[350px] mx-6 flex-shrink-0 h-[450px] bg-white border-slate-100 rounded-[2.5rem]"
    >
      <Quote className="absolute top-8 right-8 h-8 w-8 text-yellow-500/10 group-hover:text-yellow-500/30 transition-colors duration-500" />
      {renderPhoto(item, 'sm')}
      <h3 className="font-black text-xl text-slate-900 mb-2 leading-tight tracking-tight group-hover:text-yellow-600 transition-colors line-clamp-1">{item.name}</h3>
      {/*<p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-6 bg-yellow-50 px-4 py-1 rounded-full">{item.role}</p>*/}
      <p className="text-slate-500 text-sm leading-relaxed line-clamp-5 italic mb-6 font-medium">"{item.text[lang]}"</p>
      <div className="mt-auto pt-6 border-t border-slate-50 w-full">
        <span className="text-xs font-black text-slate-300 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
           {t.readMore[lang]}
        </span>
      </div>
    </Card>
  );

  return (
    <section className="py-32 bg-yellow-200 relative overflow-hidden">
      {/* --- CHANGE 1: SMOOTH FLOW CSS --- */}
      {/* We use @keyframes to move the container. The width calculation (350px card + 48px margin) 
          multiplied by data length ensures a perfectly seamless loop. */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-forward {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-${(350 + 48) * TESTIMONIALS_DATA.length}px)); }
        }
        .animate-scroll { animation: scroll-forward ${TESTIMONIALS_DATA.length * 5}s linear infinite; }
        .pause-on-hover:hover { animation-play-state: paused; }
      ` }} />

      <div className="w-full relative z-10 space-y-24">
        <div className="overflow-hidden">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white uppercase">{t.title[lang]}</h2>
          </div>
          
          <div className="relative w-full">
            {/* --- CHANGE 2: INFINITE LOOP DATA --- */}
            {/* We triple the data array [...data, ...data, ...data] to ensure 
                there is always content visible during the animation transition. */}
            <div className="flex animate-scroll pause-on-hover w-max">
              {[...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA].map((item, idx) => (
                <div key={`${item.id}-${idx}`}>
                   {renderCard(item, 'student')}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- CHANGE 3: MODAL NAVIGATION BUTTONS --- */}
      {selected && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/95 backdrop-blur-2xl p-6">
          <div className="relative w-full max-w-5xl flex items-center gap-8">
            
            {/* DESKTOP PREVIOUS BUTTON */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNavigate('prev'); }}
              className="hidden md:flex p-6 bg-white/10 hover:bg-white text-blue-600 rounded-full transition-all hover:scale-110 active:scale-95 border border-white/20"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>

            <div className="bg-white rounded-[5rem] flex-1 overflow-hidden relative animate-in zoom-in duration-500">
              <button onClick={() => setSelected(null)} className="absolute top-12 right-12 p-6 bg-slate-100 hover:bg-slate-200 rounded-full z-10">
                <X className="h-8 w-8" />
              </button>

              <div className="p-10 md:p-24">
                 <div className="flex flex-col md:flex-row items-center gap-14 mb-16">
                    {renderPhoto(selected, 'lg')}
                    <div className="text-center md:text-left">
                      <h4 className="text-5xl font-black text-slate-900 mb-4">{selected.name}</h4>
                      {/*<p className="text-lg font-black text-yellow-600 uppercase tracking-[0.4em]">{selected.role}</p>*/}
                    </div>
                 </div>

                 <p className="text-xl md:text-3xl text-slate-700 leading-relaxed italic mb-12">
                   "{selected.text[lang]}"
                 </p>

                 {/* MOBILE NAVIGATION BUTTONS */}
                 <div className="flex md:hidden gap-4 mt-8">
                    <button onClick={() => handleNavigate('prev')} className="flex-1 py-4 bg-slate-100 text-slate-900 rounded-2xl font-bold">Previous</button>
                    <button onClick={() => handleNavigate('next')} className="flex-1 py-4 bg-yellow-500 text-white rounded-2xl font-bold">Next</button>
                 </div>
              </div>
            </div>

            {/* DESKTOP NEXT BUTTON */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNavigate('next'); }}
              className="hidden md:flex p-6 bg-white/10 hover:bg-white text-blue-600 rounded-full transition-all hover:scale-110 active:scale-95 border border-white/20"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;