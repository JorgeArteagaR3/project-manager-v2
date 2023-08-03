import CustomModal from "./UI/CustomModal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { ModalInterface } from "../types/types";
import { useState, useContext } from "react";
import { createTask } from "../services/services";
import { useParams } from "react-router-dom";
import { TasksContext } from "../context/TasksContext/TasksContext";
import { NotificationContext } from "../context/NotificationContext";
import { TaskInterface } from "../types/task";
import { useSpinnerLoader } from "../hooks/useSpinnerLoader";

export const CreateNewTask = ({ isModalOpen, closeModal }: ModalInterface) => {
    const [newTask, setNewTask] = useState<TaskInterface>({
        title: "",
        description: "",
    });
    const { SpinnerLoader, isSpinnerLoading, setIsSpinnerLoading } =
        useSpinnerLoader();
    const { id } = useParams();
    const { addTask } = useContext(TasksContext);
    const { setIsNotificationShowing, setNotification } =
        useContext(NotificationContext);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault();
        if (!newTask.title?.length || newTask.title.length <= 6) return;
        setIsSpinnerLoading(true);
        const data = await createTask(id!, newTask);
        setIsNotificationShowing(true);
        setNotification({
            message: "Task created!",
            success: true,
        });
        const createdTask: TaskInterface = data.data;
        addTask(createdTask);

        setIsSpinnerLoading(false);
        closeModal();
        setNewTask({ title: "", description: "" });
    };

    return (
        <CustomModal isModalOpen={isModalOpen} closeModal={closeModal}>
            <form onSubmit={handleFormSubmit}>
                <h3 className="font-bold text-center text-xl mb-4">
                    Add a new Task
                </h3>
                <div className="flex flex-col gap-2 mb-6">
                    <label htmlFor="title" className="mb-2">
                        Name
                    </label>
                    <Input
                        type="text"
                        placeholder="Task title"
                        name="title"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col gap-2 mb-10">
                    <label htmlFor="description mb-2">
                        Description (optional)
                    </label>
                    <Input
                        type="text"
                        placeholder="Task description"
                        name="description"
                        className="h-16"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex gap-4">
                    <Button type="submit">Create</Button>
                    <Button onClick={closeModal}>Cancel</Button>
                </div>
            </form>
            {isSpinnerLoading && <SpinnerLoader />}
        </CustomModal>
    );
};
