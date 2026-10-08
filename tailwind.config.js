/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-surface-variant": "#3f4850", "surface-dim": "#cbdbf5", "surface-container-low": "#eff4ff", 
        "tertiary-fixed": "#c4e7ff", "on-primary": "#ffffff", "outline-variant": "#bfc7d2", 
        "inverse-primary": "#93ccff", "on-error-container": "#93000a", "on-secondary": "#ffffff", 
        "tertiary-container": "#007da9", "tertiary-fixed-dim": "#7bd0ff", "primary": "#006194", 
        "surface-tint": "#006398", "surface-container-high": "#dce9ff", "on-tertiary": "#ffffff", 
        "surface-container-highest": "#d3e4fe", "on-background": "#0b1c30", "surface-variant": "#d3e4fe", 
        "secondary-container": "#dae2fd", "error-container": "#ffdad6", "error": "#ba1a1a", 
        "inverse-on-surface": "#eaf1ff", "on-error": "#ffffff", "on-secondary-fixed": "#131b2e", 
        "secondary-fixed-dim": "#bec6e0", "primary-fixed-dim": "#93ccff", "on-tertiary-fixed-variant": "#004c69", 
        "on-secondary-container": "#5c647a", "on-primary-container": "#fdfcff", "secondary": "#565e74", 
        "surface-container-lowest": "#ffffff", "primary-fixed": "#cce5ff", "secondary-fixed": "#dae2fd", 
        "on-secondary-fixed-variant": "#3f465c", "outline": "#707881", "on-surface": "#0b1c30", 
        "background": "#f8f9ff", "inverse-surface": "#213145", "on-tertiary-container": "#fcfcff", 
        "surface-bright": "#f8f9ff", "on-primary-fixed-variant": "#004b73", "surface-container": "#e5eeff", 
        "on-primary-fixed": "#001d31", "surface": "#f8f9ff", "tertiary": "#006387", "primary-container": "#007bb9", 
        "on-tertiary-fixed": "#001e2c"
      },
      fontFamily: {
        "headline-lg-mobile": ["Plus Jakarta Sans"], "display-mobile": ["Plus Jakarta Sans"], 
        "body-sm": ["Manrope"], "headline-md": ["Plus Jakarta Sans"], "label-sm": ["Manrope"], 
        "headline-sm": ["Plus Jakarta Sans"], "body-lg": ["Manrope"], "body-md": ["Manrope"], 
        "headline-lg": ["Plus Jakarta Sans"], "display": ["Plus Jakarta Sans"], "label-md": ["Manrope"]
      }
    }
  },
  plugins: [],
}