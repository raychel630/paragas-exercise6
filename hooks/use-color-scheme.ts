import { useThemeStore } from '@/store/theme-store';

/** Active app theme (user choice, persisted). Not the OS color scheme. */
export function useColorScheme() {
  return useThemeStore((s) => s.theme);
}
