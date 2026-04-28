import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nashbud: {
          bg: '#080a09',
          panel: '#101513',
          muted: '#9bb8a6',
          accent: '#26bf68',
          accentSoft: '#19452b',
        },
      },
      boxShadow: {
        glow: '0 12px 32px rgba(38, 191, 104, 0.15)',
      },
    },
  },
  plugins: [],
};

export default config;
