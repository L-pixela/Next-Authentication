import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT:  'var(--color-primary)',
          hover:    'var(--color-primary-hover)',
          active:   'var(--color-primary-active)',
        },
        secondary: {
          DEFAULT:  'var(--color-secondary)',
          hover:    'var(--color-secondary-hover)',
        },
        dark:         'var(--color-dark)',
        darkSurface:  'var(--color-dark-surface)',
        background:   'var(--color-background)',
        surface:      'var(--color-surface)',
        textPrimary:  'var(--color-text-primary)',
        textSecondary:'var(--color-text-secondary)',
        textMuted:    'var(--color-text-muted)',
        border:       'var(--color-border)',
      },
    },
  },
  plugins: [],
};

export default config;