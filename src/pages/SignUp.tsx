import { Link, useNavigate } from "react-router-dom";
import Container from "../components/UI/Container";
import Input from "../components/UI/Input";
import { useState, useContext } from "react";
import Cookies from "js-cookie";
import SpinnerLoader from "../components/SpinnerLoader";
import Button from "../components/UI/Button";
import { AuthContext } from "../context/AuthContext";
import { createUser } from "../services/services";
import { NotificationContext } from "../context/NotificationContext";

export default function SignUp() {
    const [user, setUser] = useState({ username: "", password: "", email: "" });
    const [isLoading, setIsLoading] = useState(false);
    const { setIsAuthenticated } = useContext(AuthContext);
    const { setNotification, setIsNotificationShowing } =
        useContext(NotificationContext);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const navigate = useNavigate();

    const register = async () => {
        try {
            if (!user.username || !user.password || !user.email) return;

            setIsLoading(true);
            const res = await createUser(user);
            setIsLoading(false);

            if (!res.ok) {
                throw new Error("Username or Email already taken");
            }
            const { token, message } = await res.json();

            setIsNotificationShowing(true);
            setNotification({ message, success: true });
            Cookies.set("user", token, { expires: 7 });
            setIsAuthenticated(true);

            navigate("/dashboard");
        } catch (e) {
            if (e instanceof Error) {
                setNotification({ success: false, message: e.message });
                setIsNotificationShowing(true);
            } else {
                console.log("Unknown error:", e);
            }
        }
    };

    return (
        <div className="min-h-screen">
            <Container className="px-8 py-10 bg-transparent max-w-[550px] relative ">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        register();
                    }}
                    autoComplete="off"
                >
                    <h2 className="font-bold text-3xl mb-3">
                        Get your free account
                    </h2>
                    <p className="text-2xl mb-2">Welcome.</p>
                    <p className="text-2xl mb-6">Let's get started!</p>
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
                {isLoading && (
                    <SpinnerLoader className="bg-[rgba(247,247,247,0.75)]" />
                )}
            </Container>
        </div>
    );
}
