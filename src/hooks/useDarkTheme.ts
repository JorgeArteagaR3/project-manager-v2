import { useEffect, useContext } from "react";
import { DarkThemeContext } from "../context/DarkThemeContext";

export const useDarkTheme = () => {
    const { handleDarkTheme, handleLightTheme, handleSystemTheme, theme } =
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
        if (theme === "system") {
            window
                .matchMedia("(prefers-color-scheme: dark)")
                .addEventListener("change", ({ matches }) => {
                    if (matches) {
                        document.documentElement.classList.add("dark");
                    } else {
                        document.documentElement.classList.remove("dark");
                    }
                });
        }
    }, [theme]);
};
