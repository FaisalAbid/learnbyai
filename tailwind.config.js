/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Quicksand', 'Arial', 'sans-serif'],
        'body': ['Open Sans', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        learnbysongtheme: {
          primary: "#4A90E2",          // Soft blue
          "primary-content": "#FFFFFF",
          secondary: "#50C878",        // Soft green
          "secondary-content": "#FFFFFF",
          accent: "#FFB347",           // Soft orange
          "accent-content": "#333333",
          neutral: "#6B7280",          // Cool gray
          "neutral-content": "#FFFFFF",
          "base-100": "#FFFFFF",       // White
          "base-200": "#F3F4F6",       // Very light gray
          "base-300": "#E5E7EB",       // Light gray
          "base-content": "#333333",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
}