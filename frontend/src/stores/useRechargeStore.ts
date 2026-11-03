import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_RECHARGES_KEY, generateMongoId } from '../utils/formUtils';

export interface Recharge {
  id: string;
  userEmail: string;
  amount: number;
  status: string;
  authorizationCode?: string;
  reference: string;
  date: string;
}

interface RechargeState {
  recharges: Recharge[];
  addRecharge: (recharge: Omit<Recharge, 'id' | 'date'>) => void;
  getUserRecharges: (userEmail: string) => Recharge[];
}

export const useRechargeStore = create<RechargeState>()(
  persist(
    (set, get) => ({
      recharges: [],

      addRecharge: (rechargeData) => {
        const newRecharge: Recharge = {
          ...rechargeData,
          id: generateMongoId(),
          date: new Date().toISOString(),
        };
        set((state) => ({
          recharges: [newRecharge, ...state.recharges],
        }));
      },

      getUserRecharges: (userEmail) => {
        return get().recharges.filter((r) => r.userEmail === userEmail);
      },
    }),
    {
      name: STORAGE_RECHARGES_KEY,
    }
  )
);