import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useUser } from "../hooks/useUser";

export default function Layout() {
    useUser();

    return (
        <div className="flex flex-col lg:flex-row">
            <Navbar />
            <div className="w-full lg:pl-72 min-h-screen">
                <Outlet />
            </div>
        </div>
    );
}
