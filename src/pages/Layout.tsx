import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";

export default function Layout() {
    return (
        <div className="flex flex-col lg:flex-row">
            <Navbar />
            <div className="w-full lg:pl-72">
                <PageHeader />
                <main className="px-6 md:px-12 w-full">
                    {/* //Oulet === children */}
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
