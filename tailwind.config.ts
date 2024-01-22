import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          100: '#d1d3d6',
          200: '#b2b5bb',
          300: '#8b9199',
          400: '#646c77',
          500: '#3e4755',
          DEFAULT: '#172233',
          600: '#131c2b',
          700: '#0f1722',
          800: '#0c111a',
          900: '#080b11',
          950: '#05070a'
        },
        secondary: {
          100: '#d5e1e6',
          200: '#b9cdd5',
          300: '#96b4c0',
          400: '#739baa',
          500: '#508295',
          DEFAULT: '#2d6980',
          600: '#26586b',
          700: '#1e4655',
          800: '#173540',
          900: '#0f232b',
          950: '#09151a'
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [require("tw-elements/dist/plugin.cjs")],
}
export default config
