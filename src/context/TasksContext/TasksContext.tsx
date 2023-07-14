import { useReducer, createContext } from "react";
import { TaskContextInterface, TaskInterface } from "../../types/task";
import { tasksReducer } from "./TasksReducer";

const initialValue: TaskContextInterface = {
    tasks: [],
    saveTasks: () => {},
    addTask: () => {},
    removeTask: () => {},
    updateTask: () => {},
};

const TasksContext = createContext<TaskContextInterface>(initialValue);

const TasksProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(tasksReducer, { tasks: [] });
    const { tasks } = state;

    const saveTasks = (tasks: TaskInterface[]) => {
        dispatch({ type: "SAVE_TASKS", payload: tasks });
    };

    const addTask = (task: TaskInterface) => {
        dispatch({ type: "ADD_TASK", payload: [task] });
    };

    const removeTask = (task: TaskInterface) => {
        dispatch({ type: "REMOVE_TASK", payload: task });
    };

    const updateTask = (task: TaskInterface) => {
        dispatch({ type: "UPDATE_TASKS", payload: task });
    };

    return (
        <TasksContext.Provider
            value={{ tasks, saveTasks, addTask, removeTask, updateTask }}
        >
            {children}
        </TasksContext.Provider>
    );
};

export { TasksContext, TasksProvider };
