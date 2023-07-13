import { ModalInterface } from "./types";
import { TaskInterface } from "./task";

export interface Project {
    id?: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    belongsToId?: string;
    tasks?: TaskInterface[];
}

export interface ProjectsContextInterface {
    projects: Project[];
    setFetchedProjects: (value: Project[]) => void;
    addProject: (value: Project) => void;
    removeProject: (value: Project) => void;
    updateProject: (value: Project) => void;
}

export interface EditProjectInterface extends ModalInterface {
    project: Project;
    toggleOptions: () => void;
}
