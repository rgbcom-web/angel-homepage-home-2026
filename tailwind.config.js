/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        labtop: {
          max: "1649px",
        },
        "labtop-only": {
          min: "1400px",
        },
        tablet: {
          max: "1399px",
        },
        "tablet-only": {
          max: "1399px",
          min: "769px",
        },
        mobile: {
          max: "768px",
        },
        "mobile-sm": {
          max: "479px",
        },
      },
      fontFamily: {
        primary: ["var(--font-pretendard)"],
      },
      colors: {
        "dd-navy": "hsl(var(--navy))",
        "dd-blue": "hsl(var(--blue))",
        "dd-blue-light": "hsl(var(--blue-light))",
        "dd-blue-lighter": "hsl(var(--blue-lighter))",
        "dd-mint": "hsl(var(--mint))",
        "dd-pink": "hsl(var(--pink))",
        "dd-orange": "hsl(var(--orange))",
        "dd-gray": "hsl(var(--gray))",
        "dd-gray-light": "hsl(var(--gray-light))",
        "dd-gray-lighter": "hsl(var(--gray-lighter))",
        "dd-gray-dark": "hsl(var(--gray-dark))",
        "dd-gray-darker": "hsl(var(--gray-darker))",
        "dd-gray-blue": "hsl(var(--gray-blue))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          light: "hsl(var(--destructive-light))",
          bg: "hsl(var(--destructive-bg))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        "dark-background": "hsl(var(--dark-background))",
      },
      textColor: {
        foreground: "hsl(var(--text-foreground))",
      },
      width: {
        "container-narrower": "var(--container-narrower)",
        "container-narrow": "var(--container-narrow)",
        container: "var(--container)",
        "container-wide": "var(--container-wide)",
        "container-full": "var(--container-full)",
      },
      zIndex: {
        "fixed-navigation": "var(--fixed-navigation-z-index)",
      },
      transitionTimingFunction: {
        "timing-pop": "var(--easing-pop)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
