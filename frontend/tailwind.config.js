/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#9BC53D',
        secondaryColor: '#193424',
      },
      heightNavbarLogin: {
        'height': '55px'
      }
    }
  },
  darkMode: "class",
  plugins: [nextui()]
}
