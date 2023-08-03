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
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

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
    const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    const login = async (user: typeof userInput) => {
        try {
            if (user.username && user.password) {
                setIsLoading(true);
                const { message, token } = await userLogin(user);
                setIsLoading(false);

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
                setIsLoading(false);
            } else {
                console.log("Unknown error:", e);
            }
        }
    };
    const googleSignIn = async (response: CredentialResponse) => {
        const { credential, clientId } = response;
        const { name }: { name: string } = jwtDecode(credential!);
        await login({ username: name, password: clientId!.substring(0, 8) });
    };
    return (
        <div className="min-h-screen">
            <Container className="px-8 py-10 bg-transparent max-w-[550px] relative">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        login(userInput);
                    }}
                    autoComplete="on"
                >
                    <h2 className="font-bold text-3xl mb-3 text-green-300">
                        Let's sign you in
                    </h2>
                    <p className="text-2xl mb-2">Welcome Back.</p>
                    <p className="text-2xl mb-6">You've been missed!</p>
                    <div className="flex flex-col gap-2 mb-6">
                        <label htmlFor="username ">Username</label>
                        <Input
                            placeholder="User"
                            type="text"
                            name="username"
                            value={userInput.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-10">
                        <label htmlFor="password">Password</label>
                        <Input
                            placeholder="Your password"
                            aria-current
                            type="password"
                            name="password"
                            value={userInput.password}
                            onChange={handleInputChange}
                            autoComplete="on"
                        />
                    </div>
                    <p className="mb-6 text-center">
                        Don't have an account?
                        <Link to={"/signup"} className="text-green-300">
                            {" "}
                            Sign Up
                        </Link>
                    </p>
                    <Button type="submit" className="mb-4">
                        Sign In
                    </Button>
                    <div className="w-full flex justify-center">
                        <GoogleLogin
                            size={"large"}
                            theme={isDarkMode ? "filled_black" : "outline"}
                            text={"signin_with"}
                            onSuccess={googleSignIn}
                            onError={() => {
                                console.log("Login Failed");
                            }}
                        />
                    </div>
                </form>
                {isLoading && (
                    <SpinnerLoader className="bg-[rgba(247,247,247,0.75)]" />
                )}
            </Container>
        </div>
    );
};

export default SignIn;
