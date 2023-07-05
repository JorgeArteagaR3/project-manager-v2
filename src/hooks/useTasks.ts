import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { TasksContext } from "../context/TasksContext";
import { getProjectById } from "../services/services";
import { TaskInterface } from "../types/types";

export const useTasks = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const { tasks, setTasks } = useContext(TasksContext);
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
        let sortedTasks: TaskInterface[] = data.data.tasks;
        sortedTasks.sort(
            (a, b) =>
                new Date(a.createdAt!).getTime() -
                new Date(b.createdAt!).getTime()
        );
        setTasks(sortedTasks);
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
