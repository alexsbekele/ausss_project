
import React, { useState } from 'react';
import { ApiService } from '@/services/apiService';
import type { Alumnus, Language } from '@shared/types';
import { GraduationCap, CheckCircle, ArrowLeft } from 'lucide-react';
import { translations } from '@/locales/translations';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface AlumniRegistrationProps {
  onCancel: () => void;
  lang: Language;
}

const AlumniRegistration: React.FC<AlumniRegistrationProps> = ({ onCancel, lang }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gradYear: new Date().getFullYear(),
    role: '',
    company: '',
    bio: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const t = translations.alumniPortal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAlumnus: Alumnus = {
        userId: `temp_${Date.now()}`,
        name: formData.name,
        graduationYear: Number(formData.gradYear),
        currentGrade: 'Graduated',  
        currentRole: formData.role,
        companyOrUniversity: formData.company,
        bio: formData.bio,
        email: formData.email,
        isApproved: false
    };
    await ApiService.registerAlumnus(newAlumnus);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-in fade-in zoom-in duration-500">
        <Card className="p-12 bg-green-50 border-green-100">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-6">{t.successTitle[lang]}</h2>
          <p className="text-xl text-slate-600 font-bold mb-10 leading-relaxed">{t.successDesc[lang]}</p>
          <Button onClick={onCancel} variant="primary" size="lg" className="px-12">
            {t.return[lang]}
          </Button>
        </Card>
      </div>
    );
  }

  const inputClass = "w-full border-4 border-slate-100 rounded-3xl px-8 py-6 bg-slate-50 text-slate-900 font-bold text-xl outline-none focus:border-yellow-400 focus:bg-white transition-all placeholder:text-slate-300";

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in duration-700">
      <div className="flex items-center gap-6 mb-16">
        <button 
          onClick={onCancel}
          className="p-5 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">{t.title[lang]}</h1>
          <p className="text-xl text-slate-400 font-bold">{t.subtitle[lang]}</p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="bg-slate-900 px-10 py-8">
          <h3 className="text-2xl font-black text-white tracking-widest uppercase">{t.formTitle[lang]}</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 md:p-14 space-y-12">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t.name[lang]}</label>
              <input 
                type="text" 
                required 
                className={inputClass}
                placeholder="Full Name"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t.email[lang]}</label>
              <input
                type="email" 
                required 
                className={inputClass}
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t.gradYear[lang]}</label>
              <input 
                type="number" 
                required 
                className={inputClass}
                value={formData.gradYear}
                onChange={e => setFormData({...formData, gradYear: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t.role[lang]}</label>
              <input 
                type="text" 
                required 
                className={inputClass}
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t.company[lang]}</label>
            <input 
              type="text" 
              required 
              className={inputClass}
              placeholder="Company or University Name"
              value={formData.company}
              onChange={e => setFormData({...formData, company: e.target.value})}
            />
          </div>

          <div className="space-y-4">
            <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t.bio[lang]}</label>
            <textarea 
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Tell us about your journey..."
              value={formData.bio}
              onChange={e => setFormData({...formData, bio: e.target.value})}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <Button 
              type="button" 
              variant="outline" 
              size="lg" 
              fullWidth
              onClick={onCancel}
            >
              {t.cancel[lang]}
            </Button>
            <Button 
              type="submit" 
              variant="primary" 
              size="lg" 
              fullWidth
            >
              {t.submit[lang]}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AlumniRegistration;
