/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'powderBlue':'#AFC1D6',
        'persianOrange':'#DB9065',
        'pompPowder':'#8D6B94',
        'whiteSmoke':'#F4F4F4'
      },
      screens:{
        'sm':'300px'
      }
    },
  },
  plugins: [],
}
