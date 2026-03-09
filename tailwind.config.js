/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#151e2e', // Um tom mais escuro personalizado se precisar
          900: '#0f172a', // Padrão Tailwind
        },
        amber: {
          450: '#f59e0b', // Ajuste fino do dourado
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}