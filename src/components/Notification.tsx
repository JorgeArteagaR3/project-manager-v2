import { useContext, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";
import { BiErrorAlt } from "react-icons/bi";
import { AiOutlineCheckCircle, AiOutlineClose } from "react-icons/ai";
import clsx from "clsx";

export default function Notification() {
    const { notification, setIsNotificationShowing } =
        useContext(NotificationContext);

    const closeNotification = () => {
        setIsNotificationShowing(false);
    };

    useEffect(() => {
        setTimeout(() => {
            closeNotification();
        }, 3000);
    }, []);

    return (
        <div
            className={clsx(
                "h-16 mr-6 mt-10 md:mr-14 md:mt-14 text-white px-4 rounded-md  absolute top-0 z-50 right-0 duration-300",
                notification.success ? "bg-green-200" : "bg-red-200"
            )}
        >
            <div className="flex justify-center gap-4 items-center h-full">
                {notification.success ? (
                    <AiOutlineCheckCircle
                        size={24}
                        className="fill-green-700"
                    />
                ) : (
                    <BiErrorAlt size={24} className="fill-red-700" />
                )}
                <p
                    className={
                        notification.success ? "text-green-700" : "text-red-700"
                    }
                >
                    {notification.message}
                </p>
                <AiOutlineClose
                    className={clsx(
                        "cursor-pointer",
                        notification.success
                            ? "fill-green-800 "
                            : "fill-red-800 "
                    )}
                    size={20}
                    onClick={closeNotification}
                />
            </div>
        </div>
    );
}
