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
        navbarBgColor: 'var(--navbar_BgColor)',
        navbarTextColor: 'var(--navbar_TextColor)',
        navbarUnderlineColor: 'var(--navbar_UnderlineColor)',
        background: 'var(--background)',

        dark_navbarBgColor: 'var(--dark_Navbar_BgColor)',
        dark_navbarTextColor: 'var(--dark_Navbar_TextColor)',
        dark_navbarUnderlineColor: 'var(--dark_Navbar_UnderlineColor)',
        dark_Background: 'var(--dark_Background)',
      },
    },
  },
  plugins: [],
}
export default config
