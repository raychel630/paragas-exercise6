import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = useWatch({
    control,
    name: 'password',
  });

  const onSubmit = () => {
    router.replace('/setup-account');
  };

  const goBackToLogin = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        bounces={false}>
        <ThemedView style={styles.card}>
          <ThemedText type="title" style={styles.title}>
            Create account
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
              render={({ field: { onChange, onBlur, value} }) => (
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

          <ThemedView style={styles.fieldGroup}>
            <ThemedText>Confirm password</ThemedText>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Please confirm your password',
                validate: (value) =>
                  value === passwordValue || 'Passwords do not match',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: errors.confirmPassword
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
            {errors.confirmPassword && (
              <ThemedText style={styles.errorText}>
                {errors.confirmPassword.message}
              </ThemedText>
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

          <TouchableOpacity style={styles.secondaryButton} onPress={goBackToLogin}>
            <ThemedText style={styles.secondaryButtonText}>Back to sign in</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: 'center',
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

