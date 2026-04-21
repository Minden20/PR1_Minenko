import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
};

export interface Island {
  id: string;
  name: string;
  terrain: string;
  description: string;
  population: number;
  resources: string;
  dangerLevel: number;
  emoji?: string;
  imageUri?: string;
}

export type ThemeMode = 'light' | 'dark';
export type FontSizeOption = 'small' | 'medium' | 'large';
export type AccentColorOption = 'teal' | 'coral' | 'gold';

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

const INITIAL_ISLANDS: Island[] = [
  { id: '1', name: 'Острів Грому', terrain: 'Скелясті гори', description: 'Таємничий острів, оповитий вічними грозами. Блискавки живлять древні артефакти.', population: 1200, resources: 'Кристали', dangerLevel: 7 },
  { id: '2', name: 'Коралова Бухта', terrain: 'Тропічний риф', description: 'Мілководний острів з кришталево чистою водою та багатими коралами.', population: 3400, resources: 'Перлини', dangerLevel: 2 },
  { id: '3', name: 'Вулканічний Пік', terrain: 'Вулкан', description: 'Активний вулкан, що виробляє рідкісні мінерали та обсидіан.', population: 800, resources: 'Обсидіан', dangerLevel: 9 },
  { id: '4', name: 'Смарагдовий Ліс', terrain: 'Джунглі', description: 'Густі тропічні джунглі з деревами заввишки 80 метрів та рідкісною фауною.', population: 2100, resources: 'Деревина', dangerLevel: 5 },
  { id: '5', name: 'Крижана Фортеця', terrain: 'Льодовик', description: 'Покритий вічними льодами острів з замерзлими руїнами стародавньої цивілізації.', population: 450, resources: 'Льодяний камінь', dangerLevel: 8 },
  { id: '6', name: 'Піщана Мрія', terrain: 'Пустельний пляж', description: 'Розкішний острів з білосніжними пляжами та теплими течіями.', population: 5200, resources: 'Золото', dangerLevel: 1 },
  { id: '7', name: 'Затонула Гавань', terrain: 'Затоплені руїни', description: 'Напівзатоплений острів з руїнами стародавнього порту. Скарби під водою.', population: 600, resources: 'Артефакти', dangerLevel: 6, emoji: '🚢' },
  { id: '8', name: 'Містичний Оазис', terrain: 'Мангрові болота', description: 'Острів з магічними джерелами, що зцілюють будь-які хвороби.', population: 1800, resources: 'Зілля', dangerLevel: 4, emoji: '✨' },
  { id: '9', name: 'Драконячий Хребет', terrain: 'Гірський хребет', description: 'Звивистий гірський ланцюг, де мешкають легендарні морські дракони.', population: 300, resources: 'Драконяча луска', dangerLevel: 10, emoji: '🐉' },
  { id: '10', name: 'Торгова Пристань', terrain: 'Рівнина', description: 'Центр морської торгівлі архіпелагу з базарами та верфями.', population: 8900, resources: 'Торгівля', dangerLevel: 2, emoji: '⚓' },
  { id: '11', name: 'Забутий Маяк', terrain: 'Скелястий утюс', description: 'Самотній острів з древнім маяком, що ще світить у тумані.', population: 150, resources: 'Лінзи', dangerLevel: 3, emoji: '🗼' },
  { id: '12', name: 'Бамбуковий Рай', terrain: 'Бамбукові гаї', description: 'Тихий острів з бамбуковими лісами та школами бойових мистецтв.', population: 2700, resources: 'Бамбук', dangerLevel: 3, emoji: '🎋' },
  { id: '13', name: 'Шторм-Брейкер', terrain: 'Відкритий океан', description: 'Плавучий острів з каменю, що дрейфує серед штормів.', population: 500, resources: 'Штормова енергія', dangerLevel: 8, emoji: '🌊' },
  { id: '14', name: 'Золоті Поля', terrain: 'Родючі землі', description: 'Щедрий острів з родючим ґрунтом, житницея всього архіпелагу.', population: 6400, resources: 'Зерно', dangerLevel: 1, emoji: '🌾' },
  { id: '15', name: 'Печера Ехо', terrain: 'Підземні тунелі', description: 'Острів з величезною мережею печер, що сягають глибоко під океан.', population: 900, resources: 'Самоцвіти', dangerLevel: 6, emoji: '🕳️' },
  { id: '16', name: 'Небесна Вершина', terrain: 'Висока гора', description: 'Острів з горою, вершина якої сягає хмар. Тут живуть мудреці.', population: 700, resources: 'Знання', dangerLevel: 5, emoji: '☁️' },
  { id: '17', name: 'Рифова Стіна', terrain: 'Бар\'єрний риф', description: 'Природна фортеця, оточена небезпечними коралами та акулами.', population: 1600, resources: 'Риба', dangerLevel: 7, emoji: '🦈' },
  { id: '18', name: 'Тіньовий Архіпелаг', terrain: 'Туманні острівці', description: 'Група маленьких острівців, вкритих вічним туманом. Ніхто не знає що всередині.', population: 200, resources: 'Таємниці', dangerLevel: 9, emoji: '🌫️' },
  { id: '19', name: 'Сонячна Лагуна', terrain: 'Лагуна', description: 'Захищена лагуна з кришталевою водою та різнобарвними рибами.', population: 4100, resources: 'Черепашки', dangerLevel: 1, emoji: '☀️' },
  { id: '20', name: 'Кузня Титанів', terrain: 'Залізні скелі', description: 'Металевий острів з природними покладами заліза та стародавніми ковадлами.', population: 1100, resources: 'Метал', dangerLevel: 6, emoji: '⚒️' },
];

