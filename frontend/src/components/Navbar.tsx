
import React, { useState } from 'react';
import { PageView } from '@shared/types';
import type { User, UserRole, Language } from '@shared/types';
import { Menu, X, User as LayoutDashboard, Globe } from 'lucide-react';
import { translations } from '@/locales/translations';
import Button from '@/components/ui/Button';

interface NavbarProps {
  currentUser: User | null;
  onNavigate: (view: PageView) => void;
  onLogin: (role: UserRole) => void;
  onLogout: () => void;
  onLanguageChange: (lang: Language) => void;
  currentView: PageView;
  lang: Language;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, onNavigate, onLogin, onLogout, onLanguageChange, currentView, lang }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const t = translations.navbar;

  const mainNavItems = [
    { label: t.home[lang], view: PageView.HOME },
    { label: t.about[lang], view: PageView.ABOUT },
    { label: t.admission[lang], view: PageView.ADMISSION },
    { label: t.curriculum[lang], view: PageView.CURRICULUM },
    { label: t.announcements[lang], view: PageView.ANNOUNCEMENTS },
  ];

  const handleNavClick = (view: PageView) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'am', label: 'አማርኛ' },
    { code: 'om', label: 'Afaan Oromoo' }
  ];

  const t_navbar = translations.navbar || {};
  const t_common = translations.common || {};

  return (
    <nav className="bg-slate-900 text-white shadow-2xl sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-10">
        <div className="flex justify-between h-20 sm:h-28">
          <div className="flex items-center cursor-pointer group" onClick={() => handleNavClick(PageView.HOME)}>
            {/* School Logo Section */}
            <div className="relative flex items-center">
              <div className="bg-white p-1 rounded-xl sm:rounded-2xl mr-3 sm:mr-5 group-hover:scale-110 transition-transform duration-300 shadow-xl overflow-hidden w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center">
                <img 
                  src="/images/logo.jpg" 
                  alt="AUSSS Logo" 
                  className="w-full h-full object-contain"
                  key={Date.now()}
                  onError={(e) => {
                    // Fallback to Icon if image is missing
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    const parent = img.parentElement;
                    if (parent && !parent.querySelector('svg')) {
                      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                      svg.setAttribute("class", "h-6 w-6 sm:h-10 sm:w-10 text-slate-900");
                      svg.setAttribute("viewBox", "0 0 24 24");
                      svg.setAttribute("fill", "none");
                      svg.setAttribute("stroke", "currentColor");
                      svg.setAttribute("stroke-width", "2");
                      svg.setAttribute("stroke-linecap", "round");
                      svg.setAttribute("stroke-linejoin", "round");
                      
                      const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                      path1.setAttribute("d", "M22 10v6M2 10l10-5 10 5-10 5z");
                      
                      const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
                      path2.setAttribute("d", "M6 12v5c3 3 9 3 12 0v-5");
                      
                      svg.appendChild(path1);
                      svg.appendChild(path2);
                      parent.appendChild(svg);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                  <span className="font-black text-lg sm:text-3xl tracking-tighter leading-none group-hover:text-yellow-400 transition-colors">Ambo University</span>
                  <span className="text-[10px] sm:text-base text-slate-400 font-bold tracking-wider mt-0.5 sm:mt-1 uppercase leading-none">Special School</span>
              </div>
            </div>
          </div>

          <div className="hidden xl:flex items-center space-x-2">
            {mainNavItems.map((item) => (
              <button 
                key={item.label} 
                onClick={() => handleNavClick(item.view)} 
                className={`px-4 xl:px-6 py-4 rounded-2xl text-lg xl:text-xl font-black transition-all ${
                  currentView === item.view 
                  ? 'bg-slate-800 text-yellow-400 border-b-4 border-yellow-500' 
                  : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="relative mx-2 xl:mx-4">
              <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center px-4 xl:px-6 py-4 rounded-2xl text-lg xl:text-xl font-black text-slate-300 hover:bg-slate-800 transition-all border border-slate-700/50">
                <Globe className="w-5 h-5 xl:w-6 xl:h-6 mr-2 xl:mr-3 text-yellow-500" /> {languages.find(l => l.code === lang)?.label}
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-[2rem] shadow-2xl py-4 text-slate-900 z-50 overflow-hidden ring-1 ring-black ring-opacity-10">
                  {languages.map(l => (
                    <button key={l.code} onClick={() => { onLanguageChange(l.code); setIsLangMenuOpen(false); }} className={`flex items-center w-full px-8 py-4 text-lg font-black hover:bg-slate-50 ${lang === l.code ? 'text-yellow-600 bg-yellow-50' : 'text-slate-700'}`}>
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="ml-4 xl:ml-8 pl-4 xl:pl-8 border-l border-slate-700/50 flex items-center">
              {currentUser ? (
                <Button 
                  onClick={() => handleNavClick(PageView.ADMIN)} 
                  variant="secondary"
                  icon={LayoutDashboard}
                  className="px-6 xl:px-8 py-4 rounded-2xl text-lg xl:text-xl"
                >
                  {t_navbar.portal?.[lang] || 'My Portal'}
                </Button>
              ) : (
                <Button 
                  onClick={() => onLogin('alumni')} 
                  variant="primary"
                  className="bg-black text-slate-900 py-4 px-6 xl:px-10 rounded-2xl text-lg xl:text-xl"
                >
                  {t_navbar.login?.[lang] || 'Login'}
                </Button>
              )}
            </div>
          </div>

          <div className="flex items-center xl:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-4 rounded-2xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
              {isMobileMenuOpen ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-t border-slate-800 p-6 space-y-2 animate-in slide-in-from-top-8 max-h-[calc(100vh-112px)] overflow-y-auto">
           {mainNavItems.map((item) => (
             <button key={item.label} onClick={() => handleNavClick(item.view)} className="w-full text-left px-8 py-5 rounded-2xl text-xl font-black text-slate-300 hover:bg-slate-800 transition-all">
               {item.label}
             </button>
           ))}

           <div className="pt-4 border-t border-slate-800">
             <p className="px-8 mb-2 text-xs font-black uppercase tracking-widest text-slate-500">
               {t_common.selectLanguage?.[lang] || 'Select Language'}
             </p>
             <div className="grid grid-cols-1 gap-2">
               {languages.map(l => (
                 <button 
                   key={l.code} 
                   onClick={() => { onLanguageChange(l.code); setIsMobileMenuOpen(false); }} 
                   className={`flex items-center w-full px-8 py-4 text-lg font-black rounded-2xl transition-all ${lang === l.code ? 'text-yellow-400 bg-slate-800' : 'text-slate-400 hover:bg-slate-800'}`}
                 >
                   <Globe className={`w-5 h-5 mr-3 ${lang === l.code ? 'text-yellow-400' : 'text-slate-600'}`} />
                   {l.label}
                 </button>
               ))}
             </div>
           </div>

           <div className="pt-4">
             {currentUser ? (
               <Button 
                 onClick={() => handleNavClick(PageView.ADMIN)} 
                 variant="secondary"
                 icon={LayoutDashboard}
                 fullWidth
                 className="py-5 rounded-2xl text-xl"
               >
                 {t_navbar.portal?.[lang] || 'My Portal'}
               </Button>
             ) : (
               <Button 
                 onClick={() => { onLogin('alumni'); setIsMobileMenuOpen(false); }} 
                 variant="primary"
                 fullWidth
                 className="bg-yellow-400 text-slate-900 py-5 rounded-2xl text-xl font-black"
               >
                 {t_navbar.login?.[lang] || 'Login'}
               </Button>
             )}
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
