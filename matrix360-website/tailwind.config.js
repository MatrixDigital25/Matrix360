/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1A1A1A', // Deep Charcoal
        'accent': '#0070F3', // Electric Blue (from logo)
        'accent-light': '#5B9FD6', // Light blue from logo
        'accent-teal': '#4A9FB5', // Teal from logo
        'white': '#FFFFFF',
        'gray': {
          50: '#F9FAFB',
          100: '#F3F4F6',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          800: '#2A2A2A',
          900: '#1A1A1A',
        },
        'success': '#10B981',
        'warning': '#F59E0B',
        'error': '#EF4444',
        'info': '#3B82F6',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Inter"', 'sans-serif'],
        'mono': ['Monaco', 'Courier New', 'monospace'],
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '36px',
        '5xl': '48px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 3px rgba(0,0,0,0.12)',
        'md': '0 4px 6px rgba(0,0,0,0.1)',
        'lg': '0 10px 20px rgba(0,0,0,0.15)',
        'xl': '0 15px 30px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
};
