import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineSetting } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const location = useLocation();
    const { user } = useContext(AuthContext);

    const navlinks = [
        { path: "/dashboard", Icon: LuLayoutDashboard, name: "Dashboard" },
        { path: `/profile/${user.id}`, Icon: CiUser, name: "Profile" },
        { path: "/settings", Icon: AiOutlineSetting, name: "Settings" },
    ];
    return (
        <nav
            className="fixed z-30 w-full h-20 bottom-0 grid grid-cols-3 place-items-center dark:bg-navbarblack bg-lightnavbar text-center
         lg:grid-cols-1 lg:w-72 lg:h-full lg:text-xl lg:fixed lg:px-6"
        >
            <Link
                to={"/"}
                key={"tsks"}
                className="hidden lg:block w-full font-bold text-4xl text-green-300 hover:text-white duration-200"
            >
                Tsks.
            </Link>
            {navlinks.map(({ path, name, Icon }) => (
                <Link
                    key={path}
                    to={path}
                    className={clsx(
                        "w-full flex justify-center gap-4 lg:py-6 lg:duration-300 lg:rounded-xl dark:lg:hover:bg-secondary dark:lg:hover:text-white lg:hover:bg-lightsearch lg:hover:text-white",
                        location.pathname === path &&
                            "dark:lg:bg-secondary dark:text-white rounded-xl lg:bg-lightsearch"
                    )}
                >
                    <Icon className="text-lg lg:text-2xl" />
                    <span className="hidden lg:block">{name}</span>
                </Link>
            ))}
        </nav>
    );
}
