import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import { useState, useEffect } from "react";
import SignUp from "./pages/SignUp";
import { AuthContext } from "./hooks/useAuth";
import Project from "./pages/Project";
import { User } from "./types/types";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const token = Cookies.get("user");
        if (token) {
            setIsAuthenticated(true);
            setUser(jwtDecode(token));
        }
    }, [isAuthenticated]);

    return (
        <>
            <BrowserRouter>
                <AuthContext.Provider
                    value={{
                        isAuthenticated,
                        setIsAuthenticated,
                        user,
                        setUser,
                    }}
                >
                    <Routes>
                        <Route
                            path="/signin"
                            element={
                                isAuthenticated ? (
                                    <Navigate to={"/dashboard"} />
                                ) : (
                                    <Signin />
                                )
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                isAuthenticated ? (
                                    <Navigate to="/dashboard" />
                                ) : (
                                    <SignUp />
                                )
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                isAuthenticated ? (
                                    <Dashboard />
                                ) : (
                                    <Navigate to={"/signin"} />
                                )
                            }
                        />
                        <Route
                            path="/project/:id"
                            element={
                                isAuthenticated && user !== undefined ? (
                                    <Project />
                                ) : (
                                    <Navigate to={"/signin"} />
                                )
                            }
                        />

                        <Route
                            path="*"
                            element={
                                isAuthenticated ? (
                                    <Navigate to="/dashboard" />
                                ) : (
                                    <Navigate to="/signin" />
                                )
                            }
                        />
                    </Routes>
                </AuthContext.Provider>
            </BrowserRouter>
        </>
    );
}

export default App;
