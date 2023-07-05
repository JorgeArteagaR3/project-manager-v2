import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
    return (
        <div className="flex flex-col lg:flex-row">
            <Navbar />
            <div className="w-full lg:pl-72 min-h-screen">
                <Outlet />
            </div>
        </div>
    );
}
