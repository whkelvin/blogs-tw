/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,md}'],
  theme: {
    extend: {
      fontFamily: {
        wenkai: ['"LXGW WenKai TC"', 'sans-serif'],
        noto: ['"Noto Sans TC"', 'sans-serif'],
      },
      colors: {
        background: '#F2F2F0',
        primary: '#5D6168',
        'primary-foreground': '#f2f2f0',
        subtle: '#e5e7eb',
        'subtle-foreground': '#505050',
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            }
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}; 