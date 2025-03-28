/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{jsx,js,ts,tsx}", // Scan all source files for Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)", // #1D4ED8
        secondary: "var(--secondary)", // #10B981
        accent: "var(--accent)", // #F59E0B
        neutral: "var(--neutral)", // #1F2937
        background: "var(--background)", // #F9FAFB
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};