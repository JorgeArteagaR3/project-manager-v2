import { createContext } from "react";
import { ProjectsContextInterface } from "../types/types";
import { useState } from "react";

const initialValue: ProjectsContextInterface = {
    projects: [],
    setProjects: () => {},
};

const ProjectsContext = createContext<ProjectsContextInterface>(initialValue);

const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
    const [projects, setProjects] = useState(initialValue.projects);

    return (
        <ProjectsContext.Provider value={{ projects, setProjects }}>
            {children}
        </ProjectsContext.Provider>
    );
};
export { ProjectsContext, ProjectsProvider };
