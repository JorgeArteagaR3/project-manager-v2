import { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import Cookies from "js-cookie";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Layout from "./pages/Layout";
import { useDocumentTitle } from "./hooks/useDocumentTitle";
import { useDarkTheme } from "./hooks/useDarkTheme";
import { useUser } from "./hooks/useUser";
const PrivateRoutes = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const token = Cookies.get("user");
    if (token) {
        setIsAuthenticated(true);
        return <Outlet />;
    }

    if (!isAuthenticated) return <Navigate to="/signin" replace />;

    return <Outlet />;
};

const PublicRoutes = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const token = Cookies.get("user");
    if (token) {
        setIsAuthenticated(true);
        return <Navigate to="/dashboard" replace />;
    }

    if (!isAuthenticated) return <Outlet />;
};

const Routes = () => {
    useDocumentTitle();
    useDarkTheme();
    return (
        <Router>
            <Route element={<PublicRoutes />}>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
            </Route>

            <Route element={<PrivateRoutes />}>
                <Route element={<Layout />}>
                    <Route path="*" element={<Navigate to={"/dashboard"} />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/project/:id" element={<Project />} />
                </Route>
            </Route>
        </Router>
    );
};
export default Routes;
