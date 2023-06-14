import { LuLayoutDashboard } from "react-icons/lu";
import { BsCalendar2Event } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { GoPlus } from "react-icons/go";
import { CiUser } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function Navbar() {
    // const urls = [
    //     { path: "/dashboard", Icon: LuLayoutDashboard, name: "Dashboard" },
    //     { path: "/calendar", Icon: BsCalendar2Event, name: "Calendar" },
    //     { path: "/settings", Icon: AiOutlineSetting, name: "Settings" },
    //     { path: "/profile", Icon: CiUser, name: "Profile" },
    // ];

    return (
        <nav
            className="fixed z-30 border-t border-gray-700 lg:border-t-0 lg:border-r w-full h-20 bottom-0 grid grid-cols-5 place-items-center 
        bg-background lg:grid-cols-1 lg:w-40 lg:static  lg:h-full lg:text-xl text-center"
        >
            <Link to={"/"} className="hidden lg:block w-full">
                Logo
            </Link>

            <Link to={"/dashboard"} className="w-full">
                <LuLayoutDashboard className="lg:text-2xl text-lg mx-auto lg:mb-2" />
                <span className="hidden lg:block text-center">Dashboard</span>
            </Link>
            <Link to={"/calendar"} className="w-full">
                <BsCalendar2Event className="lg:text-2xl text-lg mx-auto lg:mb-2" />
                <span className="hidden lg:block">Calendar</span>
            </Link>
            <div className="p-3 bg-white rounded-full mx-auto">
                <GoPlus className="lg:text-2xl text-background text-lg" />
            </div>
            <Link to={"/settings"} className="w-full">
                <AiOutlineSetting className="text-lg lg:text-2xl mx-auto lg:mb-2" />
                <span className="hidden lg:block">Settings</span>
            </Link>
            <Link to={"/profile"} className="w-full">
                <CiUser className="text-lg lg:text-2xl mx-auto lg:mb-2" />
                <span className="hidden lg:block">Profile</span>
            </Link>
        </nav>
    );
}
