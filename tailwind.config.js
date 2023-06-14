/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "#111219",
                bigcontainer: "#171821",
                cardbg: "#34353d",
            },
        },
    },
    plugins: [],
};
