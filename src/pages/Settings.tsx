import clsx from "clsx";
import { useContext } from "react";
import { DarkThemeContext } from "../context/DarkThemeContext";
import { LuMoonStar } from "react-icons/lu";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { FiSun } from "react-icons/fi";
import Button from "../components/UI/Button";

export default function Settings() {
    const { handleDarkTheme, handleSystemTheme, handleLightTheme, theme } =
        useContext(DarkThemeContext);
    return (
        <main className="w-full pb-28 lg:pb-12 px-6 md:px-12">
            <h2 className="page-title">Settings</h2>
            <div>
                <div className="border-b mb-4">
                    <h3 className="">Dark Mode:</h3>
                    <ul
                        className={clsx(
                            "static opacity-1  duration-300 flex  justify-between bg-transparent"
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
                                }}
                            >
                                <FiSun />
                                Light
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="text-center">
                    <Button className="max-w-[500px]">
                        Return to Dashboard
                    </Button>
                </div>
            </div>
        </main>
    );
}
