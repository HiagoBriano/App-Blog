import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navbarBgColor: 'var(--navbarBgColor)',
        navbarTextColor: 'var(--navbarTextColor)',
        navbarUnderlineColor: 'var(--navbarUnderlineColor)',

        dark_navbarBgColor: 'var(--darkNavbarBgColor)',
        dark_navbarTextColor: 'var(--darkNavbarTextColor)',
        dark_navbarUnderlineColor: 'var(--darkNavbarUnderlineColor)',
      },
    },
  },
  plugins: [],
}
export default config
