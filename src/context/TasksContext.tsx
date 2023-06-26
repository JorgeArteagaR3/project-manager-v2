import { createContext } from "react";
import { TaskContextInterface } from "../types/types";

const initialValue: TaskContextInterface = {
    tasks: [],
    setTasks: () => {},
};

const TasksContext = createContext<TaskContextInterface>(initialValue);

export { initialValue, TasksContext };
