import { create } from 'zustand';
import type { Member } from '../types';
import { initialMembers } from '../mock/data';

interface MemberStore {
  members: Member[];
  addMember: (member: Member) => void;
  updateMemberClub: (memberIds: string[], newClubId: string) => void;
}

export const useMemberStore = create<MemberStore>((set) => ({
  members: initialMembers,
  addMember: (member) => set((state) => ({ members: [...state.members, member] })),
  updateMemberClub: (memberIds, newClubId) =>
    set((state) => ({
      members: state.members.map((m) =>
        memberIds.includes(m.id) ? { ...m, clubId: newClubId } : m
      ),
    })),
}));