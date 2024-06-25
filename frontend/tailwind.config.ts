import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-default": "#79BEC1",
        "primary-light": "#ACDEE0",
        "primary-lighter": "#DEF5F6",
        "primary-dark": "#4B979B",
        "primary-darker": "#2F8083",
        "secondary-default": "#FFE09F",
        "secondary-light": "#FFECC3",
        "secondary-lighter": "#FFF7E6",
        "secondary-dark": "#FFD47B",
        "secondary-darker": "#D9AB4D",
      },
    },
  },
  plugins: [],
};
export default config;
