import { Link } from "react-router-dom";
import Container from "../components/UI/Container";
import Input from "../components/UI/Input";
import { useState } from "react";
import Cookies from "js-cookie";
import SpinnerLoader from "../components/SpinnerLoader";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/UI/Button";

export default function Signin() {
    const [user, setUser] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const { setIsAuthenticated } = useAuth();
    const url = "https://todo-backend-mf0a.onrender.com/";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const login = async () => {
        try {
            if (user.username && user.password) {
                setIsLoading(true);
                const res = await fetch(`${url}signin`, {
                    method: "POST",
                    body: JSON.stringify(user),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setIsLoading(false);
                if (!res.ok) {
                    throw new Error("API ERROR");
                }
                const data = await res.json();
                setIsAuthenticated(true);
                Cookies.set("user", data.token, { expires: 7 });
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <Container className="mt-8 px-8 py-10 bg-transparent max-w-[550px] relative">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        login();
                    }}
                >
                    <h2 className="font-bold text-3xl mb-3">
                        Let's sign you in
                    </h2>
                    <p className="text-2xl mb-2">Welcome Back.</p>
                    <p className="text-2xl mb-6">You've been missed!</p>
                    <div className="flex flex-col gap-2 mb-6">
                        <label htmlFor="username ">Username</label>
                        <Input
                            id="username"
                            placeholder="User"
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-10">
                        <label htmlFor="password">Password</label>
                        <Input
                            id="password"
                            placeholder="Your password"
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <p className="mb-6 text-center ">
                        Don't have an account?
                        <Link to={"/signup"} className="text-lime-500">
                            {" "}
                            Sign Up
                        </Link>
                    </p>
                    <Button type="submit">Sign In</Button>
                </form>
                {isLoading && <SpinnerLoader />}
            </Container>
        </div>
    );
}
