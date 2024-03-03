import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazir: ["Vazirmatn", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        log1: "url('/3Dmodel.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
