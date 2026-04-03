/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors, type ThemeName } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ThemeColorOverrides = Partial<Record<ThemeName, string>>;

export function useThemeColor(
  props: ThemeColorOverrides,
  colorName: keyof (typeof Colors)['light']
) {
  const theme = (useColorScheme() ?? 'light') as ThemeName;
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  }
  return Colors[theme][colorName];
}
