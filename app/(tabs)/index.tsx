import { IslandListScreen } from '@/components/IslandListScreen';
import { SettingsScreen } from '@/components/SettingsScreen';
import { TabButton } from '@/components/TabButton';
import { THEME_COLORS, useSettings } from '@/context/SettingsContext';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ActiveTab = 'islands' | 'settings';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('islands');
  const { theme } = useSettings();
  const colors = THEME_COLORS[theme];
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      {/* Tab buttons */}
      <View style={[styles.tabBar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TabButton
          title="Острови"
          icon="🏝️"
          isActive={activeTab === 'islands'}
          onPress={() => setActiveTab('islands')}
        />
        <TabButton
          title="Налаштування"
          icon="⚙️"
          isActive={activeTab === 'settings'}
          onPress={() => setActiveTab('settings')}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'islands' ? <IslandListScreen /> : <SettingsScreen />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
  },
});
