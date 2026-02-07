
import React, { useState } from 'react';
import type { User } from '@shared/types';
import { 
  Mail, UserPlus, Users, 
  Rss, UserCircle, Target, ClipboardList, Activity, LogOut, ArrowLeft, Megaphone, Globe
} from 'lucide-react';
import SocialFeed from '@/features/social/SocialFeed';
import AlumniProfile from '@/features/alumni/AlumniProfile';
import AdminPanel from '@/pages/AdminPanel';
import { translations } from '@/locales/translations';
import Button from '@/components/ui/Button';

interface UserDashboardProps {
  currentUser: User;
  onLogout: () => void;
  lang: 'en' | 'am' | 'om';
}

const getTabs = (t: any, lang: 'en' | 'am' | 'om', currentUser: User) => {
  const tabs = [
    { id: 'posts', label: t.posts[lang], icon: Globe },
    { id: 'profile', label: t.profile[lang], icon: UserCircle },
  ];

  if (currentUser.role === 'admin' || currentUser.role === 'teacher') {
    tabs.splice(1, 0, 
      { id: 'announcements_admin', label: t.announcements[lang], icon: Megaphone },
      { id: 'registration', label: t.registration[lang], icon: UserPlus },
      { id: 'community', label: t.community[lang], icon: Users }
    );
  } else {
    tabs.splice(1, 0, { id: 'community', label: t.community[lang], icon: Users });
  }

  if (currentUser.role === 'admin') {
    tabs.splice(tabs.length - 1, 0, 
      { id: 'admission_score', label: t.admissionScore[lang], icon: Target },
      { id: 'applicants', label: t.applicants[lang], icon: ClipboardList }
    );
  }

  return tabs;
};

const UserDashboard: React.FC<UserDashboardProps> = ({ currentUser, onLogout, lang }) => {
  const isAdmin = currentUser.role === 'admin';
  const isTeacher = currentUser.role === 'teacher';
  const t = translations.dashboard;
  
  // activeTab tracks which top-level nav button is highlighted
  const [activeTab, setActiveTab] = useState('posts');
  // detailViewId tracks if we are looking at a specific person's profile within a tab
  const [detailViewId, setDetailViewId] = useState<string | null>(null);

  const tabs = getTabs(t, lang, currentUser);

  const handleViewProfile = (userId: string) => {
    if (activeTab === 'profile' && userId === currentUser.uid) {
        setDetailViewId(null);
    } else {
        setDetailViewId(userId);
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setDetailViewId(null);
  };

  const renderContent = () => {
    if (detailViewId && activeTab !== 'profile') {
      const activeTabLabel = tabs.find(t => t.id === activeTab)?.label || 'Back';
      return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
          <Button 
            onClick={() => setDetailViewId(null)}
            variant="outline"
            icon={ArrowLeft}
            className="px-8 py-4 bg-white border-2 border-slate-200 rounded-2xl font-black text-slate-900 hover:border-slate-900 transition-all shadow-sm active:scale-95 group"
          >
            {t.backTo[lang]} {activeTabLabel}
          </Button>
          <AlumniProfile profileId={detailViewId} currentUser={currentUser} lang={lang} />
        </div>
      );
    }

    switch (activeTab) {
      case 'posts':
        return <SocialFeed currentUser={currentUser} onViewProfile={handleViewProfile} />;
      case 'profile':
        return <AlumniProfile profileId={currentUser.uid} currentUser={currentUser} lang={lang} />;
      case 'announcements_admin':
      case 'registration':
      case 'community':
      case 'admission_score':
      case 'applicants':
        return <AdminPanel forceTab={activeTab as any} onViewProfile={handleViewProfile} isAdmin={isAdmin} lang={lang} />;
      default:
        return <div className="p-20 text-center font-bold text-slate-300">Section Under Construction</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200 pt-16 pb-8 px-6 sm:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
            <div>
              <h2 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter mb-2">
                Portal Dashboard
              </h2>
              <div className="flex items-center gap-4">
                <span className="text-2xl text-slate-900 font-black">Welcome back, {currentUser.name}</span>
                <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${
                  isAdmin ? 'bg-red-500 text-white' : isTeacher ? 'bg-blue-600 text-white' : 'bg-yellow-500 text-slate-900'
                }`}>
                  {currentUser.role.toUpperCase()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
                <Button 
                  onClick={onLogout}
                  variant="danger"
                  icon={LogOut}
                  className="px-10 py-6 text-2xl rounded-[3rem] shadow-xl"
                >
                  <span className="uppercase tracking-tighter">{t.logout[lang]}</span>
                </Button>
            </div>
          </div>

          <div className="flex space-x-6 overflow-x-auto pb-4 no-scrollbar">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                variant={activeTab === tab.id ? 'primary' : 'outline'}
                icon={tab.icon}
                className={`px-10 py-6 rounded-[2.5rem] whitespace-nowrap text-2xl ${
                  activeTab === tab.id
                    ? 'shadow-2xl border-b-4 border-yellow-400'
                    : 'bg-white text-slate-300 border-slate-100 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 mt-12">
        {renderContent()}
      </div>
    </div>
  );
};

export default UserDashboard;
