export type UserState = {
  hasCompletedOnboarding: boolean;
  ageGroup: '13-17' | '18+' | null;
  language: 'english' | 'bilingual' | null;
  assessmentScores: {
    phq9?: number;
    gad7?: number;
    pss10?: number;
    cssrsLevel?: 'none' | 'low' | 'moderate' | 'high';
    lastCompleted?: string;
  } | null;
  checkIns: {
    date: string; // ISO string
    mood: number; // 1-5
    energy: number; // 1-5
    stress: number; // 1-5
    note?: string;
  }[];
};

const DEFAULT_STATE: UserState = {
  hasCompletedOnboarding: false,
  ageGroup: null,
  language: null,
  assessmentScores: null,
  checkIns: [],
};

// Extremely simple local-first singleton for this MVP.
// In a production specific app, this would use SQLite/EncryptedStorage.
export const store = {
  get: (): UserState => {
    try {
      const data = localStorage.getItem('sahaay_user_state');
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn("Could not read local storage");
    }
    return DEFAULT_STATE;
  },
  set: (state: Partial<UserState>) => {
    try {
      const current = store.get();
      const updated = { ...current, ...state };
      localStorage.setItem('sahaay_user_state', JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not write local storage");
    }
  },
  addCheckIn: (checkIn: UserState['checkIns'][0]) => {
    const current = store.get();
    store.set({ checkIns: [...current.checkIns, checkIn] });
  },
  clear: () => {
    localStorage.removeItem('sahaay_user_state');
  }
};
