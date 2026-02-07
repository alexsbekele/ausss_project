import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import type { Language } from '@shared/types';
import { translations } from '@/locales/translations';
import SectionHeader from '@/components/ui/SectionHeader';
import Card from '@/components/ui/Card';

interface ContactSectionProps {
  lang: Language;
}

const ContactSection: React.FC<ContactSectionProps> = ({ lang }) => {
  const t = translations.contact;

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 border-t border-slate-100">
      <SectionHeader title={t.title[lang]} />
      <Card className="max-w-2xl bg-slate-50 p-10 md:p-14">
        <div className="space-y-10">
          <div className="flex items-start text-gray-700 group">
            <div className="p-4 bg-white rounded-2xl shadow-sm mr-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-yellow-600"/>
            </div>
            <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{t.locationLabel[lang]}</p>
              <span className="text-xl font-bold text-slate-800">Ambo University, Hachalu Hundessa Campus, Ethiopia</span>
            </div>
          </div>
          <div className="flex items-center text-gray-700 group">
            <div className="p-4 bg-white rounded-2xl shadow-sm mr-6 group-hover:scale-110 transition-transform">
              <Phone className="w-8 h-8 text-yellow-600"/>
            </div>
            <div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{t.phoneLabel[lang]}</p>
              <span className="text-xl font-bold text-slate-800">+251 11 236 2006</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContactSection;
