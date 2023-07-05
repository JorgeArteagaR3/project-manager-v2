export interface User {
    exp: number;
    iat: number;
    id: string;
    username: string;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: React.SetStateAction<boolean>) => void;
    user: User | undefined;
    setUser: (value: React.SetStateAction<User | undefined>) => void;
}

export interface TaskInterface {
    createdAt?: string;
    description?: string;
    id?: string;
    projectId?: string;
    status?: string;
    title?: string;
    updatedAt?: string;
}

export interface Project {
    id?: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    belongsToId?: string;
    tasks?: TaskInterface[];
}

export interface ModalInterface {
    isModalOpen: boolean;
    closeModal: () => void;
}

export interface TaskContextInterface {
    tasks: TaskInterface[];
    setTasks: (value: React.SetStateAction<TaskInterface[]>) => void;
}

export interface ProjectsContextInterface {
    projects: Project[];
    setProjects: (value: React.SetStateAction<Project[]>) => void;
}
export interface EditProjectInterface extends ModalInterface {
    project: Project;
    toggleOptions: () => void;
}
