/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#121315",
                lightbackground: "#f7f7f7",
                secondary: "#191d20",
                darkborder: "#3b3f40",
                darksearch: "#272a2f",
                lightsearch: "#8C9DF2",
                lightheader: "#8093F1",
                darkheader: "#add8e6",
                lightnavbar: "#9381FF",
                navbarblack: "#0d0e10",
                darktext: "#8b94a3",
                lighttext: "#333333",
                lightcard: "#8093F1",
            },
        },
    },
    plugins: [],
    darkMode: "class",
};
