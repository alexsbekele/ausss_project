import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import type { Language } from '@shared/types';

interface AusssInSportProps {
  lang: Language;
}

const AusssInSport: React.FC<AusssInSportProps> = ({ lang }) => {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);

  const sportImages = [
    '/images/sport1.png', 
    '/images/sport2.png',
    '/images/sport3.png',
    '/images/sport4.png',
  ];

  return (
    <section className="py-24 bg-yellow-500 overflow-hidden rounded-[2.5rem]">
      <div className="max-w-[1600px] mx-auto px-6">
        {/* Section Title */}
        <SectionHeader 
          title="WE IN SPORT FESTIVALS" 
          subtitle="We know to play,  we know to win!"
        />
        
        {/* Images Grid: 2 Left, 2 Right on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {sportImages.map((src, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedImage(src)}
              className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl border-8 border-white bg-white aspect-[4/5] transform transition-all duration-500 hover:-translate-y-4 hover:rotate-2 cursor-pointer"
            >
              <img 
                src={src} 
                alt={`Sport Event ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
              />
              {/* Decorative Overlay */}
             {/*} <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white font-black text-xl italic tracking-tighter">AUSSS PRIDE</p>
              </div>*/}
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal/Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-slate-900/95 z-[100] flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
            <img 
              src={selectedImage} 
              className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl border-4 border-white/10"
              alt="Preview"
            />
            <button 
              className="absolute top-0 right-0 m-4 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AusssInSport;
