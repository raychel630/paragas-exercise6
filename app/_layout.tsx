import { DarkTheme, DefaultTheme, ThemeProvider, type Theme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useMemo } from 'react';
import 'react-native-reanimated';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: 'index',
};

function useNavigationTheme(): Theme {
  const theme = useColorScheme() ?? 'light';
  return useMemo(() => {
    if (theme === 'dark') {
      return DarkTheme;
    }
    if (theme === 'ocean') {
      return {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: Colors.ocean.tint,
          background: Colors.ocean.background,
          card: '#0f2436',
          text: Colors.ocean.text,
          border: '#1a3a4a',
          notification: Colors.ocean.tint,
        },
      };
    }
    return DefaultTheme;
  }, [theme]);
}

export default function RootLayout() {
  const navigationTheme = useNavigationTheme();
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemeProvider value={navigationTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ title: 'Register' }} />
        <Stack.Screen name="setup-account" options={{ title: 'Account setup' }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={theme === 'light' ? 'dark' : 'light'} />
    </ThemeProvider>
  );
}
