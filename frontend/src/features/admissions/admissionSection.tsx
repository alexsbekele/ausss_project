import React from 'react';
import { Send, Award, CheckCircle } from 'lucide-react';
import { Language, PageView } from '@shared/types';
import { translations } from '@/locales/translations';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface AdmissionSectionProps {
  lang: Language;
  onNavigate?: (view: PageView) => void;
}

const AdmissionSection: React.FC<AdmissionSectionProps> = ({ lang, onNavigate }) => {
  const t = translations.admission;

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <SectionHeader title={t.title[lang]} subtitle={t.subtitle[lang]}>
        {onNavigate && (
          <Button 
            onClick={() => onNavigate(PageView.ADMISSION_REGISTER)}
            icon={Send}
            iconPosition="right"
          >
            {t.applyBtn[lang]}
          </Button>
        )}
      </SectionHeader>
      
      <div className="space-y-12">
        <div className="bg-yellow-50 border-l-8 border-yellow-500 p-10 rounded-r-[2.5rem] shadow-sm">
          <div className="flex items-start">
            <Award className="h-12 w-12 text-yellow-600 mr-6 flex-shrink-0 mt-1" />
            <div>
              <p className="font-black text-3xl text-yellow-800 mb-4">
                {t.criteriaTitle[lang]}
              </p>
              <p className="text-yellow-900 text-xl leading-relaxed font-bold">
                {t.criteriaDesc[lang]}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <Card className="bg-white">
            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
              <CheckCircle className="text-green-500 mr-3 h-8 w-8"/> {t.thresholdLabel[lang]}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center text-slate-800 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <span className="font-black mr-3 text-3xl text-blue-600">78%</span> 
                <span className="font-bold text-xl">{t.grade8Result[lang]}</span>
              </li>
            </ul>
          </Card>
          
          <Card className="bg-slate-50">
            <h3 className="text-2xl font-black text-slate-900 mb-6">{t.stepsTitle[lang]}</h3>
            <ol className="space-y-8">
              {[1, 2, 3].map(step => (
                <li key={step} className="flex items-start">
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 text-slate-900 font-black flex items-center justify-center mr-5 text-xl shadow-lg">{step}</span>
                  <div>
                    <h4 className="font-black text-xl text-slate-900">
                      {step === 1 ? t.step1[lang] : step === 2 ? t.step2[lang] : t.step3[lang]}
                    </h4>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdmissionSection;
