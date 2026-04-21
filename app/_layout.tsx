import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export const unstable_settings = {
  // Ensure that reloading on `/unmatched` keeps a back button present.
  initialRouteName: '(app)',
};

export default function RootLayout() {
  const theme = useStore((state) => state.theme);
  const user = useStore((state) => state.user);
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
