import { useState, useContext } from "react";
import { TasksContext } from "../context/TasksContext";
import { deleteTask, updateTask } from "../services/services";
import { TaskInterface } from "../types/types";

export const useTask = (task: TaskInterface) => {
    const [isLoading, setIsLoading] = useState(false);
    const [areOptionsOpen, setAreOptionsOpen] = useState(false);
    const [areOptionsLoading, setAreOptionsLoading] = useState(false);

    const { tasks, setTasks } = useContext(TasksContext);

    const toggleOptions = () => {
        setAreOptionsOpen(!areOptionsOpen);
    };

    const handleUpdateTask: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        e.preventDefault();
        setIsLoading(true);
        updateTask(task.id!, {
            status: e.target.checked ? "COMPLETED" : "IN_PROGRESS",
        }).then((data) => {
            let updatedTask: TaskInterface = data.data;

            let newTasks = tasks.map((task) =>
                task.id === updatedTask.id
                    ? { ...task, status: updatedTask.status }
                    : task
            );
            setTasks(newTasks);
            setIsLoading(false);
        });
    };

    const removeTask = async () => {
        setAreOptionsLoading(true);
        const data = await deleteTask(task.id!);
        const deletedTask: TaskInterface = data.data;
        if (!deleteTask) {
            setAreOptionsLoading(false);
            return;
        }
        let filteredTasks: TaskInterface[] = tasks.filter(
            (oneTask) => oneTask.id !== deletedTask.id
        );
        setTasks(filteredTasks);
        setAreOptionsLoading(false);
    };

    const isCompleted = task.status === "COMPLETED" ? true : false;

    return {
        toggleOptions,
        isCompleted,
        removeTask,
        handleUpdateTask,
        isLoading,
        areOptionsLoading,
        areOptionsOpen,
    };
};
