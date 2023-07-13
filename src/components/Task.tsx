import { BsCheck } from "react-icons/bs";
import { TaskInterface } from "../types/task";
import SpinnerLoader from "./SpinnerLoader";
import { RxDotsVertical } from "react-icons/rx";
import EditTask from "./EditTask";
import clsx from "clsx";
import { useModal } from "../hooks/useModal";
import { useTask } from "../hooks/useTask";
import Card from "./UI/Card";

export const Task = ({ task }: { task: TaskInterface }) => {
    const { isModalOpen, closeModal, openModal } = useModal();
    const {
        areOptionsLoading,
        isCompleted,
        isLoading,
        handleUpdateTask,
        toggleOptions,
        removeTask,
        areOptionsOpen,
    } = useTask(task);

    const handleEdit = () => {
        openModal();
        toggleOptions();
    };

    return (
        <Card className="flex justify-between items-center w-full p-6 rounded-2xl relative">
            {isLoading && <SpinnerLoader className="rounded-2xl" />}
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
                <div className="relative ml-2 md:ml-4 lg:ml-6">
                    <RxDotsVertical
                        className="cursor-pointer justify-self-end "
                        onClick={toggleOptions}
                    />
                    <ul
                        className={clsx(
                            "options-list visible opacity-1 duration-300",
                            !areOptionsOpen && "invisible opacity-0"
                        )}
                    >
                        <li
                            className="options-item py-2 text-red-400 rounded-t-lg"
                            onClick={removeTask}
                        >
                            Delete
                        </li>
                        <li className="options-item py-2" onClick={handleEdit}>
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
                </div>
            </div>
            <EditTask
                isEditModalOpen={isModalOpen}
                task={task}
                closeModal={closeModal}
            />
        </Card>
    );
};
