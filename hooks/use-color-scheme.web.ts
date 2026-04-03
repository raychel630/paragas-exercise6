import { useThemeStore } from '@/store/theme-store';

/**
 * Same persisted theme as native; avoids OS scheme so the app theme stays in sync everywhere.
 */
export function useColorScheme() {
  return useThemeStore((s) => s.theme);
}
