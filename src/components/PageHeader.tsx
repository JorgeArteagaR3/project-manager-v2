import Cookies from "js-cookie";
import { AiOutlineDown } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import clsx from "clsx";
import DarkTheme from "./DarkTheme";
import { useSpinnerLoader } from "../hooks/useSpinnerLoader";

export default function PageHeader({
    searchText,
    setSearchText,
    showSearcher,
}: {
    searchText?: string;
    setSearchText?: (value: string) => void;
    showSearcher: boolean;
}) {
    const [isShowing, setIsShowing] = useState(false);
    const { SpinnerLoader } = useSpinnerLoader();
    const { user, setIsAuthenticated } = useContext(AuthContext);

    const toggleOptions = () => {
        setIsShowing(!isShowing);
    };

    const handleSignOut = () => {
        setIsAuthenticated(false);
        Cookies.remove("user");
        toggleOptions();
    };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setSearchText!(e.target.value);
    };

    return (
        <header
            className="py-6 flex w-full px-6 md:px-10 dark:bg-secondary bg-lightheader mb-4 flex-col gap-4 items-end
         md:flex-row-reverse md:items-center md:justify-between md:min-h-[96px] relative"
        >
            <div className="flex items-center gap-2">
                <DarkTheme />
                <p
                    className={clsx(
                        "flex gap-1 duration-300 ml-2",
                        isShowing && "text-white"
                    )}
                >
                    <span>Welcome, </span>
                    <span className="first-letter:uppercase">
                        {user.username}
                    </span>
                </p>
                <div className="relative">
                    <AiOutlineDown
                        onClick={toggleOptions}
                        className={clsx(
                            "cursor-pointer hover:fill-white",
                            isShowing && "fill-white"
                        )}
                    />

                    <ul
                        className={clsx(
                            "options-list visible duration-300 opacity-1",
                            !isShowing && "opacity-0 invisible"
                        )}
                    >
                        <li>
                            <button
                                onClick={handleSignOut}
                                className="cursor-pointer options-item text-red-400"
                            >
                                Sign Out
                            </button>
                        </li>
                        <li>
                            <button
                                className="cursor-pointer options-item"
                                onClick={toggleOptions}
                            >
                                Close
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {showSearcher && (
                <div className="w-full md:w-6/12 relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border-none pl-11 w-full md:max-w-[400px] py-3 rounded-lg dark:bg-darksearch 
                    bg-lightsearch outline-none dark:text-white text-lighttext dark:placeholder:text-darktext placeholder:text-lighttext"
                        value={searchText}
                        onChange={handleInputChange}
                    />
                    <BsSearch className="absolute top-0 bottom-0 my-auto left-3" />
                </div>
            )}
            {!user.id && <SpinnerLoader />}
        </header>
    );
}
