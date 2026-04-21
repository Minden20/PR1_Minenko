import { IslandCard } from '@/components/IslandCard';
import { useStore, type Island, ACCENT_COLORS, FONT_SIZES, THEME_COLORS } from '@/store/useStore';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
    Alert,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

export function IslandListScreen() {
    const router = useRouter();
    const theme = useStore(state => state.theme);
    const fontSize = useStore(state => state.fontSize);
    const accentColor = useStore(state => state.accentColor);
    const islands = useStore(state => state.islands);
    const removeIsland = useStore(state => state.removeIsland);
    const colors = THEME_COLORS[theme];
    const fonts = FONT_SIZES[fontSize];
    const accent = ACCENT_COLORS[accentColor];

    const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);

    const getDangerColor = (level: number) => {
        if (level <= 3) return '#22c55e';
        if (level <= 6) return '#f59e0b';
        return '#ef4444';
    };

    const handleDelete = (island: Island) => {
        Alert.alert(
            'Видалити острів?',
            `Ви впевнені, що хочете видалити "${island.name}" з архіпелагу?`,
            [
                { text: 'Скасувати', style: 'cancel' },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: () => {
                        removeIsland(island.id);
                        setSelectedIsland(null);
                    },
                },
            ]
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.headerSection}>
                <Text style={[styles.title, { color: colors.text, fontSize: fonts.title }]}>
                    🏝️ Архіпелаг
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: fonts.base }]}>
                    Покрокова стратегія · {islands.length} островів
                </Text>
            </View>
            <FlatList
                data={islands}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <IslandCard
                        name={item.name}
                        terrain={item.terrain}
                        description={item.description}
                        population={item.population}
                        resources={item.resources}
                        dangerLevel={item.dangerLevel}
                        onPress={() => setSelectedIsland(item)}
                    />
                )}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            {/* Detail Modal */}
            <Modal
                visible={selectedIsland !== null}
                transparent
                animationType="fade"
                onRequestClose={() => setSelectedIsland(null)}
            >
                <TouchableWithoutFeedback onPress={() => setSelectedIsland(null)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                                {selectedIsland && (
                                    <>
                                        {/* Close button */}
                                        <TouchableOpacity
                                            style={[styles.closeBtn, { backgroundColor: colors.surfaceSecondary }]}
                                            onPress={() => setSelectedIsland(null)}
                                        >
                                            <Text style={[styles.closeBtnText, { color: colors.text }]}>✕</Text>
                                        </TouchableOpacity>

                                        {/* Island name & terrain */}
                                        <Text style={[styles.modalTitle, { color: accent, fontSize: fonts.title }]}>
                                            {selectedIsland.name}
                                        </Text>
                                        <Text style={[styles.modalTerrain, { color: colors.textSecondary, fontSize: fonts.base }]}>
                                            📍 {selectedIsland.terrain}
                                        </Text>

                                        {/* Description */}
                                        <Text style={[styles.modalDescription, { color: colors.text, fontSize: fonts.base }]}>
                                            {selectedIsland.description}
                                        </Text>

                                        {/* Stats grid */}
                                        <View style={[styles.statsGrid, { borderTopColor: colors.border }]}>
                                            <View style={[styles.statBox, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                                                <Text style={styles.statIcon}>👥</Text>
                                                <Text style={[styles.statBoxLabel, { color: colors.textSecondary, fontSize: fonts.small }]}>
                                                    Населення
                                                </Text>
                                                <Text style={[styles.statBoxValue, { color: colors.text, fontSize: fonts.base }]}>
                                                    {selectedIsland.population.toLocaleString()}
                                                </Text>
                                            </View>
                                            <View style={[styles.statBox, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                                                <Text style={styles.statIcon}>💎</Text>
                                                <Text style={[styles.statBoxLabel, { color: colors.textSecondary, fontSize: fonts.small }]}>
                                                    Ресурси
                                                </Text>
                                                <Text style={[styles.statBoxValue, { color: colors.text, fontSize: fonts.base }]}>
                                                    {selectedIsland.resources}
                                                </Text>
                                            </View>
                                            <View style={[styles.statBox, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
                                                <Text style={styles.statIcon}>⚠️</Text>
                                                <Text style={[styles.statBoxLabel, { color: colors.textSecondary, fontSize: fonts.small }]}>
                                                    Небезпека
                                                </Text>
                                                <Text style={[styles.statBoxValue, { color: getDangerColor(selectedIsland.dangerLevel), fontSize: fonts.subtitle, fontWeight: '800' }]}>
                                                    {selectedIsland.dangerLevel}/10
                                                </Text>
                                            </View>
                                        </View>

                                        <TouchableOpacity
                                            style={[styles.deleteBtn, { backgroundColor: accent, marginBottom: 10 }]}
                                            onPress={() => {
                                                const id = selectedIsland.id;
                                                setSelectedIsland(null);
                                                router.push(`/island/${id}`);
                                            }}
                                            activeOpacity={0.8}
                                        >
                                            <Text style={[styles.deleteBtnText, { fontSize: fonts.base }]}>
                                                📋 Детальніше
                                            </Text>
                                        </TouchableOpacity>

                                        {/* Delete button */}
                                        <TouchableOpacity
                                            style={styles.deleteBtn}
                                            onPress={() => handleDelete(selectedIsland)}
                                            activeOpacity={0.8}
                                        >
                                            <Text style={[styles.deleteBtnText, { fontSize: fonts.base }]}>
                                                🗑️ Видалити острів
                                            </Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerSection: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 12,
    },
    title: {
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    subtitle: {
        marginTop: 4,
        opacity: 0.8,
    },
    list: {
        paddingBottom: 24,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalContent: {
        width: '100%',
        borderRadius: 20,
        borderWidth: 1,
        padding: 24,
        maxHeight: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    closeBtn: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
    },
    closeBtnText: {
        fontSize: 16,
        fontWeight: '700',
    },
    modalTitle: {
        fontWeight: '800',
        letterSpacing: 0.3,
        marginBottom: 4,
        paddingRight: 36,
    },
    modalTerrain: {
        marginBottom: 16,
        opacity: 0.8,
    },
    modalDescription: {
        lineHeight: 24,
        marginBottom: 20,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: 10,
        borderTopWidth: 1,
        paddingTop: 16,
        marginBottom: 20,
    },
    statBox: {
        flex: 1,
        borderRadius: 12,
        borderWidth: 1,
        padding: 12,
        alignItems: 'center',
    },
    statIcon: {
        fontSize: 20,
        marginBottom: 4,
    },
    statBoxLabel: {
        marginBottom: 2,
        textAlign: 'center',
    },
    statBoxValue: {
        fontWeight: '700',
        textAlign: 'center',
    },
    deleteBtn: {
        backgroundColor: '#ef4444',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    deleteBtnText: {
        color: '#FFFFFF',
        fontWeight: '700',
    },
});
