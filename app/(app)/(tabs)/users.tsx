import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import useSWR from 'swr';
import { useSettings, THEME_COLORS, FONT_SIZES } from '@/context/SettingsContext';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function UsersScreen() {
    const { theme, fontSize } = useSettings();
    const colors = THEME_COLORS[theme];
    const fonts = FONT_SIZES[fontSize];

    const { data, error, isLoading } = useSWR('https://reqres.in/api/users?delay=1', fetcher);

    if (error) {
        return (
            <View style={[styles.centered, { backgroundColor: colors.background }]}>
                <Text style={{ color: colors.text, fontSize: fonts.base }}>Помилка завантаження даних</Text>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={[styles.centered, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.text} />
                <Text style={[{ color: colors.text, fontSize: fonts.base, marginTop: 16 }]}>Завантаження користувачів...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: colors.text, fontSize: fonts.title }]}>Користувачі</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: fonts.small }]}>
                    Завантажено з ReqRes за допомогою SWR
                </Text>
            </View>
            <FlatList
                data={data?.data || []}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.avatarPlaceholder}>
                            <Text style={{ fontSize: 24 }}>👤</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={[styles.name, { color: colors.text, fontSize: fonts.base }]}>
                                {item.first_name} {item.last_name}
                            </Text>
                            <Text style={[styles.email, { color: colors.textSecondary, fontSize: fonts.small }]}>
                                {item.email}
                            </Text>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        padding: 20,
        paddingBottom: 10,
    },
    title: {
        fontWeight: '800',
    },
    subtitle: {
        marginTop: 4,
        opacity: 0.7,
    },
    listContent: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 12,
        alignItems: 'center',
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e2e8f0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    name: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        opacity: 0.8,
    }
});
