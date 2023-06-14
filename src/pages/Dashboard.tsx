import Navbar from "../components/Navbar";
import ProjectsContainer from "../components/ProjectsContainer";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [user, setUser] = useState({ id: "", username: "" });
    useEffect(() => {
        const user = Cookies.get("user");
        setUser(jwt_decode(user!));
    }, []);
    return (
        <div className="flex flex-col lg:flex-row h-screen w-screen">
            <Navbar />
            <main className="w-full">
                <div className="py-6 flex justify-between mx-auto w-11/12">
                    <h1 className="font-bold">Dashboard</h1>
                    <div>
                        <p className="flex gap-1">
                            Hi,
                            <span className="block first-letter:uppercase">
                                {user.username}
                            </span>
                        </p>
                    </div>
                </div>
                <ProjectsContainer />
            </main>
        </div>
    );
}
