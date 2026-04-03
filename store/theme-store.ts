import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ThemeName } from '@/constants/theme';

const THEME_ORDER: ThemeName[] = ['light', 'dark', 'ocean'];

type ThemeState = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  cycleTheme: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      cycleTheme: () => {
        const current = get().theme;
        const i = THEME_ORDER.indexOf(current);
        const next = THEME_ORDER[(i + 1) % THEME_ORDER.length];
        set({ theme: next });
      },
    }),
    {
      name: 'app-theme',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
