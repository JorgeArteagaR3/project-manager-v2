import { BsCheck } from "react-icons/bs";
import { TaskContextInterface, TaskInterface } from "../types/types";
import { useContext, useState } from "react";
import { TasksContext } from "../pages/Project";
import { deleteTask, updateTask } from "../services/services";
import SpinnerLoader from "./SpinnerLoader";
import { RxDotsVertical } from "react-icons/rx";
import EditTask from "./EditTask";

export const Task = ({ task }: { task: TaskInterface }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [areOptionsOpen, setArteOptionsOpen] = useState(false);
    const [areOptionsLoading, setAreOptionsLoading] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const { tasks, setTasks } = useContext(
        TasksContext
    ) as TaskContextInterface;

    const isCompleted = task.status === "COMPLETED" ? true : false;

    const toggleOptions = () => {
        setArteOptionsOpen(!areOptionsOpen);
    };

    const closeModal = () => setIsEditModalOpen(false);
    const openModal = () => {
        setIsEditModalOpen(true);
        setArteOptionsOpen(false);
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

    return (
        <div className="flex justify-between items-center w-full bg-bigcontainer p-6 rounded-2xl relative">
            {isLoading && <SpinnerLoader />}
            <div>
                <p className="font-bold">{task.title}</p>
                <p className="text-xs">{task.description}</p>
            </div>
            <div></div>
            <div className="pl-4 flex justify-center items-center">
                <div className="relative h-6 w-6">
                    <input
                        type="checkbox"
                        className="appearance-none rounded-full border-2 border-green-300 h-6 w-6 cursor-pointer checked:bg-green-300"
                        checked={isCompleted}
                        onChange={handleUpdateTask}
                    />
                    {isCompleted && (
                        <BsCheck
                            className="absolute inset-0 m-auto pointer-events-none text-background"
                            size={24}
                        />
                    )}
                </div>
                <div className="relative">
                    <RxDotsVertical
                        className="cursor-pointer justify-self-end ml-2 md:ml-4 lg:ml-6"
                        onClick={toggleOptions}
                    />
                    {areOptionsOpen && (
                        <ul className="options-list">
                            <li
                                className="options-item py-2 border-b border-stone-800 text-red-400 rounded-t-lg"
                                onClick={removeTask}
                            >
                                Delete
                            </li>
                            <li
                                className="options-item py-2 border-b border-stone-800"
                                onClick={openModal}
                            >
                                Edit
                            </li>
                            <li
                                className="options-item py-2 rounded-b-lg"
                                onClick={toggleOptions}
                            >
                                Cancel
                            </li>
                            {areOptionsLoading && <SpinnerLoader />}
                        </ul>
                    )}
                </div>
            </div>
            <EditTask
                isEditModalOpen={isEditModalOpen}
                task={task}
                closeModal={closeModal}
            />
        </div>
    );
};
