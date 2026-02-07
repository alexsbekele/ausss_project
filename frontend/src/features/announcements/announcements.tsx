
import React, { useEffect, useState } from 'react';
import type { Announcement, Language, User } from '@shared/types';
import { ApiService } from '@/services/apiService';
import { Bell, Calendar, Globe, Newspaper, Info, Trash2 } from 'lucide-react';
import { translations } from '@/locales/translations';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface AnnouncementsProps {
  lang: Language;
  currentUser: User | null;
}

const Announcements: React.FC<AnnouncementsProps> = ({ lang, currentUser }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const loadAnnouncements = async () => {
    // Dashboard only shows public Announcements
    const all = await ApiService.getAnnouncements();
    const publicOnly = all.filter(a => a.isActive);
    setAnnouncements(publicOnly);
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm(translations.announcementsPage.deleteConfirm[lang])) {
      await ApiService.deleteAnnouncement(id);
      loadAnnouncements();
    }
  };

  const t = translations.announcementsPage;

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-24 space-y-6">
        <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-none">{t.title[lang]}</h2>
        <p className="text-2xl text-slate-400 font-bold max-w-3xl mx-auto leading-relaxed">{t.subtitle[lang]}</p>
        <div className="h-2 w-32 bg-yellow-400 mx-auto rounded-full shadow-[0_0_20px_rgba(250,204,21,0.4)]"></div>
      </div>

      <div className="space-y-16">
        {announcements.length === 0 ? (
          <Card className="border-4 border-dashed border-slate-100 p-32 text-center bg-slate-50/50">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-sm">
              <Newspaper className="h-16 w-16 text-slate-200" />
            </div>
            <h3 className="text-3xl font-black text-slate-300 tracking-tight">{t.empty[lang]}</h3>
          </Card>
        ) : (
          announcements.map((item) => (
            <Card key={item.id} className="p-0 overflow-hidden border-slate-100 hover:translate-y-[-8px] transition-all duration-500 group">
              <div className="flex flex-col md:flex-row">
                {item.imageUrl && (
                  <div className="md:w-5/12 relative h-80 md:h-auto overflow-hidden bg-slate-900">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" />
                  </div>
                )}
                <div className="flex-1 p-12 md:p-20 flex flex-col justify-center space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3 bg-yellow-400 px-6 py-3 rounded-2xl shadow-lg rotate-[-2deg]">
                        <Newspaper className="w-5 h-5 text-slate-900" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-900">{t.newsTag[lang]}</span>
                      </div>
                      <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">
                        {new Date(item.datePosted).toLocaleDateString(lang === 'en' ? 'en-US' : 'am-ET', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                    {currentUser?.role === 'admin' && (
                      <Button 
                        onClick={() => handleDelete(item.id)}
                        variant="danger"
                        icon={Trash2}
                        className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white shadow-sm hover:shadow-red-200 border-none"
                        title="Delete Announcement"
                      />
                    )}
                  </div>

                  <h3 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">{item.title}</h3>
                  <div className="prose prose-2xl text-slate-500 leading-relaxed font-bold max-w-none">{item.content}</div>

                  <div className="flex items-center gap-6 pt-10 border-t-4 border-slate-50">
                    <div className="w-16 h-16 bg-slate-900 text-yellow-400 rounded-2xl flex items-center justify-center font-black text-xl shadow-xl rotate-3">BM</div>
                    <div>
                      <p className="text-lg font-black text-slate-900">{item.authorName || 'Director Bekele Merga'}</p>
                      <p className="text-xs text-slate-400 font-black uppercase tracking-[0.3em]">{t.adminTag[lang]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
