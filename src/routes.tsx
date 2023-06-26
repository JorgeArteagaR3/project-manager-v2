import { useContext } from "react";
import { Routes as Router, Route, Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import Cookies from "js-cookie";

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
        return <Navigate to="/dashboard" />;
    }

    if (!isAuthenticated) return <Outlet />;
};

const Routes = () => {
    return (
        <Router>
            <Route element={<PublicRoutes />}>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
            </Route>
            <Route element={<PrivateRoutes />}>
                <Route path="*" element={<Navigate to={"/dashboard"} />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/project/:id" element={<Project />} />
            </Route>
        </Router>
    );
};
export default Routes;
