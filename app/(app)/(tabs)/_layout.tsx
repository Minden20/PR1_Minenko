import { Tabs } from 'expo-router';
import React from 'react';
import { useSettings, THEME_COLORS, ACCENT_COLORS } from '@/context/SettingsContext';

import { Text } from 'react-native';

export default function TabLayout() {
  const { theme, accentColor } = useSettings();
  const colors = THEME_COLORS[theme];
  const accent = ACCENT_COLORS[accentColor];

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: accent,
        tabBarInactiveTintColor: colors.text + '80',
      }}
    >
      <Tabs.Screen 
        name="islands" 
        options={{ 
          title: 'Острови',
          tabBarIcon: () => <Text style={{fontSize: 20}}>🏝️</Text>
        }} 
      />
      <Tabs.Screen 
        name="add" 
        options={{ 
          title: 'Додати',
          tabBarIcon: () => <Text style={{fontSize: 20}}>➕</Text>
        }} 
      />
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: 'Налаштування',
          tabBarIcon: () => <Text style={{fontSize: 20}}>⚙️</Text>
        }} 
      />
    </Tabs>
  );
}