interface AppState {
  // Auth
  user: User | null;
  login: (username: string, password?: string) => Promise<boolean>;
  logout: () => void;

  // Settings
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  language: string;
  setLanguage: (lang: string) => void;
  fontSize: FontSizeOption;
  setFontSize: (f: FontSizeOption) => void;
  accentColor: AccentColorOption;
  setAccentColor: (c: AccentColorOption) => void;

  sessionOnly: boolean;
  toggleSessionOnly: () => void;

  // Islands
  islands: Island[];
  addIsland: (island: Omit<Island, 'id'>) => void;
  removeIsland: (id: string) => void;
  updateIsland: (id: string, data: Partial<Island>) => void;
}

const sessionAwareStorage = {
  getItem: async (name: string) => {
    return await AsyncStorage.getItem(name);
  },
  setItem: async (name: string, value: string) => {
    try {
      const state = JSON.parse(value);
      if (state?.state?.sessionOnly) {
        return;
      }
    } catch (e) {
      // ignore
    }
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  }
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      login: async (username: string, password?: string) => {
        try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
          if (response.ok) {
            const data = await response.json();
            const searchTerm = username.trim().toLowerCase();
            const apiUser = data.find((u: any) =>
              u.email.toLowerCase() === searchTerm ||
              u.username.toLowerCase() === searchTerm
            );

            if (apiUser) {
              set({
                user: {
                  id: apiUser.id.toString(),
                  username: apiUser.username,
                  name: apiUser.name,
                  email: apiUser.email,
                  role: 'Explorer',
                }
              });
              return true;
            }
          }
          return false;
        } catch {
          return false;
        }
      },
      logout: () => set({ user: null }),

      // Settings
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      fontSize: 'medium',
      setFontSize: (fontSize) => set({ fontSize }),
      accentColor: 'teal',
      setAccentColor: (accentColor) => set({ accentColor }),
      language: 'uk',
      setLanguage: (language) => set({ language }),
      sessionOnly: false,
      toggleSessionOnly: () => set((state) => ({ sessionOnly: !state.sessionOnly })),

      // Islands
      islands: INITIAL_ISLANDS,
      addIsland: (island) => {
        const islands = get().islands;
        const newId = String(Math.max(...islands.map(i => Number(i.id) || 0), 0) + 1);
        set({ islands: [...islands, { ...island, id: newId }] });
      },
      removeIsland: (id) => {
        set({ islands: get().islands.filter(i => i.id !== id) });
      },
      updateIsland: (id, data) => {
        set({ islands: get().islands.map(i => i.id === id ? { ...i, ...data } : i) });
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => sessionAwareStorage),
    }
  )
);
