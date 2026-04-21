import { AddIslandScreen } from '@/components/AddIslandScreen';
import { IslandListScreen } from '@/components/IslandListScreen';
import { SettingsScreen } from '@/components/SettingsScreen';
import { ACCENT_COLORS, FONT_SIZES, THEME_COLORS, useStore } from '@/store/useStore';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ActiveTab = 'islands' | 'settings' | 'add';

const TABS: { key: ActiveTab; label: string; icon: string }[] = [
  { key: 'islands', label: 'Острови', icon: '🏝️' },
  { key: 'settings', label: 'Налаштування', icon: '⚙️' },
  { key: 'add', label: 'Додати острів', icon: '➕' },
];

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('islands');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const theme = useStore(state => state.theme);
  const fontSize = useStore(state => state.fontSize);
  const accentColor = useStore(state => state.accentColor);
  const colors = THEME_COLORS[theme];
  const fonts = FONT_SIZES[fontSize];
  const accent = ACCENT_COLORS[accentColor];
  const insets = useSafeAreaInsets();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openDropdown = () => {
    setDropdownOpen(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeDropdown = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setDropdownOpen(false));
  };

  const selectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    closeDropdown();
  };

  const currentTab = TABS.find((t) => t.key === activeTab)!;

  const renderScreen = () => {
    switch (activeTab) {
      case 'islands':
        return <IslandListScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'add':
        return <AddIslandScreen onAdded={() => setActiveTab('islands')} />;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      {/* Dropdown header */}
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={[styles.dropdownTrigger, { backgroundColor: accent + '18', borderColor: accent }]}
          onPress={openDropdown}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: fonts.subtitle }}>{currentTab.icon}</Text>
          <Text style={[styles.dropdownLabel, { color: colors.text, fontSize: fonts.base }]}>
            {currentTab.label}
          </Text>
          <Text style={[styles.chevron, { color: accent }]}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown modal */}
      <Modal transparent visible={dropdownOpen} animationType="none" onRequestClose={closeDropdown}>
        <TouchableWithoutFeedback onPress={closeDropdown}>
          <View style={styles.overlay}>
            <Animated.View
              style={[
                styles.dropdown,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  top: insets.top + 60,
                  opacity: fadeAnim,
                  transform: [
                    {
                      translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-10, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              {TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <TouchableOpacity
                    key={tab.key}
                    style={[
                      styles.dropdownItem,
                      {
                        backgroundColor: isActive ? accent + '18' : 'transparent',
                        borderBottomColor: colors.border,
                      },
                    ]}
                    onPress={() => selectTab(tab.key)}
                    activeOpacity={0.7}
                  >
                    <Text style={{ fontSize: fonts.subtitle }}>{tab.icon}</Text>
                    <Text
                      style={[
                        styles.dropdownItemLabel,
                        {
                          color: isActive ? accent : colors.text,
                          fontSize: fonts.base,
                          fontWeight: isActive ? '700' : '500',
                        },
                      ]}
                    >
                      {tab.label}
                    </Text>
                    {isActive && (
                      <View style={[styles.activeDot, { backgroundColor: accent }]} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Content */}
      <View style={styles.content}>{renderScreen()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 2,
    gap: 10,
  },
  dropdownLabel: {
    flex: 1,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  chevron: {
    fontSize: 12,
    fontWeight: '700',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  dropdown: {
    position: 'absolute',
    left: 16,
    right: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    gap: 12,
  },
  dropdownItemLabel: {
    flex: 1,
    letterSpacing: 0.2,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
});
