/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#635BFF",      // Stripe violet
        secondary: "#00D4FF",    // cyan gradient endpoint
        dark: "#0A0E27",         // deep navy-black background
        darker: "#060815",       // darkest background
        surface: "#12162E",      // card/panel surface
        surfaceBorder: "#1F2444",// subtle card border
        muted: "#8891B0",        // muted body text
        heading: "#F5F6FA",      // near-white headings
      },
    },
  },
  plugins: [],
};
