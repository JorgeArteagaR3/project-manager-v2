import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthContextType } from "../types/types";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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

    const navigate = useNavigate();

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
