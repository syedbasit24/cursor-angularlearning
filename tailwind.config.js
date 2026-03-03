/** @type {import('tailwindcss').Config} */
module.exports = {
  /**
   * content[] tells TailwindCSS v3 WHERE to scan for class names.
   * It generates only the utilities actually used in these files.
   * This is how v3 "tree-shakes" unused CSS — keeping the bundle small.
   */
  content: [
    './src/**/*.{html,ts,scss}',
  ],

  /**
   * darkMode: 'class' → dark styles are applied when a parent element has class="dark".
   * We toggle this on <html> via ThemeService.
   */
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // Angular brand red scale — used throughout the platform
        primary: {
          50:  '#FFF0F0',
          100: '#FFE0E0',
          200: '#FFBDBD',
          300: '#FF8C8C',
          400: '#FF5555',
          500: '#DD0031',
          600: '#C3002F',
          700: '#A80028',
          800: '#8A0020',
          900: '#700018',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      animation: {
        'fade-in':       'fadeIn 0.5s ease-out',
        'slide-up':      'slideUp 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'float':         'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)'   },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
