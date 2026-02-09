import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import type { Language } from '@shared/types';
import { TESTIMONIALS_DATA } from '@/utils/constants';
import { translations } from '@/locales/translations';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';

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
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (externalLang) setLang(externalLang);
  }, [externalLang]);

  const testimonials: TestimonialData[] = TESTIMONIALS_DATA;
  const displayTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const t = translations.testimonials;

  // Initialize scroll to middle set
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = 450 + 32;
      container.scrollLeft = cardWidth * testimonials.length;
    }
  }, [testimonials.length]);

  const handleInfiniteScroll = useCallback(() => {
    if (!scrollContainerRef.current || isAnimating.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = 450 + 32;
    const totalContentWidth = cardWidth * testimonials.length;

    if (container.scrollLeft >= totalContentWidth * 2) {
      container.scrollTo({ left: totalContentWidth, behavior: 'auto' });
    } else if (container.scrollLeft <= 0) {
      container.scrollTo({ left: totalContentWidth, behavior: 'auto' });
    }
  }, [testimonials.length]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current && !isAnimating.current) {
      isAnimating.current = true;
      const container = scrollContainerRef.current;
      const cardWidth = 450 + 32;
      const scrollAmount = cardWidth;

      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });

      // Wait for smooth scroll to finish before allowing resets or new scrolls
      setTimeout(() => {
        isAnimating.current = false;
        handleInfiniteScroll();
      }, 600); // 600ms covers standard browser smooth scroll duration
    }
  };

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const renderPhoto = (item: TestimonialData, size: 'sm' | 'lg' = 'sm') => {
    const isError = imgErrors[item.id];
    const containerClasses = size === 'sm'
      ? "w-20 h-20 rounded-2xl shadow-lg border-4 border-white overflow-hidden flex-shrink-0 bg-white"
      : "w-48 h-48 md:w-64 md:h-64 rounded-[3rem] shadow-2xl border-8 border-white overflow-hidden flex-shrink-0 bg-white";

    if (item.photoUrl && !isError) {
      return (
        <div className={containerClasses}>
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
        <span className={`${size === 'sm' ? 'text-3xl' : 'text-7xl'} font-black tracking-tighter`}>
          {item.initials}
        </span>
      </div>
    );
  };

  return (
    <section className="py-24 bg-yellow-500 overflow-hidden rounded-[4rem] my-12 mx-4 md:mx-12 shadow-2xl relative">
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      ` }} />

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <SectionHeader 
            title={t?.title?.[lang] || 'Student Voices'} 
            subtitle="Real stories from our students and alumni"
            className="text-white !mb-0"
          />
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="p-4 bg-white/10 hover:bg-white text-white hover:text-yellow-600 rounded-2xl border border-white/20 transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-4 bg-white/10 hover:bg-white text-white hover:text-yellow-600 rounded-2xl border border-white/20 transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Side-by-Side Horizontal Scroll */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleInfiniteScroll}
          className="flex overflow-x-auto gap-8 pb-12 hide-scrollbar snap-x scroll-smooth -mx-4 px-4 flex-nowrap"
        >
          {displayTestimonials.map((item, index) => (
            <Card 
              key={`${item.id}-${index}`}
              className="flex-shrink-0 w-[350px] md:w-[450px] group relative overflow-hidden border-none shadow-2xl bg-white/10 backdrop-blur-md rounded-[3rem] p-10 snap-center transition-all duration-500 hover:bg-white/20 hover:-translate-y-2"
              onClick={() => setSelected(item)}
            >
              <Quote className="absolute top-10 right-10 h-12 w-12 text-white/10 group-hover:text-white/20 transition-colors" />
              
              <div className="flex items-center gap-6 mb-8">
                {renderPhoto(item, 'sm')}
                <div>
                  <h3 className="text-2xl font-black text-white leading-tight uppercase italic tracking-tighter">
                    {item.name}
                  </h3>
                  <p className="text-yellow-200 text-xs font-black uppercase tracking-[0.2em]">
                    {item.role}
                  </p>
                </div>
              </div>

              <div className="relative">
                <p className="text-white/90 font-bold text-lg leading-relaxed italic line-clamp-4 mb-8">
                  "{item.text[lang]}"
                </p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelected(item); }}
                  className="flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest hover:text-yellow-200 transition-colors group/btn"
                >
                  <span className="border-b-2 border-yellow-200 pb-1">{t?.readMore?.[lang] || 'Read More'}</span>
                  <Maximize2 className="h-4 w-4 group-hover/btn:scale-125 transition-transform" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Full Screen Modal */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-2xl" onClick={() => setSelected(null)} />
          
          <div className="relative w-full max-w-5xl bg-yellow-500 rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setSelected(null)}
              className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all z-10"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="md:w-2/5 p-12 flex flex-col items-center justify-center text-center bg-white/5">
              <div className="relative">
                <div className="absolute -inset-8 bg-white/20 rounded-full blur-3xl animate-pulse" />
                {renderPhoto(selected, 'lg')}
              </div>
              <h3 className="text-4xl font-black text-white mt-12 mb-2 tracking-tighter uppercase italic">
                {selected.name}
              </h3>
              <p className="text-yellow-100 font-black uppercase tracking-[0.3em] text-sm">
                {selected.role}
              </p>
            </div>

            <div className="flex-1 p-12 md:p-20 flex flex-col justify-center relative overflow-y-auto">
              <Quote className="absolute top-12 left-12 h-32 w-32 text-white/5 -z-10" />
              <p className="text-2xl md:text-4xl font-bold text-white italic leading-tight mb-8">
                {selected.text[lang]}
              </p>
              <div className="h-2 w-24 bg-white rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-black/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};

export default Testimonials;
