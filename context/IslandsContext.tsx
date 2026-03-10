import React, { createContext, useContext, useState, type ReactNode } from 'react';

export interface Island {
    id: string;
    name: string;
    terrain: string;
    description: string;
    population: number;
    resources: string;
    dangerLevel: number;
    emoji?: string;
}

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

interface IslandsContextType {
    islands: Island[];
    addIsland: (island: Omit<Island, 'id'>) => void;
    removeIsland: (id: string) => void;
}

const IslandsContext = createContext<IslandsContextType>({
    islands: INITIAL_ISLANDS,
    addIsland: () => { },
    removeIsland: () => { },
});

export function IslandsProvider({ children }: { children: ReactNode }) {
    const [islands, setIslands] = useState<Island[]>(INITIAL_ISLANDS);

    const addIsland = (island: Omit<Island, 'id'>) => {
        const newId = String(Math.max(...islands.map(i => Number(i.id)), 0) + 1);
        setIslands(prev => [...prev, { ...island, id: newId }]);
    };

    const removeIsland = (id: string) => {
        setIslands(prev => prev.filter(i => i.id !== id));
    };

    return (
        <IslandsContext.Provider value={{ islands, addIsland, removeIsland }}>
            {children}
        </IslandsContext.Provider>
    );
}

export function useIslands() {
    return useContext(IslandsContext);
}
