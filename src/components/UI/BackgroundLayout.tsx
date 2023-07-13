import { NotificationContext } from "../../context/NotificationContext";
import Notification from "../Notification";
import { useContext } from "react";

export default function BackgroundLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isNotificationShowing } = useContext(NotificationContext);
    return (
        <div className="dark:bg-background bg-lightbackground dark:text-darktext text-lighttext relative">
            {children}
            {isNotificationShowing && <Notification />}
        </div>
    );
}
