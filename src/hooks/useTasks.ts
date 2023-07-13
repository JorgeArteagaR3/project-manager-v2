import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { TasksContext } from "../context/TasksContext/TasksContext";
import { getProjectById } from "../services/services";
import { TaskInterface } from "../types/task";

export const useTasks = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const { tasks, saveTasks } = useContext(TasksContext);
    const [searchTask, setSearchTask] = useState("");

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = async () => {
        setIsLoading(true);
        const data = await getProjectById(id!);
        if (!data) {
            setIsLoading(false);
            return;
        }
        console.log(data);
        const tasks: TaskInterface[] = data.data.tasks;
        saveTasks(tasks);
        setIsLoading(false);
    };

    const filteredTasks = tasks.filter((task) => {
        const taskTitle = task.title?.toLowerCase();
        return taskTitle?.includes(searchTask.toLowerCase());
    });
    const totalTasks = tasks.length;

    return {
        filteredTasks,
        isLoading,
        tasks,
        searchTask,
        setSearchTask,
        totalTasks,
    };
};
