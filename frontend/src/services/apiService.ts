import type { Alumnus, Announcement, SocialPost, SocialComment, Teacher, AdmissionApplicant, User } from '../../../backend/types';

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

  forgotPassword: async (email: string): Promise<{ message: string; error?: string }> => {
    try {
      const res = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return await res.json();
      } else {
        const text = await res.text();
        console.error('Non-JSON response from forgot-password:', text);
        return { 
          message: 'Failed to request password reset', 
          error: `Server error (${res.status}): ${text.substring(0, 50)}...` 
        };
      }
    } catch (e) {
      console.error('Forgot password request failed', e);
      return { message: 'Failed to request password reset', error: 'Network error - please check if server is running' };
    }
  },

  updateAdmin: async (adminData: any): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/auth/admin`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminData)
      });
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || `Failed to update admin (${res.status})`);
      }
    } catch (e) {
      console.error('Failed to update admin', e);
      throw e;
    }
  },

  getAdmin: async (): Promise<any> => {
    try {
      const res = await fetch(`${API_BASE}/auth/admin`);
      if (!res.ok) return null;
      return res.json();
    } catch (e) {
      console.error('Failed to get admin', e);
      return null;
    }
  },

  // Teachers
  getTeachers: async (): Promise<Teacher[]> => {
    try {
      const res = await fetch(`${API_BASE}/teachers`);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Failed to get teachers', e);
      return [];
    }
  },

  getTeacherById: async (id: string): Promise<Teacher | null> => {
    try {
      const res = await fetch(`${API_BASE}/teachers/${id}`);
      if (!res.ok) return null;
      return res.json();
    } catch (e) {
      console.error('Failed to get teacher', e);
      return null;
    }
  },

  updateTeacher: async (teacher: Teacher): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/teachers`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher)
      });
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || `Failed to update teacher (${res.status})`);
      }
    } catch (e) {
      console.error('Failed to update teacher', e);
      throw e;
    }
  },

  addTeacher: async (teacher: Teacher): Promise<Teacher[]> => {
    try {
      const res = await fetch(`${API_BASE}/teachers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher)
      });
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || `Failed to add teacher (${res.status})`);
      }
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Failed to add teacher', e);
      throw e;
    }
  },

  // Alumni
  getAllAlumni: async (): Promise<Alumnus[]> => {
    try {
      const res = await fetch(`${API_BASE}/alumni`);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Failed to get alumni', e);
      return [];
    }
  },

  getAlumnusById: async (id: string): Promise<Alumnus | null> => {
    try {
      const res = await fetch(`${API_BASE}/alumni/${id}`);
      if (!res.ok) return null;
      return res.json();
    } catch (e) {
      console.error('Failed to get alumnus', e);
      return null;
    }
  },

  updateAlumnus: async (alumnus: Alumnus): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/alumni`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alumnus)
      });
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || `Failed to update alumnus (${res.status})`);
      }
    } catch (e) {
      console.error('Failed to update alumnus', e);
      throw e;
    }
  },

  approveAlumnus: async (id: string): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/alumni/approve/${id}`, { method: 'POST' });
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || `Failed to approve alumnus (${res.status})`);
      }
    } catch (e) {
      console.error('Failed to approve alumnus', e);
      throw e;
    }
  },

  registerAlumnus: async (alumnus: Alumnus): Promise<Alumnus | null> => {
    try {
      const res = await fetch(`${API_BASE}/alumni/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alumnus)
      });
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || `Failed to register alumnus (${res.status})`);
      }
      return await res.json();
    } catch (e) {
      console.error('Failed to register alumnus', e);
      throw e;
    }
  },

  // Announcements
  getAnnouncements: async (): Promise<Announcement[]> => {
    try {
      const res = await fetch(`${API_BASE}/announcements`);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Failed to get announcements', e);
      return [];
    }
  },

  addAnnouncement: async (announcement: Announcement): Promise<Announcement | null> => {
    try {
      const res = await fetch(`${API_BASE}/announcements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcement)
      });
      if (!res.ok) return null;
      return res.json();
    } catch (e) {
      console.error('Failed to add announcement', e);
      return null;
    }
  },

  deleteAnnouncement: async (id: string): Promise<void> => {
    try {
      await fetch(`${API_BASE}/announcements/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete announcement', e);
    }
  },

  updateAnnouncement: async (announcement: Announcement): Promise<void> => {
    try {
      await fetch(`${API_BASE}/announcements`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcement)
      });
    } catch (e) {
      console.error('Failed to update announcement', e);
    }
  },

  deleteTeacher: async (id: string): Promise<Teacher[]> => {
    try {
      const res = await fetch(`${API_BASE}/teachers/${id}`, { method: 'DELETE' });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Failed to delete teacher', e);
      return [];
    }
  },

  deleteAlumnus: async (id: string): Promise<Alumnus[]> => {
    try {
      const res = await fetch(`${API_BASE}/alumni/${id}`, { method: 'DELETE' });
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Failed to delete alumnus', e);
      return [];
    }
  },

  addAlumnus: async (alumnus: Alumnus): Promise<Alumnus[]> => {
    try {
      const res = await fetch(`${API_BASE}/alumni/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(alumnus)
      });
      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || `Failed to add alumnus (${res.status})`);
      }
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Failed to add alumnus', e);
      throw e;
    }
  },

  // Admission
  getApplicants: async (): Promise<AdmissionApplicant[]> => {
    try {
      const res = await fetch(`${API_BASE}/admission/applicants`);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Failed to get applicants', e);
      return [];
    }
  },

  apply: async (applicant: AdmissionApplicant): Promise<AdmissionApplicant | null> => {
    try {
      const res = await fetch(`${API_BASE}/admission/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicant)
      });
      if (!res.ok) return null;
      return res.json();
    } catch (e) {
      console.error('Failed to apply', e);
      return null;
    }
  },

  getThreshold: async (): Promise<number> => {
    try {
      const res = await fetch(`${API_BASE}/admission/threshold`);
      if (!res.ok) return 0;
      const data = await res.json();
      return data.threshold || 0;
    } catch (e) {
      console.error('Failed to get threshold', e);
      return 0;
    }
  },

  setThreshold: async (threshold: number): Promise<void> => {
    try {
      await fetch(`${API_BASE}/admission/threshold`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threshold })
      });
    } catch (e) {
      console.error('Failed to set threshold', e);
    }
  },

  // Posts
  getPosts: async (): Promise<SocialPost[]> => {
    try {
      const res = await fetch(`${API_BASE}/posts`);
      if (!res.ok) return [];
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('Failed to get posts', e);
      return [];
    }
  },

  addPost: async (post: SocialPost): Promise<SocialPost | null> => {
    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      if (!res.ok) return null;
      return res.json();
    } catch (e) {
      console.error('Failed to add post', e);
      return null;
    }
  },

  addComment: async (postId: string, comment: SocialComment): Promise<SocialComment | null> => {
    try {
      const res = await fetch(`${API_BASE}/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
      });
      if (!res.ok) return null;
      return res.json();
    } catch (e) {
      console.error('Failed to add comment', e);
      return null;
    }
  },

  deletePost: async (postId: string): Promise<void> => {
    try {
      await fetch(`${API_BASE}/posts/${postId}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete post', e);
    }
  },

  toggleLike: async (postId: string, userId: string): Promise<void> => {
    try {
      await fetch(`${API_BASE}/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
    } catch (e) {
      console.error('Failed to toggle like', e);
    }
  },

  deleteComment: async (postId: string, commentId: string): Promise<void> => {
    try {
      await fetch(`${API_BASE}/posts/${postId}/comments/${commentId}`, { method: 'DELETE' });
    } catch (e) {
      console.error('Failed to delete comment', e);
    }
  }
};
