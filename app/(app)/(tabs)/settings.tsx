import { SettingsScreen } from '@/components/SettingsScreen';
import { useAuth } from '@/context/AuthContext';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useSettings, THEME_COLORS, FONT_SIZES, ACCENT_COLORS } from '@/context/SettingsContext';

export default function SettingsRoute() {
  const { user, logout } = useAuth();
  const { theme, fontSize, accentColor } = useSettings();
  
  const colors = THEME_COLORS[theme];
  const fonts = FONT_SIZES[fontSize];
  const accent = ACCENT_COLORS[accentColor];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {user && (
        <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.profileTitle, { color: colors.text, fontSize: fonts.title }]}>
            Профіль
          </Text>
          <Text style={{ color: colors.text, fontSize: fonts.base, marginBottom: 4 }}>
            Ім'я: <Text style={{ fontWeight: 'bold' }}>{user.name}</Text>
          </Text>
          <Text style={{ color: colors.text, fontSize: fonts.base, marginBottom: 4 }}>
            Логін: <Text style={{ fontWeight: 'bold' }}>{user.username}</Text>
          </Text>
          <Text style={{ color: colors.text, fontSize: fonts.base, marginBottom: 16 }}>
            Роль: <Text style={{ fontWeight: 'bold', color: accent }}>{user.role}</Text>
          </Text>
          
          <Button title="Вийти" color="#ff4444" onPress={logout} />
        </View>
      )}
      
      <SettingsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  profileTitle: {
    fontWeight: '700',
    marginBottom: 12,
  }
});
