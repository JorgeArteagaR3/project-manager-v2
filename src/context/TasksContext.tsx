import { useState, createContext } from "react";
import { TaskContextInterface } from "../types/types";

const initialValue: TaskContextInterface = {
    tasks: [],
    setTasks: () => {},
};

const TasksContext = createContext<TaskContextInterface>(initialValue);

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
    const [tasks, setTasks] = useState(initialValue.tasks);

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TasksContext.Provider>
    );
};

export { TasksContext, TasksProvider };
