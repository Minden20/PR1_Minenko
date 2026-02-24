import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';
export type FontSizeOption = 'small' | 'medium' | 'large';
export type AccentColorOption = 'teal' | 'coral' | 'gold';

interface SettingsContextType {
    theme: ThemeMode;
    setTheme: (t: ThemeMode) => void;
    fontSize: FontSizeOption;
    setFontSize: (f: FontSizeOption) => void;
    accentColor: AccentColorOption;
    setAccentColor: (c: AccentColorOption) => void;
}

const SettingsContext = createContext<SettingsContextType>({
    theme: 'dark',
    setTheme: () => { },
    fontSize: 'medium',
    setFontSize: () => { },
    accentColor: 'teal',
    setAccentColor: () => { },
});

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeMode>('dark');
    const [fontSize, setFontSize] = useState<FontSizeOption>('medium');
    const [accentColor, setAccentColor] = useState<AccentColorOption>('teal');

    return (
        <SettingsContext.Provider
            value={{ theme, setTheme, fontSize, setFontSize, accentColor, setAccentColor }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    return useContext(SettingsContext);
}

export const ACCENT_COLORS: Record<AccentColorOption, string> = {
    teal: '#0EA5A0',
    coral: '#FF6B6B',
    gold: '#F5A623',
};

export const FONT_SIZES: Record<FontSizeOption, { base: number; title: number; subtitle: number; small: number }> = {
    small: { base: 13, title: 26, subtitle: 16, small: 11 },
    medium: { base: 15, title: 30, subtitle: 19, small: 12 },
    large: { base: 18, title: 36, subtitle: 23, small: 14 },
};

export const THEME_COLORS = {
    light: {
        background: '#F0F4F8',
        surface: '#FFFFFF',
        surfaceSecondary: '#E8EDF2',
        text: '#1A2B3C',
        textSecondary: '#5A6B7C',
        border: '#D0D8E0',
        shadow: 'rgba(0,0,0,0.08)',
    },
    dark: {
        background: '#0B1622',
        surface: '#162333',
        surfaceSecondary: '#1E3044',
        text: '#E8EDF2',
        textSecondary: '#8A9BB0',
        border: '#2A3D55',
        shadow: 'rgba(0,0,0,0.3)',
    },
};
