// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D4ED8',
          hover: '#1E40AF',
        },
        secondary: {
          DEFAULT: '#10B981',
          hover: '#059669',
        },
      },
    },
  },
  plugins: [],
};