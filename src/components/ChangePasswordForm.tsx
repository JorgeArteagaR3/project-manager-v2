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

export default function ChangePasswordForm() {
    const [newPassword, setNewPassword] = useState({
        password: "",
        newpassword: "",
    });
    const { setUser } = useContext(AuthContext);
    const { setIsNotificationShowing, setNotification } =
        useContext(NotificationContext);
    const { isSpinnerLoading, setIsSpinnerLoading, SpinnerLoader } =
        useSpinnerLoader();

    const { id } = useParams();

    const handleNewPasswordChange: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setNewPassword((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const changeEmail = async () => {
        try {
            setIsSpinnerLoading(true);
            const { data }: { data: User } = await updateUser(id!, newPassword);
            setIsNotificationShowing(true);
            setIsSpinnerLoading(false);
            setNotification({
                message: "Email changed successfully!",
                success: true,
            });
            setUser(data);
            setNewPassword({ newpassword: "", password: "" });
        } catch (e) {
            setIsSpinnerLoading(false);
            setIsNotificationShowing(true);
            setNotification({
                message: "Wrong password",
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
                <label htmlFor="old">Old password: </label>
                <Input
                    type="text"
                    id="old"
                    className="w-full"
                    autoComplete="off"
                    name="password"
                    value={newPassword.password}
                    onChange={handleNewPasswordChange}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="new">New Password: </label>
                <Input
                    type="password"
                    id="new"
                    className="w-full"
                    autoComplete="off"
                    name="newpassword"
                    value={newPassword.newpassword}
                    onChange={handleNewPasswordChange}
                />
            </div>
            <Button
                className="row-start-2 col-span-2 max-h-10 max-w-md mx-auto"
                type="submit"
            >
                Save Changes
            </Button>
            <div className="bg-red-400"></div>
            {isSpinnerLoading && (
                <SpinnerLoader className="bg-[rgba(247,247,247,0.75)]" />
            )}
        </form>
    );
}
