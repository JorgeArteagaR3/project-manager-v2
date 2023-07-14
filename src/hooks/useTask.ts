import { useContext } from "react";
import { TasksContext } from "../context/TasksContext/TasksContext";
import {
    deleteTask as deleteTaskService,
    updateTask as updateTaskService,
} from "../services/services";
import { TaskInterface } from "../types/task";
import { NotificationContext } from "../context/NotificationContext";
import { useSpinnerLoader } from "./useSpinnerLoader";

export const useTask = (task: TaskInterface) => {
    const { SpinnerLoader, isSpinnerLoading, setIsSpinnerLoading } =
        useSpinnerLoader();

    const { updateTask, removeTask } = useContext(TasksContext);

    const { setIsNotificationShowing, setNotification } =
        useContext(NotificationContext);

    const handleUpdateTask: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        e.preventDefault();
        setIsSpinnerLoading(true);
        updateTaskService(task.id!, {
            status: e.target.checked ? "COMPLETED" : "IN_PROGRESS",
        }).then((data) => {
            const updatedTask: TaskInterface = data.data;

            updateTask(updatedTask);
            setIsSpinnerLoading(false);
        });
    };

    const deleteTask = async () => {
        const data = await deleteTaskService(task.id!);
        setIsNotificationShowing(true);
        setNotification({
            message: "Task deleted!",
            success: true,
        });

        const deletedTask: TaskInterface = data.data;
        if (!deletedTask) {
            return;
        }

        removeTask(deletedTask);
    };

    const isCompleted = task.status === "COMPLETED" ? true : false;

    return {
        isCompleted,
        deleteTask,
        handleUpdateTask,
        isSpinnerLoading,
        SpinnerLoader,
    };
};
