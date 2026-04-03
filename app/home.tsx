import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeStore } from '@/store/theme-store';

const THEME_LABELS: Record<string, string> = {
  light: 'Light',
  dark: 'Dark',
  ocean: 'Ocean',
};

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? 'light';
  const cycleTheme = useThemeStore((s) => s.cycleTheme);
  const { photoUrl } = useLocalSearchParams<{ photoUrl?: string }>();

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cycle app theme"
          onPress={cycleTheme}
          style={({ pressed }) => [
            styles.themeChip,
            {
              backgroundColor: Colors[colorScheme].tabIconDefault + '35',
              opacity: pressed ? 0.85 : 1,
            },
          ]}>
          <ThemedText type="defaultSemiBold" style={styles.themeChipText}>
            {THEME_LABELS[colorScheme] ?? colorScheme}
          </ThemedText>
        </Pressable>
        <View style={styles.spacer} />
        <View
          style={[
            styles.avatar,
            { backgroundColor: Colors[colorScheme].tabIconDefault + '30' },
          ]}>
          {photoUrl ? (
            <Image
              source={{ uri: photoUrl }}
              style={styles.avatarImage}
              contentFit="cover"
            />
          ) : (
            <ThemedText style={styles.avatarEmoji}>👤</ThemedText>
          )}
        </View>
      </View>

      <View style={styles.center}>
        <ThemedText type="title" style={styles.welcomeText}>
          Hello and Welcome!
        </ThemedText>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 12,
  },
  themeChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  themeChipText: {
    fontSize: 14,
  },
  spacer: {
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarEmoji: {
    fontSize: 22,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  welcomeText: {
    textAlign: 'center',
  },
});
