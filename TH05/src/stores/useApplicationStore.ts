import { create } from 'zustand';
import { Application } from '../types';
import { initialApplications } from '../mock/data';

interface ApplicationStore {
  applications: Application[];
  selectedRowKeys: string[];
  setSelectedRowKeys: (keys: string[]) => void;
  updateStatus: (id: string, status: Application['status'], reason?: string) => void;
  updateManyStatus: (ids: string[], status: Application['status'], reason?: string) => void;
}

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applications: initialApplications,
  selectedRowKeys: [],
  setSelectedRowKeys: (keys) => set({ selectedRowKeys: keys }),
  updateStatus: (id, status, reason) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        app.id === id
          ? {
              ...app,
              status,
              note: reason,
              history: [
                ...app.history,
                {
                  action: status === 'approved' ? 'approved' : 'rejected',
                  by: 'Admin',
                  timestamp: new Date().toISOString(),
                  reason,
                },
              ],
            }
          : app
      ),
    })),
  updateManyStatus: (ids, status, reason) =>
    set((state) => ({
      applications: state.applications.map((app) =>
        ids.includes(app.id)
          ? {
              ...app,
              status,
              note: reason,
              history: [
                ...app.history,
                {
                  action: status === 'approved' ? 'approved' : 'rejected',
                  by: 'Admin',
                  timestamp: new Date().toISOString(),
                  reason,
                },
              ],
            }
          : app
      ),
      selectedRowKeys: [],
    })),
}));