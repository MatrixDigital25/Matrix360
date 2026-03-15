import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'matrix-teal': '#2DB8B8',
        'matrix-blue': '#4A9EDB',
        'matrix-dark': '#0F1419',
      },
    },
  },
  plugins: [],
}
export default config
