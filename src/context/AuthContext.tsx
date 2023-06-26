import { ReactNode, createContext, useState } from "react";
import { AuthContextType } from "../types/types";

const initialValue: AuthContextType = {
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    user: { exp: 0, iat: 0, id: "", username: "" },
    setUser: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        initialValue.isAuthenticated
    );
    const [user, setUser] = useState(initialValue.user);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
