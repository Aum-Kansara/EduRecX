/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgLink: "#6f8fac",
        borderBottom: {
          before: "#dddddd63",
          after: "#5891ff",
        },
        transparent: "transparent",
        HomeBG: {
          main: "#020202",
          side: "#334155",
          content: "#070808",
        },
        btn: {
          create: "#bb3928",
        },
      },
      transitionProperty: {
        border: "border",
      },
    },
  },
  plugins: [],
};
