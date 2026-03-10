import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { IslandsProvider } from '@/context/IslandsContext';
import { SettingsProvider, useSettings } from '@/context/SettingsContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

function InnerLayout() {
  const { theme } = useSettings();

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <IslandsProvider>
      <SettingsProvider>
        <InnerLayout />
      </SettingsProvider>
    </IslandsProvider>
  );
}

