import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import { useState } from "react";
import SignUp from "./pages/SignUp";
import Cookies from "js-cookie";
import { AuthContext } from "./hooks/useAuth";
import Project from "./pages/Project";

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const user = Cookies.get("user");
    if (user && !isAuthenticated) {
        setIsAuthenticated(true);
    }

    return (
        <>
            <BrowserRouter>
                <AuthContext.Provider
                    value={{ isAuthenticated, setIsAuthenticated }}
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
                                isAuthenticated ? (
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
