import { createContext } from "react";
import { useState } from "react";

interface DarkThemeInterface {
    theme: string;
    setTheme: (value: React.SetStateAction<string>) => void;
    handleDarkTheme: () => void;
    handleLightTheme: () => void;
    handleSystemTheme: () => void;
}
const initialValue: DarkThemeInterface = {
    theme: "",
    setTheme: () => {},
    handleDarkTheme: () => {},
    handleLightTheme: () => {},
    handleSystemTheme: () => {},
};

const DarkThemeContext = createContext<DarkThemeInterface>(initialValue);

const DarkThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState(initialValue.theme);

    const handleDarkTheme = () => {
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
        setTheme("dark");
    };

    const handleLightTheme = () => {
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark");
        setTheme("light");
    };

    const handleSystemTheme = () => {
        const isDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        setTheme("system");
        if (isDarkMode) {
            localStorage.theme = "system";
            document.documentElement.classList.add("dark");
        } else {
            localStorage.theme = "system";
            document.documentElement.classList.remove("dark");
        }
    };

    return (
        <DarkThemeContext.Provider
            value={{
                theme,
                setTheme,
                handleDarkTheme,
                handleLightTheme,
                handleSystemTheme,
            }}
        >
            {children}
        </DarkThemeContext.Provider>
    );
};
export { DarkThemeContext, DarkThemeProvider };
