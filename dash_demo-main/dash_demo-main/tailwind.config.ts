import { type Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  darkMode: ["class"],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        apple: { DEFAULT: '#68B945', 50: '#D4EBCA', 100: '#C8E6BB', 200: '#B0DB9E', 300: '#98D080', 400: '#80C562', 500: '#68B945', 600: '#519036', 700: '#3A6727', 800: '#233E17', 900: '#0C1608', 950: '#010100' },
        atlantis: { DEFAULT: '#B0D23D', 50: '#EDF5D2', 100: '#E6F1C1', 200: '#D8E9A0', 300: '#CBE17F', 400: '#BDDA5E', 500: '#B0D23D', 600: '#90AE28', 700: '#6A811E', 800: '#455313', 900: '#1F2609', 950: '#0C0F03' },
        ecstasy: { DEFAULT: '#F57C13', 50: '#FCDEC3', 100: '#FCD3B0', 200: '#FABD88', 300: '#F8A761', 400: '#F7923A', 500: '#F57C13', 600: '#C76108', 700: '#924706', 800: '#5C2D04', 900: '#261302', 950: '#0B0500' },
        'dark-ebony': { DEFAULT: '#3E1F04', 50: '#EA750F', 100: '#D76C0E', 200: '#B1580B', 300: '#8B4509', 400: '#643206', 500: '#3E1F04', 600: '#090501', 700: '#000000', 800: '#000000', 900: '#000000', 950: '#000000' },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-open-sans)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tw-elements/dist/plugin.cjs")],
} satisfies Config;
