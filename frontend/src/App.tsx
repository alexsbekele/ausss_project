import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import AdmissionRegistration from '@/features/admissions/AdmissionRegistration';
import ContentPage from '@/pages/ContentPage';
import Announcements from '@/features/announcements/Announcements';
import UserDashboard from '@/pages/UserDashboard';
import LoginModal from '@/components/LoginModal';
import HomeView from '@/features/home/HomeView';
import { PageView, User, Language, Announcement } from '@shared/types';
import { ApiService } from '@/services/apiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<PageView>(PageView.HOME);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [lang, setLang] = useState<Language>('en');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [latestAnnouncements, setLatestAnnouncements] = useState<Announcement[]>([]);

  const loadLatestAnnouncements = async () => {
    const all = await ApiService.getAnnouncements();
    setLatestAnnouncements(all.filter(a => a.isActive).slice(0, 3));
  };

  useEffect(() => {
    loadLatestAnnouncements();
  }, [currentView]);

  const handleDeleteAnnouncement = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      await ApiService.deleteAnnouncement(id);
      loadLatestAnnouncements();
    }
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setIsLoginModalOpen(false);
    setCurrentView(PageView.ADMIN);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView(PageView.HOME);
  };

  const renderView = () => {
    if (currentUser && currentView === PageView.ADMIN) {
      return <UserDashboard currentUser={currentUser} onLogout={handleLogout} lang={lang} />;
    }

    switch (currentView) {
      case PageView.HOME:
        return (
          <HomeView 
            lang={lang}
            latestAnnouncements={latestAnnouncements}
            currentUser={currentUser}
            onNavigate={setCurrentView}
            onLoginClick={() => setIsLoginModalOpen(true)}
            onDeleteAnnouncement={handleDeleteAnnouncement}
          />
        );
      case PageView.ANNOUNCEMENTS:
        return <Announcements lang={lang} currentUser={currentUser} />;
      case PageView.ADMISSION:
        return <ContentPage view={PageView.ADMISSION} onNavigate={setCurrentView} lang={lang} />;
      case PageView.ADMISSION_REGISTER:
        return <AdmissionRegistration onCancel={() => setCurrentView(PageView.ADMISSION)} lang={lang} />;
      default:
        return <ContentPage view={currentView} onNavigate={setCurrentView} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-yellow-200">
      <Navbar 
        currentUser={currentUser} 
        onNavigate={setCurrentView} 
        onLogin={() => setIsLoginModalOpen(true)} 
        onLogout={handleLogout} 
        onLanguageChange={setLang}
        currentView={currentView} 
        lang={lang} 
      />
      <main className="flex-grow">{renderView()}</main>
      {isLoginModalOpen && <LoginModal lang={lang} onClose={() => setIsLoginModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
      <footer className={`bg-slate-900 text-white py-24 mt-auto border-t border-slate-800 ${currentView === PageView.ADMIN ? 'py-32' : ''}`}>
         <div className="max-w-[1600px] mx-auto px-6 grid md:grid-cols-2 gap-12 text-center md:text-left items-center">
            <div className="flex items-center justify-center md:justify-start">
               <div className={`bg-white p-1 rounded-2xl mr-6 flex items-center justify-center overflow-hidden ${currentView === PageView.ADMIN ? 'w-24 h-24' : 'w-16 h-16'}`}>
                 <img src="/images/logo.jpg" className="w-full h-full object-contain" alt="AUSSS Logo" />
               </div>
               <h3 className={`font-black tracking-tighter ${currentView === PageView.ADMIN ? 'text-6xl' : 'text-4xl'}`}>AUSSS</h3>
            </div>
            <p className={`text-white font-bold ${currentView === PageView.ADMIN ? 'text-3xl' : 'text-xl'}`}>© {new Date().getFullYear()} Ambo University Special Secondary School. All rights reserved.</p>
         </div>
      </footer>
    </div>
  );
};

export default App;
 