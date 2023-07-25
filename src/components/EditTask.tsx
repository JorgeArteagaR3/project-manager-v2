import { TaskInterface } from "../types/task";
import CustomModal from "./UI/CustomModal";
import { useState, useContext } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { updateTask as updateTaskService } from "../services/services";
import { TasksContext } from "../context/TasksContext/TasksContext";
import { NotificationContext } from "../context/NotificationContext";
import { useSpinnerLoader } from "../hooks/useSpinnerLoader";

export default function EditTask({
    task,
    isEditModalOpen,
    closeModal,
}: {
    task: TaskInterface;
    isEditModalOpen: boolean;
    closeModal: () => void;
}) {
    const [newTask, setNewTask] = useState<TaskInterface>({
        title: task.title,
        description: task.description,
    });

    const { SpinnerLoader, isSpinnerLoading, setIsSpinnerLoading } =
        useSpinnerLoader();

    const { updateTask } = useContext(TasksContext);

    const { setNotification, setIsNotificationShowing } =
        useContext(NotificationContext);

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault();
        if (
            newTask.title === task.title &&
            newTask.description === task.description
        )
            return;
        setIsSpinnerLoading(true);

        const data = await updateTaskService(task.id!, newTask);
        setIsNotificationShowing(true);
        setNotification({
            message: "Task edited!",
            success: true,
        });

        const updatedTask: TaskInterface = data.data;
        updateTask(updatedTask);

        setIsSpinnerLoading(false);
        closeModal();
    };
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    return (
        <CustomModal isModalOpen={isEditModalOpen} closeModal={closeModal}>
            <form onSubmit={handleFormSubmit}>
                <h3 className="font-bold text-center text-xl mb-4">
                    Edit Task
                </h3>
                <div className="flex flex-col gap-2 mb-6">
                    <label htmlFor="title" className="mb-2">
                        Name
                    </label>
                    <Input
                        type="text"
                        id="title"
                        placeholder="Task title"
                        name="title"
                        value={newTask.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col gap-2 mb-10">
                    <label htmlFor="description mb-2">
                        Description (optional)
                    </label>
                    <Input
                        type="text"
                        id="description"
                        value={newTask.description}
                        placeholder="Task description"
                        name="description"
                        className="h-16"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex gap-4">
                    <Button type="submit">Save</Button>
                    <Button onClick={closeModal}>Cancel</Button>
                </div>
            </form>
            {isSpinnerLoading && <SpinnerLoader />}
        </CustomModal>
    );
}
