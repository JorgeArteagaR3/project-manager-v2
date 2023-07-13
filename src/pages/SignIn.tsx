import { Link, useNavigate } from "react-router-dom";
import Container from "../components/UI/Container";
import Input from "../components/UI/Input";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import SpinnerLoader from "../components/SpinnerLoader";
import Button from "../components/UI/Button";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { userLogin } from "../services/services";

const SignIn = () => {
    const [userInput, setUserInput] = useState({ username: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const { setIsAuthenticated } = useContext(AuthContext);
    const { setIsNotificationShowing, setNotification } =
        useContext(NotificationContext);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const navigate = useNavigate();

    const login = async () => {
        try {
            if (userInput.username && userInput.password) {
                setIsLoading(true);

                const res = await userLogin(userInput);

                setIsLoading(false);

                if (!res.ok) {
                    const { message } = await res.json();
                    throw new Error(message);
                }
                const { message, token } = await res.json();

                setNotification({ success: true, message });
                setIsNotificationShowing(true);

                Cookies.set("user", token);
                setIsAuthenticated(true);

                navigate("/dashboard");
            }
        } catch (e: unknown) {
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
            <Container className="px-8 py-10 bg-transparent max-w-[550px] relative">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        login();
                    }}
                    autoComplete="on"
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
                            value={userInput.username}
                            onChange={handleInputChange}
                            key={"signinusername"}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-10">
                        <label htmlFor="password">Password</label>
                        <Input
                            id="password"
                            placeholder="Your password"
                            aria-current
                            type="password"
                            name="password"
                            value={userInput.password}
                            onChange={handleInputChange}
                            autoComplete="on"
                            key={"signinpassword"}
                        />
                    </div>
                    <p className="mb-6 text-center">
                        Don't have an account?
                        <Link to={"/signup"} className="text-lime-500">
                            {" "}
                            Sign Up
                        </Link>
                    </p>
                    <Button type="submit">Sign In</Button>
                </form>
                {isLoading && (
                    <SpinnerLoader className="bg-[rgba(247,247,247,0.75)]" />
                )}
            </Container>
        </div>
    );
};

export default SignIn;
