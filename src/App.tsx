import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { ProjectsProvider } from "./context/ProjectsContext";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ProjectsProvider>
                    <Routes />
                </ProjectsProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
