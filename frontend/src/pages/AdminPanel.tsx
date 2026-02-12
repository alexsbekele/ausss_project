
import React, { useState, useEffect, useRef } from 'react';
import { ApiService } from '@/services/apiService';
import type { Alumnus, Teacher, GradeLevel, AdmissionApplicant, Announcement, Language } from '@shared/types';
import { Users, ChartBar, ClipboardList, Search, UserPlus, Activity, BookOpen, GraduationCap, Trash2, Newspaper, Image as ImageIcon, Send, Megaphone, Calendar, Edit3, X } from 'lucide-react';
import { translations } from '@/locales/translations';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface AdminPanelProps {
  forceTab?: 'announcements_admin' | 'registration' | 'community' | 'admission_score' | 'applicants';
  onViewProfile?: (userId: string) => void;
  isAdmin?: boolean;
  lang: Language;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ forceTab, onViewProfile, isAdmin, lang }) => {
  const t = translations.admin;
  const [activeTab, setActiveTab] = useState(forceTab || 'community');
  const [allAlumni, setAllAlumni] = useState<Alumnus[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [applicants, setApplicants] = useState<AdmissionApplicant[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [threshold, setThreshold] = useState<number | string>(0);
  const [savedThreshold, setSavedThreshold] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [regRole, setRegRole] = useState<'alumni' | 'teacher'>('alumni');

  // New Announcement States
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annImage, setAnnImage] = useState<string | null>(null);
  const [editingAnnId, setEditingAnnId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (forceTab) setActiveTab(forceTab);
  }, [forceTab]);

  const refreshData = async () => {
    const alumni = await ApiService.getAllAlumni();
    const teachersList = await ApiService.getTeachers();
    const applicantsList = await ApiService.getApplicants();
    const announcementsList = await ApiService.getAnnouncements();
    const currentThreshold = await ApiService.getThreshold();

    setAllAlumni(alumni);
    setTeachers(teachersList);
    setApplicants(applicantsList);
    setAnnouncements(announcementsList);
    setThreshold(currentThreshold);
    setSavedThreshold(currentThreshold);
  };

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) {
        alert("Please provide both a title and content.");
        return;
    }

    if (editingAnnId) {
        const existing = announcements.find(a => a.id === editingAnnId);
        if (existing) {
            const updated: Announcement = {
                ...existing,
                title: annTitle,
                content: annContent,
                imageUrl: annImage || undefined
            };
            await ApiService.updateAnnouncement(updated);
            alert("Announcement updated successfully!");
        }
    } else {
        const newAnnouncement: Announcement = {
            id: `ann_${Date.now()}`,
            title: annTitle,
            content: annContent,
            datePosted: Date.now(),
            isActive: true,
            authorName: isAdmin ? 'School Administration' : 'Staff',
            imageUrl: annImage || undefined
        };
        await ApiService.addAnnouncement(newAnnouncement);
        alert("Announcement published successfully!");
    }

    setAnnTitle('');
    setAnnContent('');
    setAnnImage(null);
    setEditingAnnId(null);
    refreshData();
  };

  const handleEditAnnouncement = (ann: Announcement) => {
    setAnnTitle(ann.title);
    setAnnContent(ann.content);
    setAnnImage(ann.imageUrl || null);
    setEditingAnnId(ann.id);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this announcement?")) return;
    await ApiService.deleteAnnouncement(id);
    refreshData();
    if (editingAnnId === id) {
        setAnnTitle('');
        setAnnContent('');
        setAnnImage(null);
        setEditingAnnId(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setAnnImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  const handleUpdateThreshold = async (e: React.FormEvent) => {
    e.preventDefault();
    if (threshold === '' || Number(threshold) === 0) {
      alert("please put the limit our the score!");
      return;
    }
    const val = Number(threshold);
    await ApiService.setThreshold(val);
    setSavedThreshold(val);
    alert(`Admission score threshold updated to ${val}%`);
  };

  const handleRemoveMember = async (e: React.MouseEvent, id: string, type: string) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!isAdmin) {
      alert("Insufficient permissions. Only administrators can delete members.");
      return;
    }

    const confirmMessage = type === 'TEACHER' 
      ? 'Are you sure you want to remove this Teacher? Their account will be permanently deleted.' 
      : 'Are you sure you want to remove this Student/Alumnus?';

    if (!window.confirm(confirmMessage)) return;

    if (type === 'TEACHER') {
      await ApiService.deleteTeacher(id);
      setTeachers(prev => prev.filter(t => t.id !== id));
    } else {
      await ApiService.deleteAlumnus(id);
      setAllAlumni(prev => prev.filter(a => a.userId !== id));
    }
    
    alert("Member has been removed from the school portal.");
  };

  const handleRegisterMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;

    if (regRole === 'teacher') {
      const subject = (form.elements.namedItem('subject') as HTMLInputElement).value;
      const newTeacher: Teacher = {
        id: `t_${Date.now()}`,
        name,
        email,
        password: 'teacher123',
        subject,
        bio: `${subject} teacher at AUSSS.`
      };
      await ApiService.addTeacher(newTeacher);
    } else {
      const regGrade = (form.elements.namedItem('regGrade') as HTMLSelectElement).value as GradeLevel;
      const alumnus: Alumnus = {
        userId: `mem_${Date.now()}`,
        name,
        email,
        password: 'ausss123',
        currentGrade: regGrade,
        currentRole: regGrade === 'Graduated' ? 'Alumni' : 'Student',
        companyOrUniversity: 'AUSSS',
        bio: '',
        isApproved: true
      };
      await ApiService.addAlumnus(alumnus);
    }

    refreshData();
    form.reset();
    alert('Member registered successfully.');
  };

  const allMembers = [
    ...teachers.map(t => ({ 
      id: t.id, 
      name: t.name, 
      info: t.subject, 
      type: 'TEACHER', 
      photo: t.photoUrl, 
      badgeLabel: 'Teacher' 
    })),
    ...allAlumni.map(a => ({ 
        id: a.userId, 
        name: a.name, 
        info: a.currentGrade === 'Graduated' ? 'Alumni' : `Grade ${a.currentGrade}`, 
        type: 'STUDENT', 
        photo: a.photoUrl,
        badgeLabel: a.currentGrade === 'Graduated' ? 'Graduated' : 'Student'
    }))
  ].filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const gradCount = allAlumni.filter(a => a.currentGrade === 'Graduated').length;
  const studentCount = allAlumni.filter(a => a.currentGrade !== 'Graduated').length;

  return (
    <div className="space-y-12 pb-12">
      {activeTab === 'announcements_admin' && (
        <div className="grid xl:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
          {/* Post Creation Form */}
          <Card className="p-12 space-y-10 h-fit">
            <div className="flex items-center gap-6 mb-4">
                <div className="p-5 bg-yellow-50 rounded-3xl">
                    <Megaphone className="text-yellow-600 w-12 h-12" />
                </div>
                <div>
                    <h3 className="text-4xl font-black text-slate-900 tracking-tight">
                      {editingAnnId ? t.announcements.editTitle[lang] : t.announcements.title[lang]}
                    </h3>
                    <p className="text-slate-500 font-bold">This will appear on the main website dashboard.</p>
                </div>
                {editingAnnId && (
                    <Button 
                        onClick={() => {
                            setEditingAnnId(null);
                            setAnnTitle('');
                            setAnnContent('');
                            setAnnImage(null);
                        }}
                        variant="outline"
                        icon={X}
                        className="ml-auto p-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200"
                        title="Cancel Editing"
                    />
                )}
            </div>

            <form onSubmit={handlePostAnnouncement} className="space-y-8">
                <div className="space-y-3">
                    <label className="text-xs font-black text-black uppercase tracking-widest ml-2">{t.announcements.headline[lang]}</label>
                    <input 
                        type="text" 
                        value={annTitle} 
                        onChange={e => setAnnTitle(e.target.value)}
                        className="w-full p-8 bg-slate-50 border-4 border-slate-100 rounded-[2.5rem] font-black text-2xl text-slate-900 placeholder:text-slate-300 focus:border-yellow-400 focus:bg-white transition-all outline-none" 
                        //placeholder="Ex: Entrance Exam Date Scheduled" 
                        required 
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-black text-black uppercase tracking-widest ml-2">{t.announcements.content[lang]}</label>
                    <textarea 
                        value={annContent} 
                        onChange={e => setAnnContent(e.target.value)}
                        className="w-full p-8 bg-slate-50 border-4 border-slate-100 rounded-[2.5rem] font-bold text-xl text-slate-900 placeholder:text-slate-300 focus:border-yellow-400 focus:bg-white transition-all outline-none h-64 resize-none leading-relaxed" 
                        //placeholder="Write details about the announcement here..." 
                        required 
                    />
                </div>

                <div className="space-y-3">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">{t.announcements.image[lang]}</label>
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="relative group cursor-pointer border-4 border-dashed border-slate-200 rounded-[2.5rem] p-12 text-center hover:border-yellow-400 hover:bg-yellow-50 transition-all overflow-hidden"
                    >
                        {annImage ? (
                            <img src={annImage} className="absolute inset-0 w-full h-full object-cover opacity-80" alt="Preview" />
                        ) : null}
                        
                        <div className="relative z-10 space-y-4">
                            <div className="bg-white p-4 rounded-2xl w-fit mx-auto shadow-xl">
                                <ImageIcon className="w-10 h-10 text-slate-400 group-hover:text-yellow-600 transition-colors" />
                            </div>
                            <p className="font-black text-slate-900 text-lg">{annImage ? 'Change Selected Image' : 'Upload Featured Image'}</p>
                            <p className="text-slate-400 font-bold text-sm">Best size: 1200x600px. Click to browse.</p>
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                    </div>
                </div>

                <Button 
                  type="submit" 
                  fullWidth 
                  size="lg"
                  icon={Send}
                  variant="primary"
                >
                  {editingAnnId ? t.announcements.update[lang] : t.announcements.publish[lang]}
                </Button>
            </form>
          </Card>

          {/* Manage Existing Section */}
          <div className="bg-slate-50 p-12 rounded-[4rem] border-2 border-slate-100 space-y-10 overflow-y-auto max-h-[1200px]">
            <h3 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                <Activity className="text-slate-400 w-10 h-10" /> {t.announcements.recentActivity[lang]}
            </h3>
            
            <div className="space-y-6">
                {announcements.map(ann => (
                    <div key={ann.id} className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-slate-200 flex gap-6 items-center group hover:border-yellow-400 transition-all">
                        <div className="w-24 h-24 rounded-[1.5rem] bg-slate-100 flex-shrink-0 overflow-hidden border-2 border-slate-50">
                            {ann.imageUrl ? (
                                <img src={ann.imageUrl} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Newspaper className="w-10 h-10 text-slate-200" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xl font-black text-slate-900 line-clamp-1">{ann.title}</h4>
                            <div className="flex items-center gap-3 mt-1 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <Calendar className="w-3 h-3" /> {new Date(ann.datePosted).toLocaleDateString()}
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                                onClick={() => handleEditAnnouncement(ann)}
                                variant="outline"
                                icon={Edit3}
                                className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white shadow-sm"
                                title="Edit"
                            />
                            <Button 
                                onClick={() => handleDeleteAnnouncement(ann.id)}
                                variant="danger"
                                icon={Trash2}
                                className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white shadow-sm"
                                title="Delete"
                            />
                        </div>
                    </div>
                ))}
                {announcements.length === 0 && (
                    <div className="text-center py-20 text-slate-400 font-black italic text-xl">{t.announcements.noAnnouncements[lang]}</div>
                )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'community' && (
        <div className="space-y-12 animate-in fade-in duration-700">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <h3 className="text-5xl font-black text-slate-900 tracking-tight">{t.community?.title?.[lang] || 'School Community'}</h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-black uppercase tracking-widest">
                  <BookOpen className="w-4 h-4" /> {studentCount} {t.community?.students?.[lang] || 'Students'}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-black uppercase tracking-widest">
                  <Users className="w-4 h-4" /> {teachers.length} {t.community?.teachers?.[lang] || 'Teachers'}
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-black uppercase tracking-widest">
                  <GraduationCap className="w-4 h-4" /> {gradCount} {t.community?.graduates?.[lang] || 'Graduates'}
                </div>
              </div>
            </div>

            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-yellow-600 transition-colors" />
              <input 
                type="text" 
                placeholder={t.community?.search?.[lang] || 'Search members...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-6 bg-white border-4 border-slate-100 rounded-3xl font-bold text-lg outline-none focus:border-yellow-400 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {allMembers.map((member) => (
              <Card 
                key={member.id} 
                className="group cursor-pointer p-8 flex items-center gap-6 hover:translate-y-[-4px]"
                onClick={() => onViewProfile?.(member.id)}
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden border-2 border-slate-50">
                    {member.photo ? (
                      <img src={member.photo} className="w-full h-full object-cover" alt={member.name} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Users className="w-10 h-10" />
                      </div>
                    )}
                  </div>
                  <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white shadow-lg ${member.type === 'TEACHER' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                    {member.badgeLabel}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-black text-slate-900 group-hover:text-yellow-600 transition-colors">{member.name}</h4>
                  <p className="text-slate-400 font-bold text-sm">{member.info}</p>
                </div>
                {isAdmin && (
                  <Button 
                    onClick={(e) => handleRemoveMember(e, member.id, member.type)}
                    variant="danger"
                    icon={Trash2}
                    className="p-3 bg-red-50 text-red-600 rounded-xl opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:text-white"
                  />
                )}
              </Card>
            ))}
            {allMembers.length === 0 && (
              <div className="col-span-full text-center py-20 text-slate-400 font-black italic text-xl">
                No members found matching your search.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'admission_score' && (
        <Card className="max-w-2xl mx-auto p-16 animate-in slide-in-from-top-12 duration-700">
          <div className="flex items-center gap-6 mb-12">
            <div className="p-5 bg-yellow-50 rounded-3xl">
              <ChartBar className="text-yellow-600 w-12 h-12" />
            </div>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">{t.admissionScore.title[lang]}</h3>
          </div>

          <form onSubmit={handleUpdateThreshold} className="space-y-10">
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">{t.admissionScore.threshold[lang]}</label>
              <input 
                type="number" 
                min="0" 
                max="100" 
                value={threshold}
                onChange={e => setThreshold(e.target.value)}
                className="w-full p-8 bg-slate-50 border-4 border-slate-100 rounded-[2.5rem] font-black text-6xl text-slate-900 text-center outline-none focus:border-yellow-400 focus:bg-white transition-all shadow-inner" 
                placeholder="75"
              />
              <p className="text-center text-slate-400 font-bold">Currently set to: <span className="text-slate-900">{savedThreshold}%</span></p>
            </div>

            <Button type="submit" fullWidth size="lg" variant="primary">
              {t.admissionScore.updateThreshold[lang]}
            </Button>
          </form>
        </Card>
      )}

      {activeTab === 'applicants' && (
        <div className="space-y-12 animate-in fade-in duration-700">
          <div className="flex items-center gap-6">
            <div className="p-5 bg-yellow-50 rounded-3xl">
              <ClipboardList className="text-yellow-600 w-12 h-12" />
            </div>
            <h3 className="text-5xl font-black text-slate-900 tracking-tight">{t.applicants?.title?.[lang] || 'Admission Applicants'}</h3>
          </div>

          <div className="grid gap-6">
            {applicants.map(app => (
              <Card key={app.id} className="p-8 flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-slate-300">
                    <Users className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-2xl font-black text-slate-900">{app.fullName}</h4>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">{app.grade8Score}% Score</span>
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${app.grade8Score >= Number(savedThreshold) ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {app.grade8Score >= Number(savedThreshold) ? 'Qualified' : 'Below Threshold'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="text-right">
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{app.wereda}</p>
                      <p className="text-lg font-black text-slate-900">{app.phoneNumber}</p>
                   </div>
                </div>
              </Card>
            ))}
            {applicants.length === 0 && (
              <div className="text-center py-32 text-slate-400 font-black italic text-2xl">No admission applications yet.</div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'registration' && (
        <Card className="max-w-4xl mx-auto p-16 animate-in zoom-in-95 duration-500">
          <div className="flex items-center gap-6 mb-12">
            <div className="p-5 bg-yellow-50 rounded-3xl">
              <UserPlus className="text-yellow-600 w-12 h-12" />
            </div>
            <h3 className="text-4xl font-black text-slate-900 tracking-tight">{t.registration.title[lang]}</h3>
          </div>
          
          <form onSubmit={handleRegisterMember} className="space-y-10">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">{t.registration.name[lang]}</label>
                <input name="name" type="text" required className="w-full p-6 bg-slate-50 border-4 border-slate-100 rounded-3xl font-bold text-xl outline-none focus:border-yellow-400 focus:bg-white transition-all" />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">{t.registration.email[lang]}</label>
                <input name="email" type="email" required className="w-full p-6 bg-slate-50 border-4 border-slate-100 rounded-3xl font-bold text-xl outline-none focus:border-yellow-400 focus:bg-white transition-all" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">Role & Assignment</label>
              <div className="flex gap-4 p-2 bg-slate-100 rounded-3xl">
                <button type="button" onClick={() => setRegRole('alumni')} className={`flex-1 py-5 rounded-2xl font-black text-lg transition-all ${regRole === 'alumni' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:bg-slate-200'}`}>STUDENT / ALUMNI</button>
                <button type="button" onClick={() => setRegRole('teacher')} className={`flex-1 py-5 rounded-2xl font-black text-lg transition-all ${regRole === 'teacher' ? 'bg-white text-slate-900 shadow-xl' : 'text-slate-500 hover:bg-slate-200'}`}>TEACHER</button>
              </div>
            </div>

            {regRole === 'teacher' ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">{t.registration.subject[lang]}</label>
                <input name="subject" type="text" required className="w-full p-6 bg-slate-50 border-4 border-slate-100 rounded-3xl font-bold text-xl outline-none focus:border-yellow-400 focus:bg-white transition-all" placeholder="e.g. Mathematics" />
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-2">{t.registration.grade[lang]}</label>
                <select name="regGrade" className="w-full p-6 bg-slate-50 border-4 border-slate-100 rounded-3xl font-bold text-xl outline-none focus:border-yellow-400 focus:bg-white transition-all appearance-none">
                  {['9', '10', '11', '12', 'Graduated'].map(g => <option key={g} value={g}>{g === 'Graduated' ? 'Graduated (Alumni)' : `Grade ${g}`}</option>)}
                </select>
              </div>
            )}

            <Button type="submit" fullWidth size="lg" variant="primary">
              {t.registration.register[lang]}
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
};

export default AdminPanel;
