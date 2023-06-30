/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#121315",
                secondary: "#191d20",
                darkborder: "#3b3f40",
                darksearch: "#272a2f",
                navbarblack: "#0d0e10",
            },
        },
    },
    plugins: [],
};
