
import React, { useState, useEffect } from 'react';
import { Quote, X, MessageSquareQuote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '@shared/types';
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

const testimonials: TestimonialData[] = TESTIMONIALS_DATA;
const teachers: TestimonialData[] = TEACHERS_DATA;

const Testimonials: React.FC<{ externalLang?: Language }> = ({ externalLang }) => {
  const [lang, setLang] = useState<Language>(externalLang || 'en');
  const [selected, setSelected] = useState<TestimonialData | null>(null);
  const [activeCategory, setActiveCategory] = useState<'student' | 'teacher' | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (externalLang) setLang(externalLang);
  }, [externalLang]);

  const handleImageError = (id: number) => {
    setImgErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (!selected || !activeCategory) return;
    
    const currentList = activeCategory === 'teacher' ? teachers : testimonials;
    const currentIndex = currentList.findIndex(t => t.id === selected.id);
    
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % currentList.length;
    } else {
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
        <div className={`${containerClasses} bg-slate-100`}>
          <img 
            src={item.photoUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
            onError={() => handleImageError(item.id)}
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

      <h3 className="font-black text-xl text-slate-900 mb-2 leading-tight tracking-tight group-hover:text-yellow-600 transition-colors line-clamp-1">
        {item.name}
      </h3>
      <p className="text-[10px] font-black text-yellow-600 uppercase tracking-[0.2em] mb-6 bg-yellow-50 px-4 py-1 rounded-full line-clamp-1">
        {item.role}
      </p>
      
      <div className="flex-grow flex flex-col justify-between w-full">
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-5 italic mb-6 font-medium">
          "{item.text[lang]}"
        </p>
        <div className="mt-auto pt-6 border-t border-slate-50 w-full">
          <span className="text-xs font-black text-slate-300 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
             {t.readMore[lang]}
          </span>
        </div>
      </div>
    </Card>
  );

  return (
    <section className="py-32 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90 border-b border-slate-800 relative overflow-hidden backdrop-blur-sm">
      {/* Decorative Corner Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 w-[1000px] h-[1000px] bg-slate-400/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-[120px] pointer-events-none"></div>
      
      <div className="w-full relative z-10 space-y-24">
        
        {/* Students Slideshow (Left Direction) */}
        <div className="overflow-hidden">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="bg-yellow-500 px-10 py-4 rounded-[3rem] inline-flex items-center gap-4 shadow-xl mb-6">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                {t.title[lang]}
              </h2>
            </div>
          </div>
          
          <div className="relative w-full">
            <div className="flex animate-scroll hover:pause-scroll w-max">
              {[...testimonials, ...testimonials, ...testimonials].map((item, idx) => (
                <div key={`${item.id}-${idx}`}>
                   {renderCard(item, 'student')}
                </div>
              ))}
            </div>
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>

        {/* Teachers Slideshow (Right Direction) */}
        <div className="overflow-hidden">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="bg-green-600 px-10 py-4 rounded-[3rem] inline-flex items-center gap-4 shadow-xl mb-6">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                {t.teachersTitle[lang]}
              </h2>
            </div>
          </div>
          
          <div className="relative w-full">
            <div className="flex animate-scroll-reverse hover:pause-scroll w-max">
              {[...teachers, ...teachers, ...teachers, ...teachers].map((item, idx) => (
                <div key={`t-${item.id}-${idx}`}>
                   {renderCard(item, 'teacher')}
                </div>
              ))}
            </div>
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>
          </div>
        </div>

      </div>

      {/* Testimonial Modal */}
      {selected && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/95 backdrop-blur-2xl p-6 animate-in fade-in duration-500">
          <div className="relative w-full max-w-5xl flex items-center gap-4 md:gap-8">
            {/* Previous Button */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate('prev');
              }}
              variant="outline"
              icon={ChevronLeft}
              className="hidden md:flex p-6 bg-white/10 hover:bg-white/20 border-none text-white rounded-full transition-all hover:scale-110 active:scale-90"
            />

            <div className="bg-white rounded-[5rem] flex-1 overflow-hidden shadow-[0_0_120px_rgba(0,0,0,0.6)] relative animate-in zoom-in duration-500">
              <Button 
                onClick={() => {
                  setSelected(null);
                  setActiveCategory(null);
                }} 
                variant="outline"
                icon={X}
                className="absolute top-8 right-8 md:top-12 md:right-12 p-4 md:p-6 bg-slate-100 hover:bg-slate-200 rounded-full z-10 hover:rotate-90 hover:scale-110 active:scale-90 shadow-lg border-none"
              />

              <div className="p-10 md:p-24">
                 <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14 mb-10 md:mb-16">
                    {renderPhoto(selected, 'lg')}
                    <div className="text-center md:text-left">
                      <h4 className="text-3xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4 leading-tight">{selected.name}</h4>
                      <p className="text-base md:text-lg font-black text-yellow-600 uppercase tracking-[0.4em] bg-yellow-50 inline-block px-6 py-2 rounded-2xl">{selected.role}</p>
                    </div>
                 </div>

                 <div className="relative">
                    <MessageSquareQuote className="absolute -top-16 -left-16 md:-top-20 md:-left-20 w-32 h-32 md:w-40 md:h-40 text-slate-100 opacity-30" />
                    <p className="text-xl md:text-4xl text-slate-700 leading-[1.6] font-serif italic relative z-10 px-4 md:px-6 max-h-[35vh] overflow-y-auto">
                      "{selected.text[lang]}"
                    </p>
                 </div>

                 <div className="mt-12 md:mt-20 pt-10 md:pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 text-slate-400 font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">
                    <span className="flex items-center gap-4">
                      <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(234,179,8,0.5)]"></div>
                      {t.institution[lang]}
                    </span>
                    
                    {/* Mobile Navigation */}
                    <div className="flex md:hidden items-center gap-8">
                      <Button
                        onClick={() => handleNavigate('prev')}
                        variant="outline"
                        icon={ChevronLeft}
                        className="p-4 bg-slate-100 rounded-full border-none"
                      />
                      <Button
                        onClick={() => handleNavigate('next')}
                        variant="outline"
                        icon={ChevronRight}
                        className="p-4 bg-slate-100 rounded-full border-none"
                      />
                    </div>

                    <div className="hidden md:block h-2 w-32 bg-slate-900 rounded-full opacity-20"></div>
                 </div>
              </div>
            </div>

            {/* Next Button */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleNavigate('next');
              }}
              variant="outline"
              icon={ChevronRight}
              className="hidden md:flex p-6 bg-white/10 hover:bg-white/20 border-none text-white rounded-full transition-all hover:scale-110 active:scale-90"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
