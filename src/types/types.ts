export interface User {
    createdAt: string;
    email: string;
    id: string;
    username: string;
    password: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: React.SetStateAction<boolean>) => void;
    user: User;
    setUser: (value: React.SetStateAction<User>) => void;
}

export interface ModalInterface {
    isModalOpen: boolean;
    closeModal: () => void;
}

export interface NewEmail {
    password: string;
    email: string;
}
export interface NewPassword {
    password: string;
    newpassword: string;
}
export interface INotification {
    message: string;
    success: boolean;
}

export interface NotificationContextInterface {
    notification: INotification;
    setNotification: (value: React.SetStateAction<INotification>) => void;
    isNotificationShowing: boolean;
    setIsNotificationShowing: (value: React.SetStateAction<boolean>) => void;
}
