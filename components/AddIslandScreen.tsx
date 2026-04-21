import { ACCENT_COLORS, FONT_SIZES, THEME_COLORS, useStore } from '@/store/useStore';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const TERRAIN_OPTIONS = [
    'Скелясті гори', 'Тропічний риф', 'Вулкан', 'Джунглі',
    'Льодовик', 'Пустельний пляж', 'Рівнина', 'Лагуна',
];

export function AddIslandScreen({ onAdded }: { onAdded?: () => void }) {
    const theme = useStore(state => state.theme);
    const fontSize = useStore(state => state.fontSize);
    const accentColor = useStore(state => state.accentColor);
    const addIsland = useStore(state => state.addIsland);
    const colors = THEME_COLORS[theme];
    const fonts = FONT_SIZES[fontSize];
    const accent = ACCENT_COLORS[accentColor];

    const [name, setName] = useState('');
    const [terrain, setTerrain] = useState(TERRAIN_OPTIONS[0]);
    const [description, setDescription] = useState('');
    const [population, setPopulation] = useState('');
    const [resources, setResources] = useState('');
    const [dangerLevel, setDangerLevel] = useState('5');

    const resetForm = () => {
        setName('');
        setTerrain(TERRAIN_OPTIONS[0]);
        setDescription('');
        setPopulation('');
        setResources('');
        setDangerLevel('5');
    };

    const handleSubmit = () => {
        if (!name.trim()) {
            Alert.alert('Помилка', 'Введіть назву острова');
            return;
        }
        if (!description.trim()) {
            Alert.alert('Помилка', 'Введіть опис острова');
            return;
        }

        const pop = parseInt(population, 10);
        if (isNaN(pop) || pop < 0) {
            Alert.alert('Помилка', 'Введіть коректне населення (число)');
            return;
        }

        const danger = parseInt(dangerLevel, 10);
        if (isNaN(danger) || danger < 1 || danger > 10) {
            Alert.alert('Помилка', 'Рівень небезпеки від 1 до 10');
            return;
        }

        addIsland({
            name: name.trim(),
            terrain,
            description: description.trim(),
            population: pop,
            resources: resources.trim() || 'Невідомо',
            dangerLevel: danger,
        });

        Alert.alert('Успіх ✅', `Острів "${name.trim()}" додано до архіпелагу!`);
        resetForm();
        onAdded?.();
    };

    const inputStyle = [
        styles.input,
        {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            color: colors.text,
            fontSize: fonts.base,
        },
    ];

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                style={[styles.container, { backgroundColor: colors.background }]}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={[styles.title, { color: colors.text, fontSize: fonts.title }]}>
                    ➕ Новий острів
                </Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: fonts.base }]}>
                    Додайте новий острів до архіпелагу
                </Text>

                {/* Назва */}
                <Text style={[styles.label, { color: accent, fontSize: fonts.base }]}>Назва острова *</Text>
                <TextInput
                    style={inputStyle}
                    value={name}
                    onChangeText={setName}
                    placeholder="Наприклад: Кришталевий Берег"
                    placeholderTextColor={colors.textSecondary}
                />

                {/* Тип місцевості */}
                <Text style={[styles.label, { color: accent, fontSize: fonts.base }]}>Тип місцевості</Text>
                <View style={styles.terrainGrid}>
                    {TERRAIN_OPTIONS.map((opt) => (
                        <TouchableOpacity
                            key={opt}
                            style={[
                                styles.terrainChip,
                                {
                                    backgroundColor: terrain === opt ? accent : colors.surface,
                                    borderColor: terrain === opt ? accent : colors.border,
                                },
                            ]}
                            onPress={() => setTerrain(opt)}
                            activeOpacity={0.7}
                        >
                            <Text
                                style={[
                                    styles.terrainChipText,
                                    {
                                        color: terrain === opt ? '#FFFFFF' : colors.textSecondary,
                                        fontSize: fonts.small,
                                    },
                                ]}
                            >
                                {opt}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Опис */}
                <Text style={[styles.label, { color: accent, fontSize: fonts.base }]}>Опис *</Text>
                <TextInput
                    style={[...inputStyle, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Розкажіть про цей острів..."
                    placeholderTextColor={colors.textSecondary}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                />

                {/* Населення та Ресурси */}
                <View style={styles.row}>
                    <View style={styles.halfField}>
                        <Text style={[styles.label, { color: accent, fontSize: fonts.base }]}>Населення *</Text>
                        <TextInput
                            style={inputStyle}
                            value={population}
                            onChangeText={setPopulation}
                            placeholder="1000"
                            placeholderTextColor={colors.textSecondary}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.halfField}>
                        <Text style={[styles.label, { color: accent, fontSize: fonts.base }]}>Ресурси</Text>
                        <TextInput
                            style={inputStyle}
                            value={resources}
                            onChangeText={setResources}
                            placeholder="Золото"
                            placeholderTextColor={colors.textSecondary}
                        />
                    </View>
                </View>

                {/* Рівень небезпеки */}
                <Text style={[styles.label, { color: accent, fontSize: fonts.base }]}>
                    Рівень небезпеки (1-10): {dangerLevel}
                </Text>
                <View style={styles.dangerRow}>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((lvl) => {
                        const isSelected = parseInt(dangerLevel, 10) === lvl;
                        const dangerColor = lvl <= 3 ? '#22c55e' : lvl <= 6 ? '#f59e0b' : '#ef4444';
                        return (
                            <TouchableOpacity
                                key={lvl}
                                style={[
                                    styles.dangerBtn,
                                    {
                                        backgroundColor: isSelected ? dangerColor : colors.surface,
                                        borderColor: isSelected ? dangerColor : colors.border,
                                    },
                                ]}
                                onPress={() => setDangerLevel(String(lvl))}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={{
                                        color: isSelected ? '#FFFFFF' : colors.textSecondary,
                                        fontSize: fonts.small,
                                        fontWeight: '700',
                                    }}
                                >
                                    {lvl}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Кнопка */}
                <TouchableOpacity
                    style={[styles.submitBtn, { backgroundColor: accent }]}
                    onPress={handleSubmit}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.submitBtnText, { fontSize: fonts.subtitle }]}>
                        🏝️ Додати острів
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.resetBtn, { borderColor: colors.border }]}
                    onPress={resetForm}
                    activeOpacity={0.7}
                >
                    <Text style={[styles.resetBtnText, { color: colors.textSecondary, fontSize: fonts.base }]}>
                        Очистити форму
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 60,
    },
    title: {
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    subtitle: {
        marginTop: 4,
        marginBottom: 24,
        opacity: 0.8,
    },
    label: {
        fontWeight: '700',
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    textArea: {
        minHeight: 100,
        paddingTop: 12,
    },
    row: {
        flexDirection: 'row',
        gap: 12,
    },
    halfField: {
        flex: 1,
    },
    terrainGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    terrainChip: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
    },
    terrainChipText: {
        fontWeight: '600',
    },
    dangerRow: {
        flexDirection: 'row',
        gap: 6,
        flexWrap: 'wrap',
    },
    dangerBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitBtn: {
        marginTop: 28,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontWeight: '800',
    },
    resetBtn: {
        marginTop: 12,
        paddingVertical: 12,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: 'center',
    },
    resetBtnText: {
        fontWeight: '600',
    },
});
