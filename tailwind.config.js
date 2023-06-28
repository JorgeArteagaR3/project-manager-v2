/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#121315",
                secondary: "#191d20",
                darktext: "#79818e",
                darkborder: "#3b3f40",
                darksearch: "#272a2f",
            },
        },
    },
    plugins: [],
};
