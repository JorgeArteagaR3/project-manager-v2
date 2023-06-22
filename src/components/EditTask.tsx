import { TaskContextInterface, TaskInterface } from "../types/types";
import CustomModal from "./UI/CustomModal";
import { useState, useContext } from "react";
import SpinnerLoader from "./SpinnerLoader";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { updateTask } from "../services/services";
import { TasksContext } from "../pages/Project";

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
    const [isFormLoading, setIsFormLoading] = useState(false);
    const { tasks, setTasks } = useContext(
        TasksContext
    ) as TaskContextInterface;

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setIsFormLoading(true);
        updateTask(task.id!, newTask).then((data) => {
            let updatedTask: TaskInterface = data.data;

            let newTasks = tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            );
            setTasks(newTasks);
            setIsFormLoading(false);
            closeModal();
        });
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
                    <Button type="submit">Create</Button>
                    <Button className="bg-red-400" onClick={closeModal}>
                        Cancel
                    </Button>
                </div>
            </form>
            {isFormLoading && <SpinnerLoader />}
        </CustomModal>
    );
}
