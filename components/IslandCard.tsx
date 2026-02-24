import { ACCENT_COLORS, FONT_SIZES, THEME_COLORS, useSettings } from '@/context/SettingsContext';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface IslandCardProps {
    name: string;
    terrain: string;
    description: string;
    population: number;
    resources: string;
    dangerLevel: number;
}

export function IslandCard({
    name,
    terrain,
    description,
    population,
    resources,
    dangerLevel,
}: IslandCardProps) {
    const { theme, fontSize, accentColor } = useSettings();
    const colors = THEME_COLORS[theme];
    const fonts = FONT_SIZES[fontSize];
    const accent = ACCENT_COLORS[accentColor];

    return (
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.shadow }]}>
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={[styles.name, { color: accent, fontSize: fonts.subtitle }]}>{name}</Text>
                    <Text style={[styles.terrain, { color: colors.textSecondary, fontSize: fonts.small }]}>
                        {terrain}
                    </Text>
                </View>
            </View>

            <Text style={[styles.description, { color: colors.text, fontSize: fonts.base }]}>
                {description}
            </Text>

            <View style={[styles.statsRow, { borderTopColor: colors.border }]}>
                <View style={styles.stat}>
                    <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: fonts.small }]}>
                        Населення
                    </Text>
                    <Text style={[styles.statValue, { color: colors.text, fontSize: fonts.base }]}>
                        {population.toLocaleString()}
                    </Text>
                </View>
                <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
                <View style={styles.stat}>
                    <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: fonts.small }]}>
                        Ресурси
                    </Text>
                    <Text style={[styles.statValue, { color: colors.text, fontSize: fonts.base }]}>
                        {resources}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        borderWidth: 1,
        marginHorizontal: 16,
        marginVertical: 6,
        padding: 16,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 4,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    emoji: {
        marginRight: 12,
    },
    headerText: {
        flex: 1,
    },
    name: {
        fontWeight: '700',
        letterSpacing: 0.3,
    },
    terrain: {
        marginTop: 2,
    },
    dangerBadge: {
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    dangerText: {
        fontWeight: '600',
    },
    description: {
        lineHeight: 22,
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        borderTopWidth: 1,
        paddingTop: 12,
        alignItems: 'center',
    },
    stat: {
        flex: 1,
        alignItems: 'center',
    },
    statLabel: {
        marginBottom: 2,
    },
    statValue: {
        fontWeight: '600',
    },
    statDivider: {
        width: 1,
        height: 32,
    },
});
