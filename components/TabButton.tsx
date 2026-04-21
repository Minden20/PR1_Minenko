import { ACCENT_COLORS, FONT_SIZES, THEME_COLORS, useStore } from '@/store/useStore';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TabButtonProps {
    title: string;
    icon: string;
    isActive: boolean;
    onPress: () => void;
}

export function TabButton({ title, icon, isActive, onPress }: TabButtonProps) {
    const theme = useStore(state => state.theme);
    const fontSize = useStore(state => state.fontSize);
    const accentColor = useStore(state => state.accentColor);
    const colors = THEME_COLORS[theme];
    const fonts = FONT_SIZES[fontSize];
    const accent = ACCENT_COLORS[accentColor];

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    backgroundColor: isActive ? accent + '18' : 'transparent',
                    borderColor: isActive ? accent : colors.border,
                    borderWidth: isActive ? 2 : 1,
                },
            ]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.icon, { fontSize: fonts.subtitle }]}>{icon}</Text>
            <Text
                style={[
                    styles.label,
                    {
                        color: isActive ? accent : colors.textSecondary,
                        fontSize: fonts.base,
                        fontWeight: isActive ? '700' : '500',
                    },
                ]}
            >
                {title}
            </Text>
            {isActive && (
                <View style={[styles.dot, { backgroundColor: accent }]} />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 14,
        gap: 6,
        position: 'relative',
    },
    icon: {
        marginRight: 2,
    },
    label: {
        letterSpacing: 0.2,
    },
    dot: {
        position: 'absolute',
        bottom: 4,
        width: 6,
        height: 6,
        borderRadius: 3,
    },
});
