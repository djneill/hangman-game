import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "mobile-bg": "url('/images/background-mobile.svg')",
        "tablet-bg": "url('/images/background-tablet.svg')",
        "desktop-bg": "url('/images/background-desktop.svg')",
      },
      fontFamily: {
        'mouse-memoirs': ['"Mouse Memoirs"', 'sans-serif'],
      },
      fontSize: {
        'heading-xl': ['136px', { lineHeight: '1', letterSpacing: '2px' }],
        'heading-l': ['88px', { lineHeight: '1', letterSpacing: '2px' }],
        'heading-m': ['48px', { lineHeight: '1', letterSpacing: '2px' }],
        'heading-s': ['32px', { lineHeight: '1', letterSpacing: '2px' }],
        'body': ['26px', { lineHeight: '1', letterSpacing: '2px' }],
      },
    },
  },
  plugins: [],
};
export default config;
