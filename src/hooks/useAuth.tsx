import { SetStateAction, createContext, useContext } from "react";

export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: SetStateAction<boolean>) => void;
}
export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export const useAuth = () => {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext;
};
