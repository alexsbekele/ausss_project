import React from 'react';
import { Microscope, Globe, Languages } from 'lucide-react';
import type { Language } from '@shared/types';
import { translations } from '@/locales/translations';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';

interface CurriculumSectionProps {
  lang: Language;
}

const CurriculumSection: React.FC<CurriculumSectionProps> = ({ lang }) => {
  const t = translations.curriculum;

  const curriculumData = [
    {
      id: 'stem',
      title: t.enrichedTitle[lang],
      desc: t.naturalScienceDesc[lang],
      image: '/images/natural_scince_and_STEM.png',
      icon: <Microscope className="w-8 h-8 text-slate-900" />,
      iconBg: 'bg-yellow-400',
      reverse: false
    },
    {
      id: 'language',
      title: t.languageTitle[lang],
      desc: t.academicLanguageDesc[lang],
      image: '/images/dessalegn_getachew.png',
      icon: <Globe className="w-8 h-8 text-white" />,
      iconBg: 'bg-blue-600',
      reverse: true
    },
    {
      id: 'leadership',
      title: t.globalTitle[lang],
      desc: t.globalLeadershipDesc[lang],
      image: '/images/french_and_chinese.png',
      icon: <Languages className="w-8 h-8 text-white" />,
      iconBg: 'bg-indigo-600',
      reverse: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
      <SectionHeader title={t.title[lang]} className="justify-center text-center" />
      
      <div className="space-y-16">
        {curriculumData.map((section) => (
          <Card 
            key={section.id}
            className={`flex flex-col ${section.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-0 p-0 overflow-hidden border-slate-100 hover:translate-y-[-8px]`}
          >
            <div className="w-full lg:w-1/2 h-[450px] overflow-hidden bg-white">
              <img 
                src={section.image} 
                alt={section.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="w-full lg:w-1/2 p-12 lg:p-20 space-y-8">
              <div className={`inline-flex p-5 ${section.iconBg} rounded-3xl shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-500`}>
                {section.icon}
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {section.title}
                </h3>
                <p className="text-xl text-slate-500 leading-relaxed font-bold">
                  {section.desc}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CurriculumSection;
