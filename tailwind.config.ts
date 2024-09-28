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
          DEFAULT: '#ffffff', // HSL: 0 0% 100%
          dark: '#14141a' // Karanlık mod
        },
        foreground: {
          DEFAULT: '#0f172a', // HSL: 240 10% 11%
          dark: '#ffffff' // Karanlık mod
        },
        card: {
          DEFAULT: '#ffffff', // HSL: 0 0% 100%
          dark: '#1e1e2f'
        },
        cardForeground: {
          DEFAULT: '#0f172a', // HSL: 240 10% 11%
          dark: '#ffffff'
        },
        popover: {
          DEFAULT: '#ffffff', // HSL: 0 0% 100%
          dark: '#1e1e2f'
        },
        popoverForeground: {
          DEFAULT: '#0f172a', // HSL: 240 10% 11%
          dark: '#ffffff'
        },
        primary: {
          DEFAULT: '#16a34a', // HSL: 142.1, 76.2%, 36.3%
          foreground: '#fdfdfd', // HSL: 355.7 100% 97.3%
          dark: '#22C55E', // HSL: 142, 78%, 45%
          foregroundDark: '#0f172a' // Karanlık mod
        },
        secondary: {
          DEFAULT: '#f5f7fa', // HSL: 240 4.8% 95.9%
          dark: '#1a1c22', // Karanlık mod
          foreground: '#1a1c22', // HSL: 240 5.9% 10%
          foregroundDark: '#f5f7fa' // Karanlık mod
        },
        muted: {
          DEFAULT: '#f5f7fa', // HSL: 240 4.8% 95.9%
          dark: '#2e2e2e', // Karanlık mod
          foreground: '#7d7d7d', // HSL: 240 3.8% 46.1%
          foregroundDark: '#ffffff' // Karanlık mod
        },
        accent: {
          DEFAULT: '#f5f7fa', // HSL: 240 4.8% 95.9%
          dark: '#2e2e2e', // Karanlık mod
          foreground: '#1a1c22', // HSL: 240 5.9% 10%
          foregroundDark: '#f5f7fa' // Karanlık mod
        },
        destructive: {
          DEFAULT: '#ff4d0a', // HSL: 0 84.2% 60.2%
          dark: '#ff4d0a', // HSL: 0 84.2% 60.2%
          foreground: '#ffffff', // HSL: 0 0% 98%
          foregroundDark: '#000000' // Karanlık mod
        },
        border: {
          DEFAULT: '#e2e8f0', // HSL: 240 5.9% 90%
          dark: '#4b5563' // Karanlık mod
        },
        input: {
          DEFAULT: '#e2e8f0', // HSL: 240 5.9% 90%
          dark: '#4b5563' // Karanlık mod
        },
        ring: {
          DEFAULT: '#16a34a', // HSL: 142.1 76.2% 36.3%
          dark: '#22C55E' // Karanlık mod
        },
        chart1: {
          DEFAULT: '#f0a500', // HSL: 12 76% 61%
          dark: '#c68e00' // Karanlık mod
        },
        chart2: {
          DEFAULT: '#a3c5b6', // HSL: 173 58% 39%
          dark: '#6f9c9d' // Karanlık mod
        },
        chart3: {
          DEFAULT: '#c6d8d4', // HSL: 197 37% 24%
          dark: '#4a6d6b' // Karanlık mod
        },
        chart4: {
          DEFAULT: '#f3e4b0', // HSL: 43 74% 66%
          dark: '#c0b24b' // Karanlık mod
        },
        chart5: {
          DEFAULT: '#d7f1b6', // HSL: 27 87% 67%
          dark: '#a3c16c' // Karanlık mod
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [tailwindcssAnimate]
}

export default config
