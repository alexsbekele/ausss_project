
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '@shared/types';
import { translations } from '@/locales/translations';
import Button from '@/components/ui/Button';

// TO USE YOUR OWN IMAGES: Place these files in your root folder
const SLIDE_IMAGES = [
  "/images/gate_of_the_campus.jpg",
  "/images/stem_of_au.jpg",
  "/images/teachers.jpg",
  "/images/class_of_2024.jpg"
];

interface TopStudentsProps {
  lang: Language;
}

const TopStudents: React.FC<TopStudentsProps> = ({ lang }) => {
  const t = translations.home;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === SLIDE_IMAGES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? SLIDE_IMAGES.length - 1 : prev - 1));
  };

  useEffect(() => {
    let interval: number;
    if (isAutoPlaying) {
      interval = window.setInterval(nextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-900 group">
      {/* Slides */}
      {SLIDE_IMAGES.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt={`Slide ${idx}`}
            className="w-full h-full object-cover scale-105"
            onError={(e) => {
              // Fallback if local image is missing
              const fallbackUrls = [
                "https://images.unsplash.com/photo-1523240635656-9af00a729659?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1524178232363-1fb28f74b55a?q=80&w=2070&auto=format&fit=crop"
              ];
              (e.target as HTMLImageElement).src = fallbackUrls[idx % fallbackUrls.length];
            }}
          />
          {/* Subtler Uniform Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}

      {/* Content Overlay - Merged Hero Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 max-w-[1600px] mx-auto w-full">
            <h1 className="text-6xl font-black tracking-tighter sm:text-9xl mb-2 leading-[0.85] text-white drop-shadow-2xl">
              {t.heroTitle[lang]} <br/><span className="text-yellow-400">{t.heroSubtitle[lang]}</span>
            </h1>
            <p className="text-2xl md:text-5xl text-white/95 max-w-5xl mx-auto font-serif font-bold italic drop-shadow-xl mt-4">
              {t.motto[lang]}
            </p>
            <div className="mt-12 flex gap-4 justify-center">
                <div className="h-2 w-48 bg-yellow-500 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.6)]"></div>
            </div>
        </div>
      </div>

      {/* Controls */}
      <Button
        onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
        variant="outline"
        icon={ChevronLeft}
        className="absolute left-8 top-1/2 -translate-y-1/2 p-6 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full text-white opacity-0 group-hover:opacity-100 z-20 border-white/10 hover:scale-110 active:scale-90"
      />
      <Button
        onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
        variant="outline"
        icon={ChevronRight}
        className="absolute right-8 top-1/2 -translate-y-1/2 p-6 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full text-white opacity-0 group-hover:opacity-100 z-20 border-white/10 hover:scale-110 active:scale-90"
      />

      {/* Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {SLIDE_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => { setCurrentIndex(idx); setIsAutoPlaying(false); }}
            className={`h-3 rounded-full transition-all duration-500 ${
              idx === currentIndex 
                ? 'bg-yellow-500 w-16 shadow-[0_0_15px_rgba(234,179,8,0.6)]' 
                : 'bg-white/20 w-3 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default TopStudents;
