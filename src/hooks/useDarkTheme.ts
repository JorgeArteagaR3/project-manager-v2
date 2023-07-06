import { useEffect, useContext } from "react";
import { DarkThemeContext } from "../context/DarkThemeContext";

export const useDarkTheme = () => {
    const { handleDarkTheme, handleLightTheme, handleSystemTheme } =
        useContext(DarkThemeContext);

    useEffect(() => {
        const theme = localStorage.theme;
        if (!theme || theme === "system") {
            handleSystemTheme();
        } else if (theme === "dark") {
            handleDarkTheme();
        } else {
            handleLightTheme();
        }
    }, []);

    useEffect(() => {
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", ({ matches }) => {
                const theme = localStorage.theme;
                if (theme !== "system") return;

                if (matches) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            });
    }, []);
};
