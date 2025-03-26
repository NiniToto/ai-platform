/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-gradient-to-r',
    'from-blue-600',
    'from-green-600',
    'from-purple-600',
    'from-orange-600',
    'to-indigo-600',
    'to-teal-600',
    'to-pink-600',
    'to-yellow-600',
    'bg-clip-text',
    'text-transparent',
    'bg-white/80',
    'backdrop-blur-md',
    'rounded-2xl',
    'shadow-lg',
    'border',
    'border-white/20',
    'border-orange-200',
    'border-teal-200',
    'border-purple-200'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}; 