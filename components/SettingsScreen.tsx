import {
    ACCENT_COLORS,
    FONT_SIZES,
    THEME_COLORS,
    useSettings,
    type AccentColorOption,
    type FontSizeOption,
    type ThemeMode,
} from '@/context/SettingsContext';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function OptionRow({
    label,
    options,
    selected,
    onSelect,
    renderOption,
}: {
    label: string;
    options: string[];
    selected: string;
    onSelect: (val: string) => void;
    renderOption?: (opt: string, isActive: boolean) => React.ReactNode;
}) {
    const { theme, fontSize, accentColor } = useSettings();
    const colors = THEME_COLORS[theme];
    const fonts = FONT_SIZES[fontSize];
    const accent = ACCENT_COLORS[accentColor];

    return (
        <View style={[styles.optionRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[styles.optionLabel, { color: colors.text, fontSize: fonts.base }]}>{label}</Text>
            <View style={styles.optionButtons}>
                {options.map((opt) => {
                    const isActive = selected === opt;
                    return (
                        <TouchableOpacity
                            key={opt}
                            style={[
                                styles.optionBtn,
                                {
                                    backgroundColor: isActive ? accent : colors.surfaceSecondary,
                                    borderColor: isActive ? accent : colors.border,
                                },
                            ]}
                            onPress={() => onSelect(opt)}
                            activeOpacity={0.7}
                        >
                            {renderOption ? (
                                renderOption(opt, isActive)
                            ) : (
                                <Text
                                    style={[
                                        styles.optionBtnText,
                                        {
                                            color: isActive ? '#FFFFFF' : colors.textSecondary,
                                            fontSize: fonts.small,
                                        },
                                    ]}
                                >
                                    {opt}
                                </Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

const THEME_OPTIONS: { key: ThemeMode; label: string; icon: string }[] = [
    { key: 'light', label: 'Світла', icon: '☀️' },
    { key: 'dark', label: 'Темна', icon: '🌙' },
];

const FONT_OPTIONS: { key: FontSizeOption; label: string }[] = [
    { key: 'small', label: 'Малий' },
    { key: 'medium', label: 'Середній' },
    { key: 'large', label: 'Великий' },
];

const COLOR_OPTIONS: { key: AccentColorOption; label: string; hex: string }[] = [
    { key: 'teal', label: 'Бірюзовий', hex: ACCENT_COLORS.teal },
    { key: 'coral', label: 'Кораловий', hex: ACCENT_COLORS.coral },
    { key: 'gold', label: 'Золотий', hex: ACCENT_COLORS.gold },
];

export function SettingsScreen() {
    const { theme, setTheme, fontSize, setFontSize, accentColor, setAccentColor } = useSettings();
    const colors = THEME_COLORS[theme];
    const fonts = FONT_SIZES[fontSize];
    const accent = ACCENT_COLORS[accentColor];

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: colors.background }]}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
        >
            <Text style={[styles.title, { color: colors.text, fontSize: fonts.title }]}>
                Налаштування
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: fonts.base }]}>
                Персоналізуйте вигляд додатку
            </Text>

            <Text style={[styles.sectionTitle, { color: accent, fontSize: fonts.subtitle }]}>
                Тема додатку
            </Text>
            <OptionRow
                label="Оберіть тему"
                options={THEME_OPTIONS.map((t) => t.key)}
                selected={theme}
                onSelect={(val) => setTheme(val as ThemeMode)}
                renderOption={(opt, isActive) => {
                    const option = THEME_OPTIONS.find((t) => t.key === opt)!;
                    return (
                        <Text
                            style={[
                                styles.optionBtnText,
                                { color: isActive ? '#FFFFFF' : colors.textSecondary, fontSize: fonts.small },
                            ]}
                        >
                            {option.icon} {option.label}
                        </Text>
                    );
                }}
            />

            <Text style={[styles.sectionTitle, { color: accent, fontSize: fonts.subtitle }]}>
                Розмір шрифту
            </Text>
            <OptionRow
                label="Оберіть розмір"
                options={FONT_OPTIONS.map((f) => f.key)}
                selected={fontSize}
                onSelect={(val) => setFontSize(val as FontSizeOption)}
                renderOption={(opt, isActive) => {
                    const option = FONT_OPTIONS.find((f) => f.key === opt)!;
                    return (
                        <Text
                            style={[
                                styles.optionBtnText,
                                { color: isActive ? '#FFFFFF' : colors.textSecondary, fontSize: fonts.small },
                            ]}
                        >
                            {option.label}
                        </Text>
                    );
                }}
            />


            <Text style={[styles.sectionTitle, { color: accent, fontSize: fonts.subtitle }]}>
                Кольрова тема
            </Text>
            <OptionRow
                label="Оберіть колір"
                options={COLOR_OPTIONS.map((c) => c.key)}
                selected={accentColor}
                onSelect={(val) => setAccentColor(val as AccentColorOption)}
                renderOption={(opt, isActive) => {
                    const option = COLOR_OPTIONS.find((c) => c.key === opt)!;
                    return (
                        <View style={styles.colorOption}>
                            <View
                                style={[
                                    styles.colorDot,
                                    { backgroundColor: option.hex, borderColor: isActive ? '#FFFFFF' : 'transparent' },
                                ]}
                            />
                            <Text
                                style={[
                                    styles.optionBtnText,
                                    { color: isActive ? '#FFFFFF' : colors.textSecondary, fontSize: fonts.small },
                                ]}
                            >
                                {option.label}
                            </Text>
                        </View>
                    );
                }}
            />


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
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
    sectionTitle: {
        fontWeight: '700',
        marginBottom: 10,
        marginTop: 8,
    },
    optionRow: {
        borderRadius: 14,
        borderWidth: 1,
        padding: 16,
        marginBottom: 20,
    },
    optionLabel: {
        fontWeight: '600',
        marginBottom: 12,
    },
    optionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    optionBtn: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 6,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionBtnText: {
        fontWeight: '600',
        textAlign: 'center',
    },
    colorOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    colorDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
    },
    previewBox: {
        borderRadius: 14,
        borderWidth: 1,
        padding: 16,
        marginBottom: 20,
    },
    previewTitle: {
        fontWeight: '700',
        marginBottom: 8,
    },
    previewText: {
        lineHeight: 22,
        marginBottom: 12,
    },
    previewStats: {
        borderTopWidth: 1,
        paddingTop: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});
