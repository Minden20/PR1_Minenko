import { ACCENT_COLORS, FONT_SIZES, THEME_COLORS, useStore } from '@/store/useStore';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function IslandDetailScreen() {
    const { id } = useLocalSearchParams();
    const islands = useStore(state => state.islands);
    const updateIsland = useStore(state => state.updateIsland);
    const theme = useStore(state => state.theme);
    const fontSize = useStore(state => state.fontSize);
    const accentColor = useStore(state => state.accentColor);

    const colors = THEME_COLORS[theme];
    const fonts = FONT_SIZES[fontSize];
    const accent = ACCENT_COLORS[accentColor];

    const island = islands.find(i => i.id === id);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            updateIsland(id as string, { imageUri: result.assets[0].uri });
        }
    };

    if (!island) return (
        <View style={[styles.centered, { backgroundColor: colors.background }]}>
            <Text style={{ color: colors.text }}>Острів не знайдено</Text>
        </View>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ padding: 20 }}>
            {island.imageUri ? (
                <View style={styles.imageContainer}>
                    <Image source={{ uri: island.imageUri }} style={styles.image} resizeMode="cover" />
                    <TouchableOpacity style={styles.removeImageBtn} onPress={() => updateIsland(id as string, { imageUri: undefined })}>
                        <Text style={styles.removeImageText}>✕</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={[styles.imagePlaceholder, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <Text style={{ fontSize: 40, opacity: 0.5 }}>{island.emoji || '🏝️'}</Text>
                    <Text style={[{ color: colors.textSecondary, marginTop: 10 }]}>Немає зображення</Text>
                </View>
            )}

            <TouchableOpacity
                style={[styles.btn, { backgroundColor: accent }]}
                onPress={pickImage}
            >
                <Text style={styles.btnText}>📷 {island.imageUri ? 'Змінити зображення' : 'Прикріпити зображення'}</Text>
            </TouchableOpacity>

            <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={[styles.title, { color: accent, fontSize: fonts.title }]}>{island.name}</Text>
                <Text style={[styles.terrain, { color: colors.textSecondary, fontSize: fonts.base }]}>📍 {island.terrain}</Text>

                <Text style={[styles.desc, { color: colors.text, fontSize: fonts.base }]}>{island.description}</Text>

                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                <Text style={[styles.stats, { color: colors.text, fontSize: fonts.base }]}>
                    👥 Населення: <Text style={{ fontWeight: 'bold' }}>{island.population.toLocaleString()}</Text>
                </Text>
                <Text style={[styles.stats, { color: colors.text, fontSize: fonts.base }]}>
                    💎 Ресурси: <Text style={{ fontWeight: 'bold' }}>{island.resources}</Text>
                </Text>
                <Text style={[styles.stats, { color: colors.text, fontSize: fonts.base }]}>
                    ⚠️ Небезпека: <Text style={{ fontWeight: 'bold' }}>{island.dangerLevel} / 10</Text>
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    imageContainer: {
        width: '100%',
        height: 200,
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        position: 'relative'
    },
    image: { width: '100%', height: '100%' },
    removeImageBtn: {
        position: 'absolute',
        top: 10, right: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        width: 32, height: 32,
        borderRadius: 16,
        justifyContent: 'center', alignItems: 'center'
    },
    removeImageText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
    imagePlaceholder: {
        width: '100%', height: 200,
        borderRadius: 16, borderWidth: 2, borderStyle: 'dashed',
        justifyContent: 'center', alignItems: 'center',
        marginBottom: 16
    },
    btn: {
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    card: {
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
    },
    title: { fontWeight: 'bold', marginBottom: 4 },
    terrain: { marginBottom: 16 },
    desc: { lineHeight: 24, marginBottom: 16 },
    divider: { height: 1, marginVertical: 16 },
    stats: { marginBottom: 8 }
});
