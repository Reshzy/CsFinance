import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Hind', ...defaultTheme.fontFamily.sans],
                display: ['Montserrat', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                app: {
                    bg: 'var(--color-bg)',
                    'bg-muted': 'var(--color-bg-muted)',
                    'bg-elevated': 'var(--color-bg-elevated)',
                    card: 'var(--color-card)',
                    border: 'var(--color-border)',
                    text: 'var(--color-text)',
                    muted: 'var(--color-text-muted)',
                    inverse: 'var(--color-text-inverse)',
                    brand: {
                        orange: 'var(--color-brand-primary)',
                        teal: 'var(--color-brand-secondary)',
                    },
                    positive: 'var(--color-positive)',
                    'positive-bg': 'var(--color-positive-bg)',
                    negative: 'var(--color-negative)',
                    'negative-bg': 'var(--color-negative-bg)',
                    cta: 'var(--color-cta-bg)',
                    'cta-text': 'var(--color-cta-text)',
                    'cta-hover': 'var(--color-cta-hover)',
                    accent: 'var(--color-accent-surface)',
                    chart: 'var(--color-chart-bar)',
                },
            },
        },
    },

    plugins: [forms],
};
