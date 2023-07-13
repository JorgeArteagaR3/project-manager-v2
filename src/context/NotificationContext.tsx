import { createContext, useState } from "react";
import { NotificationContextInterface } from "../types/types";

const initialValue: NotificationContextInterface = {
    notification: { message: "", success: false },
    setNotification: () => {},
    isNotificationShowing: false,
    setIsNotificationShowing: () => {},
};

const NotificationContext =
    createContext<NotificationContextInterface>(initialValue);

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notification, setNotification] = useState(initialValue.notification);
    const [isNotificationShowing, setIsNotificationShowing] = useState(false);
    return (
        <NotificationContext.Provider
            value={{
                notification,
                setNotification,
                isNotificationShowing,
                setIsNotificationShowing,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContext, NotificationProvider };
