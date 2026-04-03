import { useState } from 'react';
import { Image } from 'expo-image';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';

import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type SetupFormValues = {
  photoUrl: string;
  firstName: string;
  lastName: string;
};

export default function SetupAccountScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SetupFormValues>({
    defaultValues: {
      photoUrl: '',
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = (data: SetupFormValues) => {
    router.replace({
      pathname: '/home',
      params: data.photoUrl ? { photoUrl: data.photoUrl } : {},
    });
  };

  return (
    <ThemedView style={styles.root}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        bounces={false}>
        <ThemedView style={styles.card}>
          <ThemedText type="title" style={styles.title}>
            Set up your profile
          </ThemedText>

          <View style={styles.photoRow}>
            <View style={styles.avatarShell}>
              {previewUrl ? (
                <Image
                  source={{ uri: previewUrl }}
                  style={styles.avatarImage}
                  contentFit="cover"
                />
              ) : (
                <ThemedText style={styles.avatarInitials}>👤</ThemedText>
              )}
            </View>
            <ThemedView style={[styles.fieldGroup, styles.photoField]}>
              <ThemedText>Profile photo URL (optional)</ThemedText>
              <Controller
                control={control}
                name="photoUrl"
                rules={{
                  validate: (value) =>
                    !value ||
                    /^https?:\/\/.+/.test(value) ||
                    'Enter a valid URL starting with http',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: errors.photoUrl
                          ? '#e5484d'
                          : Colors[colorScheme].tabIconDefault,
                        color: Colors[colorScheme].text,
                      },
                    ]}
                    placeholder="https://example.com/avatar.png"
                    placeholderTextColor={Colors[colorScheme].icon}
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={(text) => {
                      onChange(text);
                      setPreviewUrl(text || undefined);
                    }}
                    value={value}
                  />
                )}
              />
              {errors.photoUrl && (
                <ThemedText style={styles.errorText}>
                  {errors.photoUrl.message}
                </ThemedText>
              )}
            </ThemedView>
          </View>

          <ThemedView style={styles.fieldGroup}>
            <ThemedText>First name</ThemedText>
            <Controller
              control={control}
              name="firstName"
              rules={{
                required: 'First name is required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: errors.firstName
                        ? '#e5484d'
                        : Colors[colorScheme].tabIconDefault,
                      color: Colors[colorScheme].text,
                    },
                  ]}
                  placeholder="Alex"
                  placeholderTextColor={Colors[colorScheme].icon}
                  autoCapitalize="words"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.firstName && (
              <ThemedText style={styles.errorText}>
                {errors.firstName.message}
              </ThemedText>
            )}
          </ThemedView>

          <ThemedView style={styles.fieldGroup}>
            <ThemedText>Last name</ThemedText>
            <Controller
              control={control}
              name="lastName"
              rules={{
                required: 'Last name is required',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: errors.lastName
                        ? '#e5484d'
                        : Colors[colorScheme].tabIconDefault,
                      color: Colors[colorScheme].text,
                    },
                  ]}
                  placeholder="Taylor"
                  placeholderTextColor={Colors[colorScheme].icon}
                  autoCapitalize="words"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.lastName && (
              <ThemedText style={styles.errorText}>{errors.lastName.message}</ThemedText>
            )}
          </ThemedView>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.primaryButton, { backgroundColor: Colors[colorScheme].tint }]}
            onPress={handleSubmit(onSubmit)}>
            <ThemedText type="defaultSemiBold" style={styles.primaryButtonText}>
              Finish
            </ThemedText>
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
  photoRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  avatarShell: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarInitials: {
    fontSize: 28,
  },
  photoField: {
    flex: 1,
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
    marginTop: 16,
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

