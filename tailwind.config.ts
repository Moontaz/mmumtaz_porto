import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        paper: '#f4f4f1',
        line: '#d9d9d3',
        electric: '#2454ff',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '-0.07em',
      },
      maxWidth: {
        shell: '1440px',
      },
    },
  },
  plugins: [],
};

export default config;
