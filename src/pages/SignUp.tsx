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
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

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

    const register = async (newuser: typeof user) => {
        try {
            if (!newuser.username || !newuser.password || !newuser.email)
                return;

            setIsLoading(true);
            const { token, message } = await createUser(newuser);
            setIsLoading(false);

            setIsNotificationShowing(true);
            setNotification({ message, success: true });
            Cookies.set("user", token, { expires: 7 });
            setIsAuthenticated(true);
            navigate("/dashboard");
        } catch (e) {
            if (e instanceof Error) {
                setNotification({ success: false, message: e.message });
                setIsNotificationShowing(true);
                setIsLoading(false);
            } else {
                console.log("Unknown error:", e);
            }
        }
    };

    const handleGoogleSignUp = async (response: CredentialResponse) => {
        const { credential, clientId } = response;
        const { name, email }: { name: string; email: string } = jwtDecode(
            credential!
        );
        console.log({ name }, { clientId });
        await register({
            email,
            username: name,
            password: clientId?.substring(0, 8)!,
        });
    };

    return (
        <div className="min-h-screen">
            <Container className="px-8 py-10 bg-transparent max-w-[550px] relative ">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        register(user);
                    }}
                    autoComplete="off"
                >
                    <h2 className="font-bold text-3xl mb-3 text-green-300">
                        Get your free account
                    </h2>
                    <p className="text-2xl mb-2">Welcome.</p>
                    <p className="text-2xl mb-6">Let's get started!</p>
                    <div className="flex flex-col gap-2 mb-6">
                        <label htmlFor="username">Username</label>
                        <Input
                            type="text"
                            placeholder="User"
                            onChange={handleInputChange}
                            name="username"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                        <label htmlFor="email">Email</label>
                        <Input
                            type="email"
                            placeholder="Your@email.com"
                            onChange={handleInputChange}
                            name="email"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-10">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            onChange={handleInputChange}
                        />
                    </div>
                    <p className="mb-6 text-center ">
                        Already have an account?
                        <Link to={"/signin"} className="text-green-300">
                            {" "}
                            Sign In
                        </Link>
                    </p>
                    <Button type="submit" className="mb-4">
                        Sign Up
                    </Button>
                    <div className="w-full flex justify-center">
                        <GoogleLogin
                            size={"large"}
                            theme={"filled_black"}
                            text={"signup_with"}
                            onSuccess={handleGoogleSignUp}
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
}
