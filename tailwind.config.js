/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        page: "1180px",
        ic: "24px",
      },
      height: {
        ic: "24px",
      },
      colors: {
        dark_blue: "#003463",
        gray: "#707070",
        text: "#333333",
        title: "#111111",
        link: "#3273DC",
        main: "#f1f2f6",
      },
      fontSize: {
        h5: "13px",
        h4: "14px",
        h3: "16px",
        h2: "19px",
        h1: "29px",
        caption: "12px",
      },
    },
  },
  plugins: [],
};
