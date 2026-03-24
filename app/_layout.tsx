import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';

import { IslandsProvider } from '@/context/IslandsContext';
import { SettingsProvider, useSettings } from '@/context/SettingsContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';

export const unstable_settings = {
  // Ensure that reloading on `/unmatched` keeps a back button present.
  initialRouteName: '(app)',
};

function RootLayoutNav() {
  const { theme } = useSettings();
  const { user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return; // Wait until navigation tree is fully mounted

    const inAuthGroup = segments[0] === '(auth)';

    const timeout = setTimeout(() => {
      if (!user && !inAuthGroup) {
        router.replace('/(auth)/login');
      } else if (user && inAuthGroup) {
        router.replace('/(app)/(tabs)/islands');
      }
    }, 1);

    return () => clearTimeout(timeout);
  }, [user, segments, rootNavigationState?.key]);

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <IslandsProvider>
        <SettingsProvider>
          <RootLayoutNav />
        </SettingsProvider>
      </IslandsProvider>
    </AuthProvider>
  );
}
