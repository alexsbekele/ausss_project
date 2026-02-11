
import React, { useState } from 'react';
import type { UserRole, User, Language } from '@shared/types';
import { ApiService } from '@/services/apiService';
import { X, Mail, Lock, User as UserIcon, ShieldCheck, Eye, EyeOff, ArrowLeft, BookOpen, Key, CheckCircle } from 'lucide-react';
import { translations } from '@/locales/translations';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
  lang: Language;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess, lang }) => {
  const [step, setStep] = useState<'role' | 'credentials' | 'forgot_password' | 'recovery_sent'>('role');
  const [role, setRole] = useState<UserRole>('alumni');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tempPassword, setTempPassword] = useState('');

  const t = translations.loginModal;

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep('credentials');
    setError('');
  };

  const generateTempPass = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = 'AUSSS-';
    for(let i=0; i<4; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    return res;
  };

  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // This functionality isn't fully supported by current backend routes, 
    // but we'll mock the delay for UI feedback as requested by the original code.
    setTimeout(() => {
      setError("Recovery not yet implemented in backend.");
      setIsLoading(false);
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();
      
      const user = await ApiService.login(trimmedEmail, trimmedPassword);
      
      if (user) {
        // As a senior dev, we prioritize admin access regardless of selection
        if (user.role === 'admin') {
          onLoginSuccess(user);
          return;
        }

        // Map the UI role selection to the shared UserRole type
        const uiRoleToUserRole: Record<string, UserRole> = {
          'alumni': 'alumni',
          'teacher': 'teacher',
          'admin': 'admin'
        };

        const expectedRole = uiRoleToUserRole[role];

        if (user.role === expectedRole) {
          onLoginSuccess(user);
        } else {
          setError(`${t.loginFailed[lang]} (Expected ${expectedRole}, but found ${user.role})`);
        }
      } else {
        setError(t.loginFailed[lang]);
      }
    } catch (e) {
      console.error('Login error:', e);
      setError(`${t.loginFailed[lang]} (Server Error)`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4">
      <Card className="bg-white p-0 w-full max-w-md overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] animate-in zoom-in duration-300 border-none rounded-[3rem]">
        <div className="bg-slate-900 p-8 flex justify-between items-center text-white border-b border-slate-800">
          <h3 className="text-2xl font-black tracking-tight">
            {step === 'forgot_password' || step === 'recovery_sent' ? t.recoveryTitle[lang] : t.title[lang]}
          </h3>
          <Button 
            onClick={onClose} 
            variant="ghost" 
            icon={X}
            className="p-2 text-white hover:bg-slate-800 rounded-full transition-colors border-none"
          />
        </div>

        <div className="p-10">
          {step === 'role' && (
            <div className="space-y-4">
              <p className="text-slate-500 mb-8 text-center font-bold">{t.selectDest[lang]}</p>
              <Button 
                onClick={() => handleRoleSelect('alumni')} 
                variant="outline"
                fullWidth
                className="flex items-center p-5 border-2 border-slate-100 rounded-3xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group h-auto justify-start"
              >
                <div className="bg-yellow-100 p-4 rounded-2xl group-hover:bg-yellow-200 transition-colors"><UserIcon className="w-7 h-7 text-yellow-600" /></div>
                <div className="ml-5 text-left"><span className="block font-black text-slate-900 text-lg leading-none mb-1">{t.alumniLabel[lang]}</span><span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.alumniDesc[lang]}</span></div>
              </Button>
              <Button 
                onClick={() => handleRoleSelect('teacher')} 
                variant="outline"
                fullWidth
                className="flex items-center p-5 border-2 border-slate-100 rounded-3xl hover:border-blue-400 hover:bg-blue-50 transition-all group h-auto justify-start"
              >
                <div className="bg-blue-100 p-4 rounded-2xl group-hover:bg-blue-200 transition-colors"><BookOpen className="w-7 h-7 text-blue-600" /></div>
                <div className="ml-5 text-left"><span className="block font-black text-slate-900 text-lg leading-none mb-1">{t.teacherLabel[lang]}</span><span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.teacherDesc[lang]}</span></div>
              </Button>
              <Button 
                onClick={() => handleRoleSelect('admin')} 
                variant="outline"
                fullWidth
                className="flex items-center p-5 border-2 border-slate-100 rounded-3xl hover:border-slate-800 hover:bg-slate-50 transition-all group h-auto justify-start"
              >
                <div className="bg-slate-100 p-4 rounded-2xl group-hover:bg-slate-200 transition-colors"><ShieldCheck className="w-7 h-7 text-slate-600" /></div>
                <div className="ml-5 text-left"><span className="block font-black text-slate-900 text-lg leading-none mb-1">{t.directorLabel[lang]}</span><span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.directorDesc[lang]}</span></div>
              </Button>
            </div>
          )}

          {step === 'credentials' && (
            <form onSubmit={handleLogin} className="space-y-6">
              <Button 
                type="button" 
                onClick={() => setStep('role')} 
                variant="ghost"
                icon={ArrowLeft}
                className="text-xs font-black text-slate-400 hover:text-slate-900 mb-6 flex items-center uppercase tracking-widest group border-none p-0"
              >
                {t.changeRole[lang]}
              </Button>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">{t.emailLabel[lang]}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="email" required autoFocus value={email} onChange={e => setEmail(e.target.value)} placeholder="name@ambo.edu.et" className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none text-slate-950 font-black text-lg placeholder-slate-300 focus:border-slate-900 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">{t.passwordLabel[lang]}</label>
                  <button type="button" onClick={() => setStep('forgot_password')} className="text-[10px] font-black text-yellow-600 uppercase tracking-widest hover:text-yellow-700 transition-colors">{t.forgotPass[lang]}</button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-12 pr-14 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none text-slate-950 font-black text-lg placeholder-slate-300 focus:border-slate-900 transition-all" />
                  <Button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    variant="ghost"
                    icon={showPassword ? EyeOff : Eye}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-900 transition-colors border-none"
                  />
                </div>
              </div>
              {error && <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-center"><p className="text-red-600 text-xs font-black uppercase tracking-tight">{error}</p></div>}
              <Button 
                type="submit" 
                disabled={isLoading} 
                variant="primary"
                fullWidth
                className="py-5 text-lg"
              >
                {isLoading ? t.loading[lang] : t.enterBtn[lang]}
              </Button>
            </form>
          )}

          {step === 'forgot_password' && (
            <form onSubmit={handleRecovery} className="space-y-8">
              <Button 
                type="button" 
                onClick={() => setStep('credentials')} 
                variant="ghost"
                icon={ArrowLeft}
                className="text-xs font-black text-slate-400 hover:text-slate-900 mb-4 flex items-center uppercase tracking-widest group border-none p-0"
              >
                {t.backToLogin[lang]}
              </Button>
              
              <div className="text-center space-y-3">
                 <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Key className="w-10 h-10 text-yellow-600" />
                 </div>
                 <h4 className="text-3xl font-black text-slate-900 tracking-tight">{t.recoveryTitle[lang]}</h4>
                 <p className="text-slate-500 font-bold leading-relaxed">{t.recoveryDesc[lang]}</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">{t.emailLabel[lang]}</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="email" required autoFocus value={recoveryEmail} onChange={e => setRecoveryEmail(e.target.value)} placeholder="Enter your registered email" className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none text-slate-950 font-black text-lg placeholder-slate-300 focus:border-slate-900 transition-all" />
                </div>
              </div>

              {error && <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-center"><p className="text-red-600 text-xs font-black uppercase tracking-tight">{error}</p></div>}
              
              <Button 
                type="submit" 
                disabled={isLoading} 
                variant="primary"
                fullWidth
                className="py-5 text-lg uppercase tracking-[0.2em]"
              >
                {isLoading ? t.loading[lang] : t.sendRecovery[lang]}
              </Button>
            </form>
          )}

          {step === 'recovery_sent' && (
            <div className="text-center space-y-10 animate-in fade-in zoom-in duration-500">
               <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-12 h-12 text-green-600" />
               </div>
               
               <div className="space-y-4">
                  <h4 className="text-4xl font-black text-slate-900 tracking-tighter">{t.successTitle[lang]}</h4>
                  <p className="text-slate-500 font-bold px-4 leading-relaxed">{t.successDesc[lang]}</p>
               </div>

               <div className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-100 space-y-3">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{t.tempPassLabel[lang]}</span>
                  <div className="text-4xl font-black text-slate-900 tracking-widest font-mono select-all">
                     {tempPassword}
                  </div>
               </div>

               <Button 
                 onClick={() => { setStep('credentials'); setPassword(tempPassword); setEmail(recoveryEmail); }} 
                 variant="primary"
                 fullWidth
                 className="py-5 text-lg uppercase tracking-[0.2em]"
               >
                  {t.backToLogin[lang]}
               </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LoginModal;
