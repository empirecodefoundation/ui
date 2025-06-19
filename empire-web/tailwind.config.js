export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'base': '1450px',    // Base design size
        'scale-1.1': '1595px', // 1450 * 1.1
        'scale-1.2': '1740px', // 1450 * 1.2
        'scale-1.3': '1885px', // 1450 * 1.3
        'scale-1.4': '2030px', // 1450 * 1.4
        'scale-1.5': '2175px', // 1450 * 1.5
        'scale-1.6': '2320px', // 1450 * 1.6
        'scale-1.7': '2465px', // 1450 * 1.7
        'scale-1.8': '2610px', // 1450 * 1.8
        'scale-1.9': '2755px', // 1450 * 1.9
        'scale-2.0': '2900px', // 1450 * 2.0
      },
    },
  },
  plugins: [],
}; 