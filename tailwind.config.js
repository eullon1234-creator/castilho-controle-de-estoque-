/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E52320",
        "primary-container": "#dc2626",
        "on-primary": "#ffffff",
        secondary: "#1e293b",
        "secondary-container": "#f1f5f9",
        "on-secondary-container": "#0f172a",
        tertiary: "#991b1b",
        "tertiary-fixed": "#fee2e2",
        "tertiary-fixed-dim": "#fca5a5",
        error: "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        surface: "#f8f9fa",
        "surface-dim": "#d9dadb",
        "surface-bright": "#f8f9fa",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f3f4f5",
        "surface-container": "#edeeef",
        "surface-container-high": "#e7e8e9",
        "surface-container-highest": "#e1e3e4",
        "on-surface": "#191c1d",
        "on-surface-variant": "#414754",
        outline: "#727785",
        "outline-variant": "#c1c6d6"
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
};
