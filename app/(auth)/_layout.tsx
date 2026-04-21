import { Stack } from 'expo-router';
import { useStore } from '@/store/useStore';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

export default function AuthLayout() {
  const theme = useStore(state => state.theme);

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
