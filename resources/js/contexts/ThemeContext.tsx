import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import { flushSync } from 'react-dom';

const STORAGE_KEY = 'cs-finance-theme';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readInitialTheme(): Theme {
    if (typeof document === 'undefined') {
        return 'light';
    }

    const fromDom = document.documentElement.dataset.theme;
    if (fromDom === 'dark' || fromDom === 'light') {
        return fromDom;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
    const [theme, setThemeState] = useState<Theme>(() => readInitialTheme());

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {
            // ignore quota / private mode
        }
    }, [theme]);

    const setTheme = useCallback((next: Theme) => {
        const apply = (): void => {
            flushSync(() => {
                setThemeState(next);
            });
        };

        if (
            typeof document !== 'undefined' &&
            'startViewTransition' in document &&
            typeof document.startViewTransition === 'function'
        ) {
            document.startViewTransition(apply);
        } else {
            apply();
        }
    }, []);

    const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return ctx;
}
