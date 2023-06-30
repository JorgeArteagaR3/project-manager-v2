import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineSetting } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

const navlinks = [
    { path: "/dashboard", Icon: LuLayoutDashboard, name: "Dashboard" },
    { path: "/profile", Icon: CiUser, name: "profile" },
    { path: "/settings", Icon: AiOutlineSetting, name: "Settings" },
];

export default function Navbar() {
    return (
        <nav
            className="fixed z-30 w-full h-20 bottom-0 grid grid-cols-3 place-items-center bg-navbarblack text-center
         lg:grid-cols-1 lg:w-72 lg:static lg:h-full lg:text-xl lg:fixed lg:px-6"
        >
            <Link to={"/"} className="hidden lg:block w-full">
                Logo
            </Link>
            {navlinks.map(({ path, name, Icon }) => (
                <Link
                    key={path}
                    to={path}
                    className="w-full flex justify-center gap-4 lg:py-6 lg:duration-300 lg:rounded-xl lg:hover:bg-secondary lg:hover:text-white"
                >
                    <Icon className="text-lg lg:text-2xl" />
                    <span className="hidden lg:block">{name}</span>
                </Link>
            ))}
        </nav>
    );
}
