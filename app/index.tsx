import { Pressable, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useThemeStore } from '@/store/theme-store';

type LoginFormValues = {
  email: string;
  password: string;
};

const THEME_LABELS: Record<string, string> = {
  light: 'Light',
  dark: 'Dark',
  ocean: 'Ocean',
};

export default function LoginScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const cycleTheme = useThemeStore((s) => s.cycleTheme);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {
    router.replace('/home');
  };

  const navigateToRegister = () => {
    router.push('/register');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={styles.spacer} />
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
        </View>
        <ThemedText type="title" style={styles.title}>
          Sign in
        </ThemedText>

        <ThemedView style={styles.fieldGroup}>
          <ThemedText>Email</ThemedText>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.email
                      ? '#e5484d'
                      : Colors[colorScheme].tabIconDefault,
                    color: Colors[colorScheme].text,
                  },
                ]}
                placeholder="you@example.com"
                placeholderTextColor={Colors[colorScheme].icon}
                autoCapitalize="none"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && (
            <ThemedText style={styles.errorText}>{errors.email.message}</ThemedText>
          )}
        </ThemedView>

        <ThemedView style={styles.fieldGroup}>
          <ThemedText>Password</ThemedText>
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    borderColor: errors.password
                      ? '#e5484d'
                      : Colors[colorScheme].tabIconDefault,
                    color: Colors[colorScheme].text,
                  },
                ]}
                placeholder="••••••••"
                placeholderTextColor={Colors[colorScheme].icon}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && (
            <ThemedText style={styles.errorText}>{errors.password.message}</ThemedText>
          )}
        </ThemedView>

        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.primaryButton, { backgroundColor: Colors[colorScheme].tint }]}
          onPress={handleSubmit(onSubmit)}>
          <ThemedText type="defaultSemiBold" style={styles.primaryButtonText}>
            Continue
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={navigateToRegister}>
          <ThemedText style={styles.secondaryButtonText}>
            Don&apos;t have an account? Register
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -4,
  },
  spacer: {
    flex: 1,
  },
  themeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  themeChipText: {
    fontSize: 13,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  title: {
    marginBottom: 8,
  },
  fieldGroup: {
    gap: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  errorText: {
    color: '#e5484d',
    fontSize: 12,
  },
  primaryButton: {
    marginTop: 12,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 14,
  },
});

