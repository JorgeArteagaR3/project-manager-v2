import { createContext, useReducer } from "react";
import { Project, ProjectsContextInterface } from "../../types/project";
import { projectsReducer } from "./ProjectsReducer";

const initialContextValue: ProjectsContextInterface = {
    projects: [],
    setFetchedProjects: () => {},
    addProject: () => {},
    removeProject: () => {},
    updateProject: () => {},
};

const ProjectsContext =
    createContext<ProjectsContextInterface>(initialContextValue);

const ProjectsProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(projectsReducer, { projects: [] });

    const { projects } = state;

    const setFetchedProjects = (projects: Project[]) => {
        dispatch({
            type: "GET_PROJECT",
            payload: projects,
        });
    };

    const addProject = (project: Project) => {
        dispatch({
            type: "ADD_PROJECT",
            payload: [project],
        });
    };

    const removeProject = (project: Project) => {
        dispatch({
            type: "REMOVE_PROJECT",
            payload: project,
        });
    };

    const updateProject = (project: Project) => {
        dispatch({
            type: "UPDATE_PROJECT",
            payload: project,
        });
    };

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                setFetchedProjects,
                addProject,
                removeProject,
                updateProject,
            }}
        >
            {children}
        </ProjectsContext.Provider>
    );
};
export { ProjectsContext, ProjectsProvider };
