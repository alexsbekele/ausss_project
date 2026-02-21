
import React, { useEffect, useState } from 'react';
import type { Alumnus, User, Language } from '@shared/types';
import { ApiService } from '@/services/apiService';
import { Search, Briefcase, MapPin, UserPlus, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { translations } from '@/locales/translations';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface AlumniDirectoryProps {
  currentUser: User | null;
  onLoginRequest: () => void;
  onRegisterClick: () => void;
  lang: Language;
}

const AlumniDirectory: React.FC<AlumniDirectoryProps> = ({ currentUser, onLoginRequest, onRegisterClick, lang }) => {
  const [alumni, setAlumni] = useState<Alumnus[]>([]);
  const [filteredAlumni, setFilteredAlumni] = useState<Alumnus[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState<number | 'all'>('all');
  const [expandedBioId, setExpandedBioId] = useState<string | null>(null);

  useEffect(() => {
    const loadAlumni = async () => {
      const allAlumni = await ApiService.getAllAlumni();
      const approved = allAlumni.filter(a => a.isApproved);
      setAlumni(approved);
      setFilteredAlumni(approved);
    };
    loadAlumni();
  }, []);

  useEffect(() => {
    let result = alumni;

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(lower) ||
          a.currentRole.toLowerCase().includes(lower) ||
          a.companyOrUniversity.toLowerCase().includes(lower)
      );
    }

    if (yearFilter !== 'all') {
      result = result.filter((a) => Number(a.graduationYear) === Number(yearFilter));
    }

    setFilteredAlumni(result);
  }, [searchTerm, yearFilter, alumni]);

  const t = translations.alumniDirectory;

  const years = Array.from(new Set(alumni.map((a) => Number(a.graduationYear)))).sort((a: number, b: number) => b - a);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-10 mb-12 gap-8">
        <div>
            <h2 className="text-5xl font-black tracking-tight text-slate-900 mb-4">{t.title[lang]}</h2>
            <p className="text-xl text-slate-500 font-medium max-w-2xl leading-relaxed">{t.desc[lang]}</p>
        </div>
        <div className="flex-shrink-0">
            <Button 
                onClick={onRegisterClick}
                variant="primary"
                size="lg"
                icon={UserPlus}
                className="px-8 py-4 text-lg"
            >
                {t.join[lang]}
            </Button>
        </div>
      </div>

      {!currentUser && (
        <Card className="bg-slate-900 text-white p-8 mb-12 shadow-2xl relative overflow-hidden group border-none">
          <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-110">
            <Info className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h4 className="text-2xl font-bold text-yellow-400 mb-2">Connect Deeper</h4>
            <p className="text-slate-300 text-lg mb-6 max-w-xl">{t.preview[lang]}</p>
            <Button 
              onClick={onLoginRequest} 
              variant="outline"
              className="bg-white text-slate-900 border-none hover:bg-yellow-500 hover:text-slate-900"
            >
              {t.loginNow[lang]}
            </Button>
          </div>
        </Card>
      )}

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl leading-5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all text-slate-900 font-medium"
            placeholder={t.search[lang]}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:w-64">
          <select
            className="block w-full px-4 py-4 bg-white border border-slate-200 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-2xl appearance-none"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          >
            <option value="all">{t.allYears[lang]}</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {t.classOf[lang]} {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {filteredAlumni.map((alum) => (
          <Card key={alum.userId} className="group p-0 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row bg-white border-slate-100">
            <div className="sm:w-32 bg-slate-50 flex items-center justify-center border-r border-slate-100 p-6 sm:p-0">
               <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center overflow-hidden">
                  {alum.photoUrl ? (
                    <img src={alum.photoUrl} className="w-full h-full object-cover" alt={alum.name} />
                  ) : (
                    <span className="text-3xl font-black text-slate-200">{alum.name.charAt(0)}</span>
                  )}
               </div>
            </div>
            <div className="p-8 flex-grow">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-black text-slate-900 group-hover:text-yellow-600 transition-colors">{alum.name}</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 uppercase tracking-widest">
                  Class of {alum.graduationYear}
                </span>
              </div>
              
              <div className="space-y-3 mt-4">
                <div className="flex items-center text-slate-600 font-medium">
                  <Briefcase className="flex-shrink-0 mr-2 h-4 w-4 text-slate-400" />
                  <span className="text-sm font-bold">{alum.currentRole} at {alum.companyOrUniversity}</span>
                </div>
                {currentUser && (
                   <div className="flex items-center text-slate-600 font-medium">
                    <MapPin className="flex-shrink-0 mr-2 h-4 w-4 text-slate-400" />
                    <span className="text-sm truncate max-w-[200px]">{alum.email}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-50">
                 <p className={`text-slate-500 text-sm italic leading-relaxed ${expandedBioId === alum.userId ? '' : 'line-clamp-2'}`}>
                   "{alum.bio || 'Sharing the journey since AUSSS.'}"
                 </p>
                 {alum.bio && alum.bio.length > 80 && (
                   <button 
                    onClick={() => setExpandedBioId(expandedBioId === alum.userId ? null : alum.userId)}
                    className="flex items-center text-yellow-600 text-xs font-black mt-2 uppercase tracking-widest hover:text-yellow-700 transition-colors"
                   >
                     {expandedBioId === alum.userId ? (
                       <><ChevronUp className="w-3 h-3 mr-1" /> {t.readLess[lang]}</>
                     ) : (
                       <><ChevronDown className="w-3 h-3 mr-1" /> {t.readMore[lang]}</>
                     )}
                   </button>
                 )}
              </div>
            </div>
          </Card>
        ))}

        {filteredAlumni.length === 0 && (
            <div className="col-span-full text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold text-xl">{t.noFound[lang]}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;
