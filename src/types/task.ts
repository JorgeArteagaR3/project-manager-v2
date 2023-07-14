export interface TaskInterface {
    createdAt?: string;
    description?: string;
    id?: string;
    projectId?: string;
    status?: string;
    title?: string;
    updatedAt?: string;
}
export interface TaskContextInterface {
    tasks: TaskInterface[];
    saveTasks: (value: TaskInterface[]) => void;
    addTask: (value: TaskInterface) => void;
    removeTask: (value: TaskInterface) => void;
    updateTask: (value: TaskInterface) => void;
}
