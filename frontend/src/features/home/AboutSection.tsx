import React from 'react';
import { Users } from 'lucide-react';
import type { Language } from '@shared/types';
import { ADMIN_MEMBERS } from '@/utils/constants';
import { translations } from '@/locales/translations';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';

interface AboutSectionProps {
  lang: Language;
}

const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const t = translations.about;

  return (
    <>
      <div className="relative mb-20 h-[60vh] w-full overflow-hidden group">
        <img 
          src="/images/about_us.png" 
          alt="About AUSSS"
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter drop-shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
              {t.title[lang]}
            </h2>
            <div className="h-2 w-24 bg-yellow-400 mx-auto mt-6 rounded-full animate-in zoom-in duration-1000 delay-300"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <div className="prose lg:prose-2xl text-gray-600 mb-20 max-w-none">
          <SectionHeader title={t.objTitle[lang]} />
          <p className="text-2xl text-slate-700 leading-relaxed font-medium">
            {t.objDesc1[lang]}
          </p>
        </div>
        
        <div className="bg-slate-50 p-12 md:p-20 rounded-[3rem] shadow-sm border border-slate-100 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black text-slate-900 inline-flex items-center gap-4">
              <Users className="text-yellow-500 w-12 h-12" /> {t.adminTitle[lang]}
            </h3>
          </div>
          
          <div className="space-y-16">
            {ADMIN_MEMBERS.map((member, index) => (
              <Card 
                key={member.id}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-0 p-0 overflow-hidden border-slate-100 hover:translate-y-[-8px] group`}
              >
                <div className="w-full lg:w-1/2 h-[400px] overflow-hidden bg-white flex items-center justify-center">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="w-full lg:w-1/2 p-12 lg:p-20 space-y-8 text-center lg:text-left">
                  <div className="space-y-4">
                    <h4 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                      {member.name}
                    </h4>
                    <p className="text-xl text-yellow-600 font-black uppercase tracking-[0.2em]">
                      {member.role}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
