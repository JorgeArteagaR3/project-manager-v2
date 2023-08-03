import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ProjectsProvider } from "./context/ProjectsContext/ProjectsContext";
import { TasksProvider } from "./context/TasksContext/TasksContext";
import { DarkThemeProvider } from "./context/DarkThemeContext";
import BackgroundLayout from "./components/UI/BackgroundLayout";
import { NotificationProvider } from "./context/NotificationContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    return (
        <BrowserRouter>
            <GoogleOAuthProvider
                clientId={
                    "118661546251-44dkqbjbeocqug2ha5h43f7gnp41nmfs.apps.googleusercontent.com"
                }
            >
                <NotificationProvider>
                    <BackgroundLayout>
                        <DarkThemeProvider>
                            <AuthProvider>
                                <ProjectsProvider>
                                    <TasksProvider>
                                        <Routes />
                                    </TasksProvider>
                                </ProjectsProvider>
                            </AuthProvider>
                        </DarkThemeProvider>
                    </BackgroundLayout>
                </NotificationProvider>
            </GoogleOAuthProvider>
        </BrowserRouter>
    );
}

export default App;
