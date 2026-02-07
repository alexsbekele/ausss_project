
import React, { useState, useEffect, useRef } from 'react';
import type { Alumnus, User, GradeLevel, Teacher, Language } from '@shared/types';
import { ApiService } from '@/services/apiService';
import { Camera, Mail, Lock, GraduationCap, Briefcase, Save, X, Edit3, User as UserIcon, ShieldCheck, Image as ImageIcon, Trash2, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { translations } from '@/locales/translations';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface AlumniProfileProps {
  profileId: string;
  currentUser: User | null;
  lang: Language;
}

const AlumniProfile: React.FC<AlumniProfileProps> = ({ profileId, currentUser, lang }) => {
  const t = translations.profile;
  const [profileData, setProfileData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>({});
  const [userType, setUserType] = useState<'student' | 'teacher' | 'admin'>('student');
  const [showPassword, setShowPassword] = useState(false);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Check if current user has permission to edit this profile
  const isOwnProfile = currentUser?.uid === profileId;
  const isAdmin = currentUser?.role === 'admin';
  const canEdit = isOwnProfile || isAdmin;

  useEffect(() => {
    const loadProfile = async () => {
      setIsEditing(false); // Reset editing state when profileId changes
      setShowPassword(false);

      // Attempt to load as Alumnus/Student first
      const alum = await ApiService.getAlumnusById(profileId);
      if (alum) {
        setProfileData(alum);
        setEditForm(alum);
        setUserType('student');
      } else {
        // Try loading as Teacher
        const teacher = await ApiService.getTeacherById(profileId);
        if (teacher) {
          setProfileData(teacher);
          setEditForm(teacher);
          setUserType('teacher');
        } else if (profileId === 'admin-0' || profileId === currentUser?.uid) {
          // Handle Admin self-view
          // Note: In a real app, we would have a getAdminById or getProfileById endpoint
          // For now, we use a mock admin data or the currentUser
          const adminData = {
            name: 'School Administration',
            email: 'admin@ausss.edu',
            password: 'admin123',
            photoUrl: currentUser?.photoUrl,
            coverPhotoUrl: currentUser?.coverPhotoUrl,
            bio: 'School Administrator and Portal Manager',
            currentRole: 'School Director'
          };
          setProfileData(adminData);
          setEditForm(adminData);
          setUserType('admin');
        }
      }
    };

    loadProfile();
  }, [profileId, currentUser]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        if (type === 'avatar') {
          setEditForm({ ...editForm, photoUrl: base64 });
        } else {
          setEditForm({ ...editForm, coverPhotoUrl: base64 });
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset the input so the same file can be uploaded again if needed
    e.target.value = '';
  };

  const handleRemoveImage = (type: 'avatar' | 'cover') => {
    if (type === 'avatar') {
      setEditForm({ ...editForm, photoUrl: undefined });
    } else {
      setEditForm({ ...editForm, coverPhotoUrl: undefined });
    }
  };

  const handleSave = async () => {
    if (userType === 'student') {
      await ApiService.updateAlumnus(editForm as Alumnus);
    } else if (userType === 'teacher') {
      await ApiService.updateTeacher(editForm as Teacher);
    }
    setProfileData(editForm);
    setIsEditing(false);
    alert(t.updateSuccess[lang]);
  };

  if (!profileData) return <div className="p-20 text-center text-slate-400 font-black text-2xl italic">{t.notFound[lang]}</div>;

  const gradeLevels: GradeLevel[] = ['9', '10', '11', '12', 'Graduated'];
  const inputStyle = "w-full p-6 bg-white border-4 border-slate-200 rounded-[2rem] font-black text-slate-900 focus:border-slate-900 outline-none transition-all placeholder:text-slate-300";
  const labelStyle = "text-xs font-black text-slate-500 uppercase tracking-[0.3em] ml-4 mb-2 block";

  const currentCover = isEditing ? editForm.coverPhotoUrl : profileData.coverPhotoUrl;
  const currentAvatar = isEditing ? editForm.photoUrl : profileData.photoUrl;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 animate-in fade-in duration-700">
      <div className="bg-white rounded-[5rem] shadow-2xl overflow-hidden border-2 border-slate-100">
        
        {/* Cover Photo Area */}
        <div className="h-80 bg-slate-900 relative group overflow-hidden">
          {currentCover ? (
            <img src={currentCover} className="w-full h-full object-cover" alt="Cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-black opacity-50"></div>
          )}
          
          {isEditing && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="flex gap-4">
                <Button 
                  onClick={() => coverInputRef.current?.click()}
                  variant="primary"
                  icon={RefreshCw}
                  className="rounded-full px-8 py-4 uppercase tracking-widest shadow-xl"
                >
                  {t.changeCover[lang]}
                </Button>
                {currentCover && (
                  <Button 
                    onClick={() => handleRemoveImage('cover')}
                    variant="danger"
                    icon={Trash2}
                    className="rounded-full px-8 py-4 uppercase tracking-widest shadow-xl"
                  >
                    {t.remove[lang]}
                  </Button>
                )}
              </div>
              <input type="file" ref={coverInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')} />
            </div>
          )}
        </div>

        <div className="px-10 md:px-20 pb-20 relative">
          
          {/* Larger Avatar Section */}
          <div className="absolute -top-28 left-10 md:left-20">
            <div className="w-56 h-56 rounded-[4rem] border-[12px] border-white shadow-2xl overflow-hidden bg-slate-100 relative group">
              {currentAvatar ? (
                <img src={currentAvatar} className="w-full h-full object-cover" alt="Profile" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-black text-slate-300 text-8xl bg-slate-50">
                  {profileData.name?.charAt(0)}
                </div>
              )}
              {isEditing && (
                <div 
                  className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-default text-center px-4 gap-4"
                >
                  <Button 
                    onClick={() => avatarInputRef.current?.click()}
                    variant="primary"
                    icon={Camera}
                    className="p-3 text-[10px] uppercase tracking-widest w-full justify-center rounded-2xl"
                  >
                    {t.changePhoto[lang]}
                  </Button>
                  {currentAvatar && (
                    <Button 
                      onClick={() => handleRemoveImage('avatar')}
                      variant="danger"
                      icon={Trash2}
                      className="p-3 text-[10px] uppercase tracking-widest w-full justify-center rounded-2xl"
                    >
                      {t.remove[lang]}
                    </Button>
                  )}
                  <input type="file" ref={avatarInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'avatar')} />
                </div>
              )}
            </div>
          </div>

          {/* Action Header */}
          <div className="pt-32 flex flex-col lg:flex-row justify-between items-start gap-10">
            <div className="flex-1 space-y-4">
              {isEditing ? (
                <div className="space-y-6 max-w-xl">
                   <div>
                     <label className={labelStyle}>{t.displayName[lang]}</label>
                     <input 
                       type="text" 
                       value={editForm.name} 
                       onChange={e => setEditForm({...editForm, name: e.target.value})} 
                       className={inputStyle}
                     />
                   </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-7xl font-black text-slate-900 tracking-tighter leading-none">{profileData.name}</h2>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className={`px-8 py-2 rounded-full text-sm font-black uppercase tracking-widest border-4 ${
                      userType === 'teacher' ? 'bg-blue-600 text-white border-blue-700' : 
                      userType === 'admin' ? 'bg-red-600 text-white border-red-700' :
                      profileData.currentGrade === 'Graduated' ? 'bg-yellow-500 text-slate-900 border-yellow-600' : 'bg-green-600 text-white border-green-700'
                    }`}>
                      {userType === 'teacher' ? t.teacher[lang] : 
                       userType === 'admin' ? t.administrator[lang] : 
                       profileData.currentGrade === 'Graduated' ? t.graduated[lang] : t.student[lang]}
                    </span>
                    <span className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs">{translations.testimonials.institution[lang]}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 shrink-0">
              {canEdit && (
                !isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    variant="primary"
                    icon={Edit3}
                    className="px-10 py-5 text-lg rounded-[2.5rem]"
                  >
                    {t.editProfile[lang]}
                  </Button>
                ) : (
                  <>
                    <Button 
                      onClick={handleSave} 
                      variant="primary"
                      icon={Save}
                      className="px-10 py-5 text-lg bg-green-600 hover:bg-green-700 border-green-900 rounded-[2.5rem]"
                    >
                      {t.saveChanges[lang]}
                    </Button>
                    <Button 
                      onClick={() => { setIsEditing(false); setEditForm(profileData); }} 
                      variant="outline"
                      className="px-10 py-5 text-lg rounded-[2.5rem]"
                    >
                      {t.cancel[lang]}
                    </Button>
                  </>
                )
              )}
            </div>
          </div>

          {/* Form Content */}
          <div className="mt-24 space-y-20">
            
            {/* Account & Security Section - Only visible to owner or admin */}
            {(isOwnProfile || isAdmin) && (
              <section className="space-y-10">
                <h3 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-6">
                  <div className="p-4 bg-blue-50 rounded-3xl"><ShieldCheck className="text-blue-600 w-10 h-10" /></div>
                  {t.accountSecurity[lang]}
                </h3>
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <label className={labelStyle}>{t.emailAddress[lang]}</label>
                     {isEditing ? (
                       <div className="relative">
                          <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-8 h-8" />
                          <input 
                            type="email" 
                            value={editForm.email} 
                            onChange={e => setEditForm({...editForm, email: e.target.value})} 
                            className={`${inputStyle} pl-20`}
                          />
                       </div>
                     ) : (
                       <div className="flex items-center gap-6 p-8 bg-slate-50 border-4 border-slate-100 rounded-[3rem] font-black text-slate-900 text-2xl">
                          <Mail className="text-slate-400 w-8 h-8" /> {profileData.email}
                       </div>
                     )}
                  </div>

                  <div className="space-y-4">
                     <label className={labelStyle}>{t.password[lang]}</label>
                     {isEditing ? (
                       <div className="relative">
                          <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-8 h-8" />
                          <input 
                            type={showPassword ? "text" : "password"} 
                            value={editForm.password || ''} 
                            onChange={e => setEditForm({...editForm, password: e.target.value})} 
                            className={`${inputStyle} pl-20 pr-16`}
                            placeholder={t.changePassword[lang]}
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-900 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                          </button>
                       </div>
                     ) : (
                       <div className="flex items-center gap-6 p-8 bg-slate-50 border-4 border-slate-100 rounded-[3rem] font-black text-slate-900 text-2xl">
                          <Lock className="text-slate-400 w-8 h-8" /> ••••••••••••
                       </div>
                     )}
                  </div>
                </div>
              </section>
            )}

            {/* Position Section */}
            <section className="space-y-10">
              <h3 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-6">
                <div className="p-4 bg-yellow-50 rounded-3xl"><UserIcon className="text-yellow-600 w-10 h-10" /></div>
                {t.position[lang]}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-12">
                {userType === 'student' && (
                  <div className="space-y-4">
                     <label className={labelStyle}>{t.currentGrade[lang]}</label>
                     {isEditing ? (
                        <div className="relative">
                          <GraduationCap className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-8 h-8 z-10" />
                          <select 
                            value={editForm.currentGrade} 
                            onChange={e => setEditForm({...editForm, currentGrade: e.target.value as GradeLevel})} 
                            className={`${inputStyle} pl-20 appearance-none`}
                          >
                            {gradeLevels.map(g => <option key={g} value={g}>{g === 'Graduated' ? t.graduatedAlumni[lang] : `${t.grade[lang]} ${g}`}</option>)}
                          </select>
                        </div>
                     ) : (
                       <div className="flex items-center gap-6 p-8 bg-slate-50 border-4 border-slate-100 rounded-[3rem] font-black text-slate-900 text-2xl">
                          <GraduationCap className="text-yellow-600 w-8 h-8" /> {profileData.currentGrade === 'Graduated' ? t.graduated[lang] : `${t.grade[lang]} ${profileData.currentGrade}`}
                       </div>
                     )}
                  </div>
                )}

                {(userType === 'teacher' || userType === 'student' || userType === 'admin') && (
                  <div className="space-y-4">
                     <label className={labelStyle}>
                      {userType === 'teacher' ? t.primarySubject[lang] : userType === 'admin' ? t.currentPosition[lang] : t.currentJob[lang]}
                     </label>
                     {isEditing ? (
                        <div className="relative">
                          <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-8 h-8" />
                          <input 
                            type="text" 
                            value={userType === 'teacher' ? editForm.subject : editForm.currentRole} 
                            onChange={e => setEditForm({...editForm, [userType === 'teacher' ? 'subject' : 'currentRole']: e.target.value})} 
                            className={`${inputStyle} pl-20`}
                          />
                        </div>
                     ) : (
                       <div className="flex items-center gap-6 p-8 bg-slate-50 border-4 border-slate-100 rounded-[3rem] font-black text-slate-900 text-2xl">
                          <Briefcase className="text-blue-600 w-8 h-8" /> {userType === 'teacher' ? profileData.subject : profileData.currentRole || t.notSpecified[lang]}
                       </div>
                     )}
                  </div>
                )}

                <div className="md:col-span-2 space-y-4">
                   <label className={labelStyle}>{t.bioTitle[lang]}</label>
                   {isEditing ? (
                     <textarea 
                       value={editForm.bio} 
                       onChange={e => setEditForm({...editForm, bio: e.target.value})} 
                       className={`${inputStyle} min-h-[250px] py-10 px-10 resize-none leading-relaxed text-2xl`}
                       placeholder={t.bioPlaceholder[lang]}
                     />
                   ) : (
                     <div className="p-12 bg-slate-50 border-4 border-slate-100 rounded-[4rem] font-bold text-slate-900 text-3xl italic leading-relaxed shadow-inner">
                        "{profileData.bio || t.privateBio[lang]}"
                     </div>
                   )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniProfile;
