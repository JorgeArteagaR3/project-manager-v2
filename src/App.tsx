import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ProjectsProvider } from "./context/ProjectsContext/ProjectsContext";
import { TasksProvider } from "./context/TasksContext/TasksContext";
import { DarkThemeProvider } from "./context/DarkThemeContext";
import BackgroundLayout from "./components/UI/BackgroundLayout";
import { NotificationProvider } from "./context/NotificationContext";
function App() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>
    );
}

export default App;
