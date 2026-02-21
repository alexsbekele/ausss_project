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
  const t = translations.home;
  const common = translations.common;

  return (
    <>
      <HomePage lang={lang} />
      <AusssInSport lang={lang} />
      <AusssInCreativity lang={lang} />
      <Teachers externalLang={lang} />
      
      <Testimonials externalLang={lang} />
      

      {/* {latestAnnouncements.length > 0 && (
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
              <div className="w-full lg:w-1/3 xl:w-1/4 sticky top-24">
                <div className="relative">
                  <div className="absolute -inset-4 bg-yellow-400/20 rounded-[3rem] blur-2xl -z-10 animate-pulse" />
                  <img 
                    src="/images/announcement.png" 
                    className="w-full h-auto rounded-[3rem] shadow-2xl border-8 border-white object-cover aspect-[4/5]" 
                    alt="Latest News" 
                  />
                  <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-8 rounded-3xl shadow-2xl hidden xl:block">
                    <p className="text-3xl font-black text-yellow-400">AUSSS</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Updates</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 w-full">
                <SectionHeader 
                  title={t.latestNews[lang]} 
                  subtitle={t.newsSubtitle[lang]}
                >
                  <Button 
                    variant="outline"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => onNavigate(PageView.ANNOUNCEMENTS)}
                  >
                    {common.viewAll[lang]}
                  </Button>
                </SectionHeader>
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {latestAnnouncements.map(ann => (
                    <Card key={ann.id} className="flex flex-col relative group min-h-[400px] bg-slate-50">
                      {currentUser?.role === 'admin' && (
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteAnnouncement(ann.id);
                          }}
                          variant="danger"
                          icon={Trash2}
                          className="absolute top-6 right-6 p-3 bg-red-50 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white shadow-sm z-10 border-none"
                          title="Delete Announcement"
                        />
                      )}
                      <div className="flex items-center gap-3 mb-6 text-xs font-black text-slate-400 uppercase tracking-widest">
                        <Calendar className="text-yellow-500" /> {new Date(ann.datePosted).toLocaleDateString()}
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-4 line-clamp-2 leading-tight group-hover:text-yellow-600 transition-colors">{ann.title}</h3>
                      <p className="text-slate-500 font-bold mb-8 line-clamp-4 leading-relaxed flex-grow">{ann.content}</p>
                      <Button 
                        variant="outline"
                        fullWidth
                        size="sm"
                        className="bg-white"
                        onClick={() => onNavigate(PageView.ANNOUNCEMENTS)}
                      >
                        {common.readDetails[lang]}
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )} */}

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
