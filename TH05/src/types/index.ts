// src/types/index.ts
export interface Club {
  id: string;
  avatar?: string;
  name: string;
  foundedDate: string;
  description: string;
  leader: string;
  isActive: boolean;
}

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

export interface ApplicationHistory {
  action: 'approved' | 'rejected';
  by: string;
  timestamp: string;
  reason?: string;
}

export interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  skills: string;
  clubId: string;
  reason: string;
  status: ApplicationStatus;
  note?: string;
  createdAt: string;
  history: ApplicationHistory[];
}

export interface Member {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  skills: string;
  clubId: string;
  joinDate: string;
}