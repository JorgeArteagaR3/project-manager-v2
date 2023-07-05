import CustomModal from "./UI/CustomModal";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { ModalInterface, TaskInterface } from "../types/types";
import SpinnerLoader from "./SpinnerLoader";
import { useState, useContext } from "react";
import { createTask } from "../services/services";
import { useParams } from "react-router-dom";
import { TasksContext } from "../context/TasksContext";

export const CreateNewTask = ({ isModalOpen, closeModal }: ModalInterface) => {
    const [newTask, setNewTask] = useState<TaskInterface>({
        title: "",
        description: "",
    });
    const [isFormLoading, setIsFormLoading] = useState(false);
    const { id } = useParams();
    const { setTasks, tasks } = useContext(TasksContext);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!newTask.title?.length || newTask.title.length <= 8) return;
        setIsFormLoading(true);
        createTask(id!, newTask).then((data) => {
            const createdTask: TaskInterface = data.data;
            setIsFormLoading(false);
            setTasks([...tasks, createdTask]);
            closeModal();
            setNewTask({ title: "", description: "" });
        });
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
                        id="title"
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
                        id="description"
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
};
