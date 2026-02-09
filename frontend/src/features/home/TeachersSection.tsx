import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, GraduationCap } from 'lucide-react';
import type { Language } from '@shared/types';
import { TEACHERS_DATA } from '@/utils/constants';
import { translations } from '@/locales/translations';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';

interface TeacherData {
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

const TeachersSection: React.FC<{ externalLang?: Language }> = ({ externalLang }) => {
  const [lang, setLang] = useState<Language>(externalLang || 'en');
  const [selected, setSelected] = useState<TeacherData | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (externalLang) setLang(externalLang);
  }, [externalLang]);

  const displayTeachers = TEACHERS_DATA && TEACHERS_DATA.length > 0 
    ? [...TEACHERS_DATA, ...TEACHERS_DATA, ...TEACHERS_DATA] 
    : [];
  const t = translations.testimonials;

  // Initialize scroll to middle set
  useEffect(() => {
    if (scrollContainerRef.current && TEACHERS_DATA.length > 0) {
      const container = scrollContainerRef.current;
      const cardWidth = 480 + 40; // card width + gap
      container.scrollLeft = cardWidth * TEACHERS_DATA.length;
    }
  }, []);

  const handleInfiniteScroll = useCallback(() => {
    if (!scrollContainerRef.current || isAnimating.current || TEACHERS_DATA.length === 0) return;
    const container = scrollContainerRef.current;
    const cardWidth = 480 + 40;
    const totalContentWidth = cardWidth * TEACHERS_DATA.length;

    if (container.scrollLeft >= totalContentWidth * 2) {
      container.scrollTo({ left: totalContentWidth, behavior: 'auto' });
    } else if (container.scrollLeft <= 0) {
      container.scrollTo({ left: totalContentWidth, behavior: 'auto' });
    }
  }, [teachers.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current && !isAnimating.current) {
      isAnimating.current = true;
      const container = scrollContainerRef.current;
      const cardWidth = 480 + 40;
      const scrollAmount = cardWidth;

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });

      // Wait for smooth scroll to finish
      setTimeout(() => {
        isAnimating.current = false;
        handleInfiniteScroll();
      }, 600);
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const renderPhoto = (item: TeacherData, size: 'sm' | 'lg' = 'sm') => {
    const isError = imgErrors[item.id];
    const baseClasses = "rounded-3xl shadow-xl border-4 border-white/20 overflow-hidden flex-shrink-0";
    const containerClasses = size === 'sm'
      ? `w-24 h-24 ${baseClasses}`
      : `w-56 h-56 md:w-72 md:h-72 rounded-[4rem] border-8 ${baseClasses}`;

    if (item.photoUrl && !isError) {
      return (
        <div className={`${containerClasses} bg-white`}>
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
        <span className={`${size === 'sm' ? 'text-4xl' : 'text-8xl'} font-black`}>
          {item.initials}
        </span>
      </div>
    );
  };

  return (
    <section className="py-24 bg-blue-600 overflow-hidden rounded-[4rem] my-12 mx-4 md:mx-12 shadow-2xl relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />
      
      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <SectionHeader 
            title={t?.teachersTitle?.[lang] || 'Our Teachers'} 
            subtitle="Expert educators dedicated to student success"
            className="!mb-0"
            titleClassName="text-white"
            subtitleClassName="text-blue-100"
          />
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="p-4 bg-white/10 hover:bg-white text-blue-600 hover:text-blue-700 rounded-2xl border border-white/20 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-4 bg-white/10 hover:bg-white text-blue-600 hover:text-blue-700 rounded-2xl border border-white/20 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Side-by-Side Flow */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleInfiniteScroll}
          className="flex overflow-x-auto gap-10 pb-12 hide-scrollbar snap-x scroll-smooth -mx-4 px-4 flex-nowrap min-h-[500px]"
        >
          {displayTeachers.length > 0 ? (
            displayTeachers.map((item, index) => (
              <Card 
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-[380px] md:w-[480px] group relative overflow-hidden border-none shadow-2xl bg-slate-900/40 backdrop-blur-xl rounded-[3.5rem] p-10 snap-center transition-all duration-500 hover:bg-slate-900/60 hover:-translate-y-3"
                onClick={() => setSelected(item)}
              >
                <GraduationCap className="absolute -top-4 -right-4 h-32 w-32 text-white/5 group-hover:text-white/10 transition-colors rotate-12" />
                
                <div className="flex flex-col items-center text-center gap-6 mb-8">
                  {renderPhoto(item, 'sm')}
                  <div>
                    <h3 className="text-3xl font-black text-white leading-tight uppercase italic tracking-tighter">
                      {item.name}
                    </h3>
                    <p className="text-blue-300 text-sm font-black uppercase tracking-[0.25em] mt-2">
                      {item.role}
                    </p>
                  </div>
                </div>

                <div className="relative text-center">
                  <p className="text-white/90 font-medium text-lg leading-relaxed line-clamp-3 mb-8 px-4">
                    {item.text[lang]}
                  </p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelected(item); }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest transition-all group/btn"
                  >
                    <span>{t?.readMore?.[lang] || 'Read More'}</span>
                    <Maximize2 className="h-4 w-4 group-hover/btn:scale-125 transition-transform" />
                  </button>
                </div>
              </Card>
            ))
          ) : (
            <div className="w-full flex justify-center items-center py-20">
              <p className="text-white text-2xl font-bold">No teachers data available.</p>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-3xl" onClick={() => setSelected(null)} />
          
          <div className="relative w-full max-w-6xl bg-white rounded-[5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-500">
            <button 
              onClick={() => setSelected(null)}
              className="absolute top-10 right-10 p-5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-3xl transition-all z-10"
            >
              <X className="h-8 w-8" />
            </button>

            <div className={`md:w-5/12 p-16 flex flex-col items-center justify-center text-center ${selected.color}/20 relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10">
                <GraduationCap className="w-full h-full scale-150 -rotate-12" />
              </div>
              <div className="relative z-10">
                <div className="absolute -inset-12 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
                {renderPhoto(selected, 'lg')}
              </div>
              <h3 className="text-5xl font-black text-blue-900 mt-16 mb-4 tracking-tighter uppercase italic relative z-10">
                {selected.name}
              </h3>
              <p className="text-blue-600 font-black uppercase tracking-[0.4em] text-base relative z-10">
                {selected.role}
              </p>
            </div>

            <div className="flex-1 p-16 md:p-24 flex flex-col justify-center relative bg-white">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-50 rounded-br-[5rem] -z-10" />
              <h4 className="text-blue-900/30 font-black text-6xl mb-12 uppercase italic tracking-tighter">About Me</h4>
              <p className="text-2xl md:text-3xl font-bold text-slate-700 leading-relaxed mb-12">
                {selected.text[lang]}
              </p>
              <div className="flex gap-4">
                <div className="h-3 w-32 bg-blue-600 rounded-full" />
                <div className="h-3 w-12 bg-blue-200 rounded-full" />
                <div className="h-3 w-6 bg-blue-100 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Decor */}
      <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default TeachersSection;
