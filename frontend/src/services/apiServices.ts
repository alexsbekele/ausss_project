import { Alumnus, ChatMessage, Announcement, DirectNotification, SocialPost, SocialComment, Teacher, GradeLevel, AdmissionApplicant, User } from '@shared/types';

const API_BASE = '/api';

export const ApiService = {
  // Auth
  login: async (email: string, password: string): Promise<User | null> => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) return null;
      return res.json();
    } catch (e) {
      console.error('Login failed', e);
      return null;
    }
  },

  // Teachers
  getTeachers: async (): Promise<Teacher[]> => {
    const res = await fetch(`${API_BASE}/teachers`);
    return res.json();
  },

  getTeacherById: async (id: string): Promise<Teacher | null> => {
    const res = await fetch(`${API_BASE}/teachers/${id}`);
    if (!res.ok) return null;
    return res.json();
  },

  updateTeacher: async (teacher: Teacher): Promise<void> => {
    await fetch(`${API_BASE}/teachers`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacher)
    });
  },

  addTeacher: async (teacher: Teacher): Promise<Teacher[]> => {
    const res = await fetch(`${API_BASE}/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacher)
    });
    return res.json();
  },

  // Alumni
  getAllAlumni: async (): Promise<Alumnus[]> => {
    const res = await fetch(`${API_BASE}/alumni`);
    return res.json();
  },

  getAlumnusById: async (id: string): Promise<Alumnus | null> => {
    const res = await fetch(`${API_BASE}/alumni/${id}`);
    if (!res.ok) return null;
    return res.json();
  },

  updateAlumnus: async (alumnus: Alumnus): Promise<void> => {
    await fetch(`${API_BASE}/alumni`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumnus)
    });
  },

  approveAlumnus: async (id: string): Promise<void> => {
    await fetch(`${API_BASE}/alumni/approve/${id}`, { method: 'POST' });
  },

  registerAlumnus: async (alumnus: Alumnus): Promise<Alumnus> => {
    const res = await fetch(`${API_BASE}/alumni/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumnus)
    });
    return res.json();
  },

  // Announcements
  getAnnouncements: async (): Promise<Announcement[]> => {
    const res = await fetch(`${API_BASE}/announcements`);
    return res.json();
  },

  addAnnouncement: async (announcement: Announcement): Promise<Announcement> => {
    const res = await fetch(`${API_BASE}/announcements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcement)
    });
    return res.json();
  },

  deleteAnnouncement: async (id: string): Promise<void> => {
    await fetch(`${API_BASE}/announcements/${id}`, { method: 'DELETE' });
  },

  updateAnnouncement: async (announcement: Announcement): Promise<void> => {
    await fetch(`${API_BASE}/announcements`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(announcement)
    });
  },

  deleteTeacher: async (id: string): Promise<Teacher[]> => {
    const res = await fetch(`${API_BASE}/teachers/${id}`, { method: 'DELETE' });
    return res.json();
  },

  deleteAlumnus: async (id: string): Promise<Alumnus[]> => {
    const res = await fetch(`${API_BASE}/alumni/${id}`, { method: 'DELETE' });
    return res.json();
  },

  addAlumnus: async (alumnus: Alumnus): Promise<Alumnus[]> => {
    const res = await fetch(`${API_BASE}/alumni/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alumnus)
    });
    return res.json();
  },

  // Admission
  getApplicants: async (): Promise<AdmissionApplicant[]> => {
    const res = await fetch(`${API_BASE}/admission/applicants`);
    return res.json();
  },

  apply: async (applicant: AdmissionApplicant): Promise<AdmissionApplicant> => {
    const res = await fetch(`${API_BASE}/admission/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(applicant)
    });
    return res.json();
  },

  getThreshold: async (): Promise<number> => {
    const res = await fetch(`${API_BASE}/admission/threshold`);
    const data = await res.json();
    return data.threshold;
  },

  setThreshold: async (threshold: number): Promise<void> => {
    await fetch(`${API_BASE}/admission/threshold`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ threshold })
    });
  },

  // Posts
  getPosts: async (): Promise<SocialPost[]> => {
    const res = await fetch(`${API_BASE}/posts`);
    return res.json();
  },

  addPost: async (post: SocialPost): Promise<SocialPost> => {
    const res = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    });
    return res.json();
  },

  addComment: async (postId: string, comment: SocialComment): Promise<SocialComment> => {
    const res = await fetch(`${API_BASE}/posts/${postId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    });
    return res.json();
  },

  deletePost: async (postId: string): Promise<void> => {
    await fetch(`${API_BASE}/posts/${postId}`, { method: 'DELETE' });
  },

  toggleLike: async (postId: string, userId: string): Promise<void> => {
    await fetch(`${API_BASE}/posts/${postId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
  },

  deleteComment: async (postId: string, commentId: string): Promise<void> => {
    await fetch(`${API_BASE}/posts/${postId}/comments/${commentId}`, { method: 'DELETE' });
  }
};
