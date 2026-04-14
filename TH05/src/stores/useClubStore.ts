import { create } from 'zustand';
import type { Club } from '../types';
import { initialClubs } from '../mock/data';

interface ClubStore {
  clubs: Club[];
  addClub: (club: Omit<Club, 'id'>) => void;
  updateClub: (club: Club) => void;
  deleteClub: (id: string) => void;
}

export const useClubStore = create<ClubStore>((set) => ({
  clubs: initialClubs,
  addClub: (clubData) =>
    set((state) => ({
      clubs: [...state.clubs, { ...clubData, id: Date.now().toString() }],
    })),
  updateClub: (updatedClub) =>
    set((state) => ({
      clubs: state.clubs.map((c) => (c.id === updatedClub.id ? updatedClub : c)),
    })),
  deleteClub: (id) =>
    set((state) => ({ clubs: state.clubs.filter((c) => c.id !== id) })),
}));