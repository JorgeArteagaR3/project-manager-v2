import Input from "./UI/Input";
import Button from "./UI/Button";
import {
    useState,
    ChangeEventHandler,
    FormEventHandler,
    useContext,
} from "react";
import { updateUser } from "../services/services";
import { useParams } from "react-router-dom";
import { User } from "../types/types";
import { AuthContext } from "../context/AuthContext";
import { NotificationContext } from "../context/NotificationContext";
import { useSpinnerLoader } from "../hooks/useSpinnerLoader";

export default function ChangeEmailForm() {
    const [newEmail, setNewEmail] = useState({ password: "", email: "" });
    const { id } = useParams();
    const { setUser } = useContext(AuthContext);
    const { setIsNotificationShowing, setNotification } =
        useContext(NotificationContext);
    const { SpinnerLoader, isSpinnerLoading, setIsSpinnerLoading } =
        useSpinnerLoader();
    const handleNewEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewEmail((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const changeEmail = async () => {
        try {
            if (!newEmail.password || !newEmail.email) return;

            setIsSpinnerLoading(true);
            const { data }: { data: User } = await updateUser(id!, newEmail);
            setIsSpinnerLoading(false);

            setIsNotificationShowing(true);
            setNotification({
                message: "Email changed successfully!",
                success: true,
            });
            setUser(data);
            setNewEmail({ email: "", password: "" });
        } catch (e) {
            setIsSpinnerLoading(false);
            setIsNotificationShowing(true);
            setNotification({
                message: "Wrong email or password",
                success: false,
            });
        }
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        changeEmail();
    };

    return (
        <form
            className="grid lg:grid-cols-2 lg:grid-rows-2 gap-6 relative"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="old">Your password: </label>
                <Input
                    type="password"
                    id="old"
                    className="w-full"
                    autoComplete="off"
                    name="password"
                    key={"changemailpass"}
                    value={newEmail.password}
                    onChange={handleNewEmailChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="new">New Email: </label>
                <Input
                    type="email"
                    id="new"
                    className="w-full"
                    autoComplete="off"
                    name="email"
                    value={newEmail.email}
                    key={"changemailnewmail"}
                    onChange={handleNewEmailChange}
                />
            </div>
            <Button
                className="row-start-2 col-span-2 max-h-10 max-w-md mx-auto"
                type="submit"
            >
                Save Changes
            </Button>
            {isSpinnerLoading && (
                <SpinnerLoader className="bg-[rgba(247,247,247,0.75)]" />
            )}
        </form>
    );
}
