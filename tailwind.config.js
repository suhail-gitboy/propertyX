module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: false,      // ⛔ No themes → no background color changes
  },
  plugins: [require("daisyui")],
};
