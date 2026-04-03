import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle(): JSX.Element {
    const { theme, setTheme } = useTheme();

    return (
        <div
            className="inline-flex gap-0.5 rounded-lg border p-0.5 shadow-sm"
            style={{
                borderColor: 'var(--color-border)',
                backgroundColor: 'var(--color-bg-elevated)',
            }}
            role="group"
            aria-label="Color theme"
        >
            <button
                type="button"
                className="theme-toggle-btn"
                aria-pressed={theme === 'light'}
                onClick={() => setTheme('light')}
            >
                Light
            </button>
            <button
                type="button"
                className="theme-toggle-btn"
                aria-pressed={theme === 'dark'}
                onClick={() => setTheme('dark')}
            >
                Dark
            </button>
        </div>
    );
}
