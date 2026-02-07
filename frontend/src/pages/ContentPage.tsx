import React, { useEffect } from 'react';
import { PageView } from '@shared/types';
import type { Language } from '@shared/types';
import AboutSection from '@/features/home/AboutSection';
import AdmissionSection from '@/features/admissions/AdmissionSection';
import CurriculumSection from '@/features/home/CurriculumSection';
import ContactSection from '@/features/home/ContactSection';

interface ContentPageProps {
  view: PageView;
  onNavigate?: (view: PageView) => void;
  lang: Language;
}

const ContentPage: React.FC<ContentPageProps> = ({ view, onNavigate, lang }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderContent = () => {
    switch (view) {
      case PageView.ABOUT:
        return <AboutSection lang={lang} />;
      case PageView.ADMISSION:
        return <AdmissionSection lang={lang} onNavigate={onNavigate} />;
      case PageView.CURRICULUM:
        return <CurriculumSection lang={lang} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderContent()}
      <ContactSection lang={lang} />
    </div>
  );
};

export default ContentPage;
