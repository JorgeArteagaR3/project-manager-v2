import { Link } from "react-router-dom";
import Container from "../components/UI/Container";
import Input from "../components/UI/Input";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Cookies from "js-cookie";
import SpinnerLoader from "../components/SpinnerLoader";
import Button from "../components/UI/Button";

export default function SignUp() {
    const [user, setUser] = useState({ username: "", password: "", email: "" });
    const [isLoading, setIsLoading] = useState(false);
    const { setIsAuthenticated } = useAuth();

    const url = "https://todo-backend-mf0a.onrender.com/";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const register = async () => {
        try {
            if (!user.username || !user.password || !user.email) return;
            setIsLoading(true);
            const res = await fetch(`${url}user`, {
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
            Cookies.set("user", data.token, { expires: 7 });
            setIsAuthenticated(true);
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
                        register();
                    }}
                >
                    <h2 className="font-bold text-3xl mb-3">
                        Get your free account
                    </h2>
                    <p className="text-2xl mb-2">Welcome Back.</p>
                    <p className="text-2xl mb-6">You've been missed!</p>
                    <div className="flex flex-col gap-2 mb-6">
                        <label htmlFor="username">Username</label>
                        <Input
                            id="username"
                            type="text"
                            placeholder="User"
                            onChange={handleInputChange}
                            name="username"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                        <label htmlFor="email">Email</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Your@email.com"
                            onChange={handleInputChange}
                            name="email"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-10">
                        <label htmlFor="password">Password</label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Your password"
                            onChange={handleInputChange}
                        />
                    </div>
                    <p className="mb-6 text-center ">
                        Already have an account?
                        <Link to={"/signin"} className="text-lime-500">
                            {" "}
                            Sign In
                        </Link>
                    </p>
                    <Button type="submit">Sign Up</Button>
                </form>
                {isLoading && <SpinnerLoader />}
            </Container>
        </div>
    );
}
