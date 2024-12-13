import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#f5f5f5', // Açık mod rengi
          dark: '#1a1a1a' // Koyu mod rengi
        },
        foreground: {
          DEFAULT: '#333333',
          dark: '#cccccc'
        },
        card: {
          DEFAULT: '#ffffff',
          dark: '#2d2d2d'
        },
        cardForeground: {
          DEFAULT: '#555555',
          dark: '#dddddd'
        },
        popover: {
          DEFAULT: '#fafafa',
          dark: '#3a3a3a'
        },
        popoverForeground: {
          DEFAULT: '#0f172a',
          dark: '#ffffff'
        },
        primary: {
          DEFAULT: '#16a34a',
          foreground: '#fdfdfd',
          dark: '#22C55E',
          foregroundDark: '#0f172a'
        },
        secondary: {
          DEFAULT: '#f5f7fa',
          dark: '#1a1c22',
          foreground: '#1a1c22',
          foregroundDark: '#f5f7fa'
        },
        muted: {
          DEFAULT: '#f5f7fa',
          dark: '#2e2e2e',
          foreground: '#7d7d7d',
          foregroundDark: '#ffffff'
        },
        accent: {
          DEFAULT: '#f5f7fa',
          dark: '#2e2e2e',
          foreground: '#1a1c22',
          foregroundDark: '#f5f7fa'
        },
        destructive: {
          DEFAULT: '#dc2626',
          dark: '#dc2626',
          foreground: '#ffffff',
          foregroundDark: '#000000'
        },
        border: {
          DEFAULT: '#e2e8f0',
          dark: '#4b5563'
        },
        input: {
          DEFAULT: '#e2e8f0',
          dark: '#4b5563'
        },
        ring: {
          DEFAULT: '#16a34a',
          dark: '#22C55E'
        },
        chart1: {
          DEFAULT: '#f0a500',
          dark: '#c68e00'
        },
        chart2: {
          DEFAULT: '#a3c5b6',
          dark: '#6f9c9d'
        },
        chart3: {
          DEFAULT: '#c6d8d4',
          dark: '#4a6d6b'
        },
        chart4: {
          DEFAULT: '#f3e4b0',
          dark: '#c0b24b'
        },
        chart5: {
          DEFAULT: '#d7f1b6',
          dark: '#a3c16c'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [tailwindcssAnimate]
}

export default config
