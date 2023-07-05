import { LuMoonStar } from "react-icons/lu";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { FiSun } from "react-icons/fi";
import { useState, useContext } from "react";
import clsx from "clsx";
import { DarkThemeContext } from "../context/DarkThemeContext";

export default function DarkMode() {
    const [isOpen, setIsOpen] = useState(false);
    const showList = () => {
        setIsOpen(!isOpen);
    };

    const { handleDarkTheme, handleLightTheme, handleSystemTheme, theme } =
        useContext(DarkThemeContext);

    const isDarkMode = theme === "dark" ? true : false;

    const icon =
        theme === "dark" ? (
            <LuMoonStar
                className={clsx(
                    "text-2xl cursor-pointer hover:scale-110 duration-200",
                    isDarkMode && "text-blue-500"
                )}
                onClick={showList}
            />
        ) : theme === "light" ? (
            <FiSun
                className="text-2xl cursor-pointer dark:text-blue-500 text-yellow-300 hover:scale-110 duration-200"
                onClick={showList}
            />
        ) : (
            <HiOutlineDesktopComputer
                className={clsx(
                    "text-2xl cursor-pointer hover:scale-110 duration-200 dark:text-blue-500 text-yellow-300",
                    !isDarkMode && "text-blue-500"
                )}
                onClick={showList}
            />
        );

    return (
        <div className="relative">
            {icon}
            <ul
                className={clsx(
                    "absolute z-20 options-list top-8 opacity-1 visible duration-300",
                    !isOpen && "invisible opacity-0"
                )}
            >
                <li>
                    <button
                        className={clsx(
                            "flex w-full h-full items-center justify-center gap-2 options-item",
                            theme === "system" && "text-blue-500"
                        )}
                        onClick={() => {
                            handleSystemTheme();
                            showList();
                        }}
                    >
                        <HiOutlineDesktopComputer />
                        System
                    </button>
                </li>
                <li>
                    <button
                        className={clsx(
                            "flex w-full h-full items-center justify-center gap-2 options-item",
                            theme === "dark" && "text-blue-500"
                        )}
                        onClick={() => {
                            handleDarkTheme();
                            showList();
                        }}
                    >
                        <LuMoonStar />
                        Dark
                    </button>
                </li>
                <li>
                    <button
                        className={clsx(
                            "flex w-full h-full items-center justify-center gap-2 options-item",
                            theme === "light" && "text-blue-500"
                        )}
                        onClick={() => {
                            handleLightTheme();
                            showList();
                        }}
                    >
                        <FiSun />
                        Light
                    </button>
                </li>
            </ul>
        </div>
    );
}
