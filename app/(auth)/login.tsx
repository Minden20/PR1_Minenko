import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useSettings, THEME_COLORS, FONT_SIZES, ACCENT_COLORS } from '@/context/SettingsContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const { theme, fontSize, accentColor } = useSettings();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const colors = THEME_COLORS[theme];
  const fonts = FONT_SIZES[fontSize];
  const accent = ACCENT_COLORS[accentColor];

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);
    
    if (!success) {
      setError('Невірний логін або пароль');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Text style={[styles.title, { color: colors.text, fontSize: fonts.title }]}>Авторизація</Text>
        <Text style={[styles.subtitle, { color: colors.text + '99', fontSize: fonts.base }]}>
          Увійдіть у свій обліковий запис для доступу до Островів
        </Text>

        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.background, 
            borderColor: colors.border,
            color: colors.text,
            fontSize: fonts.base
          }]}
          placeholder="Логін (напр. admin)"
          placeholderTextColor={colors.text + '55'}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={[styles.input, { 
            backgroundColor: colors.background, 
            borderColor: colors.border,
            color: colors.text,
            fontSize: fonts.base
          }]}
          placeholder="Пароль"
          placeholderTextColor={colors.text + '55'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error ? <Text style={[styles.error, { fontSize: fonts.small }]}>{error}</Text> : null}

        <TouchableOpacity 
          style={[styles.button, { backgroundColor: accent }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={[styles.buttonText, { fontSize: fonts.base }]}>Увійти</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  error: {
    color: '#ff4444',
    marginBottom: 16,
    textAlign: 'center',
  }
});
