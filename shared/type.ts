export type UserRole = 'guest' | 'alumni' | 'teacher' |'admin';
export type Language = 'en' | 'am' | 'or';
export type GradeLevel = '9' | '10' | '11' | '12' |'Graduated';


export interface User {
    uid: string;
    name: string;
    role: UserRole;
    email: string;
    photoUrl?: string;
    coverPhotoUrl?: string;
    headline?: string;
}

export interface Alumnus{
    userId: string;
    name: string;
    password?: string;
    graduationYear?: number;
    currentGrade: GradeLevel;
    currentRole: string;
    companyOrUniversity: string;
    bio: string;
    headline?: string;
    photoUrl?: string;
    coverPhotoUrl?: string;
    isApproved: boolean;
    role?: UserRole;
}

export interface Teacher{
    id: string;
    name: string;
    email: string;
    password?: string;
    subject: string;
    photoUrl?: string;
    coverPhotoUrl?: string;
    bio: string;
}

export interface AdmissionApplicant {
    id: string;
    fullName: string;
    age: number;
    wereda: string;
    kebele: string;
    schoolName: string;
    graede8Score: number;
    phoneNumber: string;
    timestamp: number;
}

export interface SocialPost {
    id: string;
    authorId: string;
    authorName: string;
    authorPhoto?: string;
    content: string;
    imageUrl?: string;
    fileUrl?: string;
    fileName?: string;
    audioUrl?: string;
    timestamp: number;
    likes: string[]; // Array of user IDs who liked the post
    comments: SocialComment[];
}

export interface SocialComment {
    id: string;
    authorId: string;
    authorName: string;
    content: string;
    timestamp: number;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    senderName: string;
    messageText: string;
    timestamp: number;
}

export interface Announcement {
    id: string;
    title: string;
    content: string;
    datePosted: number;
    isActive: boolean;
    authorName: string;
    imageUrl?: string;
}

export interface DirectNotification {
    id: string;
    title: string;
    content: string;
    dateSent: number;
    target: 'all' | 'teachers' | 'students' | 'grade' | 'individual'; // userId or role
    targetId?: string; // specific userId if target is 'user'
    senderName: string;
}

 export enum PageView {
    HOME = 'HOME',
    ALUMNI_PROFILE = 'ALUMNI_PROFILE',
    ALUMNI_FEED = 'ALUMNI_FEED',
    CHAT = 'CHAT',
    ABOUT = 'ABOUT',
    ADMISSION = 'ADMISSION',
    ADMISSION_REGESTER = 'ADMISSION_REGESTER',
    CURRICULUM = 'CURRICULUM',
    ANNOUNCEMENTS = 'ANNOUNCEMENTS',
    ADMIN = 'ADMIN',
 } 

