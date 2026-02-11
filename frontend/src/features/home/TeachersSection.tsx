import React, { useState, useEffect, useRef } from 'react'; 
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

  useEffect(() => { 
    if (externalLang) setLang(externalLang); 
  }, [externalLang]); 

  const displayTeachers = TEACHERS_DATA && TEACHERS_DATA.length > 0 
    ? [...TEACHERS_DATA, ...TEACHERS_DATA, ...TEACHERS_DATA] 
    : []; 
  
  const t = translations.testimonials; 

  // Corrected to show the WHOLE image using object-contain
  const renderPhoto = (item: TeacherData) => { 
    const isError = imgErrors[item.id]; 
    const containerClasses = "absolute inset-0 w-full h-full z-0 flex items-center justify-center bg-slate-100"; 

    if (item.photoUrl && !isError) { 
      return ( 
        <div className={containerClasses}> 
          <img 
            src={item.photoUrl} 
            alt={item.name} 
            className="w-full h-full object-contain" 
            onError={() => setImgErrors(prev => ({ ...prev, [item.id]: true }))} 
          /> 
        </div> 
      ); 
    } 

    return ( 
      <div className={`${containerClasses} ${item.color}`}> 
        <span className="text-9xl font-black text-white/20"> 
          {item.initials} 
        </span> 
      </div> 
    ); 
  }; 

  const scroll = (direction: 'left' | 'right') => { 
    if (scrollContainerRef.current) { 
      const container = scrollContainerRef.current; 
      const scrollAmount = 480 + 40; 
      container.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      }); 
    } 
  }; 

  const handleNavigate = (direction: 'next' | 'prev') => {
    if (!selected) return;
    const currentList = TEACHERS_DATA; 
    const currentIndex = currentList.findIndex(t => t.id === selected.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % currentList.length;
    } else {
      nextIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    }
    setSelected(currentList[nextIndex]);
  };

  return ( 
    <section className="py-24 bg-blue-600 overflow-hidden rounded-[4rem] my-12 mx-4 md:mx-12 shadow-2xl relative"> 
      <style dangerouslySetInnerHTML={{ __html: ` 
        .hide-scrollbar::-webkit-scrollbar { display: none; } 
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } 

        @keyframes scroll-reverse {
          0% { transform: translateX(calc(-${(480 + 40) * TEACHERS_DATA.length}px)); }
          100% { transform: translateX(0); }
        }

        .animate-scroll-reverse {
          animation: scroll-reverse ${TEACHERS_DATA.length * 8}s linear infinite;
        }

        .pause-on-hover:hover {
          animation-play-state: paused;
        }
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
              className="p-4 bg-white/10 hover:bg-white text-blue-600 rounded-2xl border border-white/20 transition-all duration-300" 
            > 
              <ChevronLeft className="h-6 w-6" /> 
            </button> 
            <button 
              onClick={() => scroll('right')} 
              className="p-4 bg-white/10 hover:bg-white text-blue-600 rounded-2xl border border-white/20 transition-all duration-300" 
            > 
              <ChevronRight className="h-6 w-6" /> 
            </button> 
          </div> 
        </div> 

        <div className="overflow-hidden">
          <div 
            ref={scrollContainerRef} 
            className="flex gap-10 pb-12 animate-scroll-reverse pause-on-hover w-max min-h-[550px]" 
          > 
            {displayTeachers.map((item, index) => ( 
              <Card 
                key={`${item.id}-${index}`} 
                className="bg-slate-900/40 flex-shrink-0 w-[380px] md:w-[480px] group relative overflow-hidden border-none shadow-2xl backdrop-blur-xl rounded-[3.5rem] p-0 transition-all duration-500 hover:-translate-y-3 cursor-pointer" 
                onClick={() => setSelected(item)} 
              > 
                {/* 1. TOP SECTION: WHOLE IMAGE DISPLAY */}
                <div className="relative h-[320px] w-full overflow-hidden bg-white">
                  {renderPhoto(item)}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                  
                  {/* TEXT OVERLAY */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 z-20"> 
                    <h3 className="text-4xl font-black text-white leading-tight uppercase italic tracking-tighter"> 
                      {item.name} 
                    </h3> 
                    <p className="text-blue-300 text-sm font-black uppercase tracking-[0.25em] mt-1"> 
                      {item.role} 
                    </p> 
                  </div> 
                </div> 

                {/* 2. BOTTOM SECTION: TEXT AND BUTTON */}
                <div className="p-10 text-center relative"> 
                  <GraduationCap className="absolute top-4 right-4 h-16 w-16 text-white/5" />
                  <p className="text-white/90 font-medium text-lg leading-relaxed line-clamp-2 mb-8 px-4"> 
                    {item.text[lang]} 
                  </p> 
                  <button className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest transition-all"> 
                    <span>Read More</span> 
                    <Maximize2 className="h-4 w-4" /> 
                  </button> 
                </div> 
              </Card> 
            ))} 
          </div> 
        </div>
      </div> 

      {/* Full Screen Modal */} 
      {selected && ( 
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"> 
          <div className="absolute inset-0 bg-blue-950/90 backdrop-blur-3xl" onClick={() => setSelected(null)} /> 
          
          <div className="relative w-full max-w-6xl bg-slate-50 rounded-[5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-500 max-h-[90vh]"> 
            
            {/* LEFT SIDE: WHOLE IMAGE FULL HEIGHT */}
            <div className="md:w-5/12 relative min-h-[400px] bg-white overflow-hidden border-r border-slate-200"> 
              {renderPhoto(selected)} 
            </div> 

            {/* RIGHT SIDE: CONTENT */}
            <div className="flex-1 p-16 md:p-24 flex flex-col justify-center relative bg-slate-50 overflow-y-auto"> 
              <button 
                onClick={() => setSelected(null)} 
                className="absolute top-10 right-10 p-5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-3xl transition-all z-10" 
              > 
                <X className="h-8 w-8" /> 
              </button> 

              {/* NAME INSTEAD OF ABOUT ME */}
              <h3 className="text-6xl font-black text-blue-900 mb-2 uppercase italic tracking-tighter"> 
                {selected.name} 
              </h3> 
              <p className="text-blue-600 font-black uppercase tracking-[0.4em] mb-12 text-lg"> 
                {selected.role} 
              </p> 

              <p className="text-2xl md:text-3xl font-bold text-slate-700 leading-relaxed mb-12"> 
                {selected.text[lang]} 
              </p> 

              {/* NAVIGATION */}
              <div className="flex gap-6 mt-auto">
                <button onClick={() => handleNavigate('prev')} className="flex-1 py-5 bg-blue-100 text-blue-600 rounded-3xl font-black uppercase tracking-widest hover:bg-blue-200 transition-all">Previous</button>
                <button onClick={() => handleNavigate('next')} className="flex-1 py-5 bg-blue-600 text-white rounded-3xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">Next Teacher</button>
              </div>
            </div> 
          </div> 
        </div> 
      )} 
    </section> 
  ); 
}; 

export default TeachersSection;