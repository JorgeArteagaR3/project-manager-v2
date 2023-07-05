import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { TasksProvider } from "./context/TasksContext";
import { DarkThemeProvider } from "./context/DarkThemeContext";

function App() {
    // useEffect(() => {
    //     if (!localStorage.theme) {
    //         window
    //             .matchMedia("(prefers-color-scheme: dark)")
    //             .addEventListener("change", ({ matches }) => {
    //                 if (matches) {
    //                     localStorage.theme = "dark";
    //                     document.documentElement.classList.add("dark");
    //                 } else {
    //                     localStorage.theme = "light";
    //                     document.documentElement.classList.remove("dark");
    //                 }
    //             });
    //     }
    // }, []);

    return (
        <BrowserRouter>
            <div className="dark:bg-background bg-lightbackground dark:text-darktext text-lighttext">
                <DarkThemeProvider>
                    <AuthProvider>
                        <ProjectsProvider>
                            <TasksProvider>
                                <Routes />
                            </TasksProvider>
                        </ProjectsProvider>
                    </AuthProvider>
                </DarkThemeProvider>
            </div>
        </BrowserRouter>
    );
}

export default App;
