
import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import type { Language, AdmissionApplicant } from '@shared/types';
import { ApiService } from '@/services/apiService';
import { translations } from '@/locales/translations';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface AdmissionRegistrationProps {
  onCancel: () => void;
  lang: Language;
}

const AdmissionRegistration: React.FC<AdmissionRegistrationProps> = ({ onCancel, lang }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    wereda: '',
    kebele: '',
    schoolName: '',
    grade8Score: '',
    phoneNumber: ''
  });
  const [result, setResult] = useState<'success' | 'fail' | null>(null);
  const [threshold, setThreshold] = useState(78);

  useEffect(() => {
    const fetchThreshold = async () => {
      const val = await ApiService.getThreshold();
      setThreshold(val);
    };
    fetchThreshold();
  }, []);

  const t = translations.admissionPortal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const score = parseFloat(formData.grade8Score);
    
    // Save applicant data regardless of success for admin tracking
    const applicant: AdmissionApplicant = {
        id: `app_${Date.now()}`,
        fullName: formData.fullName,
        age: formData.age,
        wereda: formData.wereda,
        kebele: formData.kebele,
        schoolName: formData.schoolName,
        grade8Score: score,
        phoneNumber: formData.phoneNumber,
        timestamp: Date.now()
    };
    await ApiService.apply(applicant);

    if (score >= threshold) setResult('success');
    else setResult('fail');
  };

  if (result === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-in fade-in zoom-in duration-300">
        <Card className="p-10 bg-green-50 border-green-200">
          <div className="w-20 h-20 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-200">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4">{t.success[lang]}</h2>
          <p className="text-xl text-slate-900 mb-8 font-black leading-relaxed">
            {t.successMsg[lang]}
          </p>
          <Button onClick={onCancel} variant="primary" size="lg">
            {t.back[lang]}
          </Button>
        </Card>
      </div>
    );
  }

  if (result === 'fail') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-in fade-in slide-in-from-bottom-4">
        <Card className="p-10 bg-orange-50 border-orange-200">
          <div className="w-20 h-20 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center mx-auto mb-6 border border-orange-200">
            <XCircle className="w-10 h-10" />
          </div>
          <p className="text-2xl text-slate-900 leading-relaxed font-black mb-8 italic">
            "{t.failMsg[lang]}"
          </p>
          <Button onClick={onCancel} variant="primary" size="lg">
            {t.back[lang]}
          </Button>
        </Card>
      </div>
    );
  }

  const inputClass = "w-full border-4 border-red-600 rounded-[2rem] px-8 py-6 bg-slate-50 text-slate-900 font-black text-xl outline-none focus:border-yellow-400 focus:bg-white transition-all placeholder:text-slate-300";

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 animate-in fade-in duration-700">
      <div className="flex items-center gap-6 mb-16">
        <Button 
          onClick={onCancel}
          variant="outline"
          icon={ArrowLeft}
          className="p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 border-none"
        />
        <h1 className="text-5xl font-black text-slate-900 tracking-tight">{t.title[lang]}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-16">
        {/* Personal Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 rounded-full"></div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest">{t.personal[lang]}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t.name[lang]}</label>
              <input 
                type="text" 
                required 
                className={inputClass}
                //placeholder="Full Name"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t.age[lang]}</label>
              <input 
                type="number" 
                required 
                className={inputClass}
                //placeholder="Age"
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 rounded-full"></div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest">{t.location[lang]}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Wereda</label>
              <input 
                type="text" 
                required 
                className={inputClass}
                //placeholder="Wereda"
                value={formData.wereda}
                onChange={e => setFormData({...formData, wereda: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">Kebele</label>
              <input 
                type="text" 
                required 
                className={inputClass}
                //placeholder="Kebele"
                value={formData.kebele}
                onChange={e => setFormData({...formData, kebele: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t.phone[lang]}</label>
              <input 
                type="tel" 
                required 
                className={inputClass}
                //placeholder="+251 ..."
                value={formData.phoneNumber}
                onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Academic Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-400 rounded-full"></div>
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest">{t.academic[lang]}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t.school[lang]}</label>
              <input 
                type="text" 
                required 
                className={inputClass}
                //placeholder="Former School"
                value={formData.schoolName}
                onChange={e => setFormData({...formData, schoolName: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-2">{t.grade8[lang]}</label>
              <div className="relative">
                <input 
                  type="number" 
                  step="0.01" 
                  required 
                  className={`${inputClass} pr-16`}
                  //placeholder="0.00"
                  value={formData.grade8Score}
                  onChange={e => setFormData({...formData, grade8Score: e.target.value})}
                />
                <span className="absolute right-8 top-1/2 -translate-y-1/2 font-black text-slate-300 text-2xl">%</span>
              </div>
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          fullWidth 
          size="lg"
          variant="primary"
          className="py-10 text-3xl bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500"
          //className="bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500"
        >
          {t.submit[lang]}
        </Button>
      </form>
    </div>
  );
};

export default AdmissionRegistration;
