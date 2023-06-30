import jwtDecode from "jwt-decode";
import { User } from "../types/types";
import Cookies from "js-cookie";
import { AiOutlineDown } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import clsx from "clsx";

export default function PageHeader({
    searchText,
    setSearchText,
}: {
    searchText: string;
    setSearchText: (value: string) => void;
}) {
    const token = Cookies.get("user");
    const decodedUser: User = jwtDecode(token!);
    const [isShowing, setIsShowing] = useState(false);

    const { setIsAuthenticated } = useContext(AuthContext);

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
        setSearchText(e.target.value);
    };

    return (
        <header className="py-6 flex w-full px-6 md:px-10 bg-secondary mb-4 flex-col gap-4 items-end md:flex-row-reverse md:items-center md:justify-between">
            <div className="flex items-center gap-2">
                <p
                    className={clsx(
                        "flex gap-1 duration-300",
                        isShowing && "text-white"
                    )}
                >
                    Welcome,
                    <span className="block first-letter:uppercase">
                        {decodedUser.username}
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
                        <li
                            onClick={handleSignOut}
                            className="cursor-pointer options-item border-b border-stone-800 text-red-400"
                        >
                            Sign Out
                        </li>
                        <li
                            className="cursor-pointer options-item"
                            onClick={toggleOptions}
                        >
                            Close
                        </li>
                    </ul>
                </div>
            </div>
            <div className="w-full relative">
                <input
                    type="text"
                    placeholder="Search"
                    className="border-none pl-11 w-full md:max-w-[400px] py-3 rounded-lg bg-darksearch outline-none text-white"
                    value={searchText}
                    onChange={handleInputChange}
                />
                <BsSearch className="absolute top-0 bottom-0 my-auto left-3" />
            </div>
        </header>
    );
}
