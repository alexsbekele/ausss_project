import React from 'react';
import HomePage from '@/features/home/homepage';
import AusssInSport from '@/components/AusssInSport';
import AusssInCreativity from '@/components/AusssInCreativity';
import Testimonials from '@/features/home/Testimonials';
import Teachers from '@/features/home/TeachersSection';
import { PageView } from '@shared/types';
import type { User, Language, Announcement } from '@shared/types';
import { translations } from '@/locales/translations';
import Button from '@/components/ui/Button';

interface HomeViewProps {
  lang: Language;
  latestAnnouncements: Announcement[];
  currentUser: User | null;
  onNavigate: (view: PageView) => void;
  onLoginClick: () => void;
  onDeleteAnnouncement: (id: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ 
  lang, 
  //latestAnnouncements, 
  currentUser, 
  onNavigate, 
  onLoginClick,
  //onDeleteAnnouncement 
}) => {
  // const t = translations.home;
  const common = translations.common;

  return (
    <>
      <HomePage lang={lang} />
      <AusssInSport lang={lang} />
      <AusssInCreativity lang={lang} />
      <Teachers externalLang={lang} />
      
      <Testimonials />
      
      {/* Latest Announcements section commented out */}

      {/* CTA Section for Apply and Member Portal */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button 
              onClick={() => onNavigate(PageView.ADMISSION)}
              variant="primary"
              className="bg-yellow-500 hover:bg-yellow-600 px-16 py-7 text-3xl rounded-[2.5rem]"
            >
              {common.applyNow[lang]}
            </Button>
            {!currentUser && (
              <Button 
                onClick={onLoginClick}
                variant="primary"
                className="bg-yellow-500 hover:bg-slate-800 px-16 py-7 text-3xl rounded-[2.5rem]"
              >
                {common.portalBtn[lang]}
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeView;