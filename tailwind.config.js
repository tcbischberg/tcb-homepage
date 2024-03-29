/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        blue: '#4b4bff',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
