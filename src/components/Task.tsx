import { BsCheck } from "react-icons/bs";
import { TaskInterface } from "../types/task";
import EditTask from "./EditTask";
import { useModal } from "../hooks/useModal";
import { useTask } from "../hooks/useTask";
import Card from "./UI/Card";
import OptionsDropdown from "./OptionsDropdown";

export const Task = ({ task }: { task: TaskInterface }) => {
    const { isModalOpen, closeModal, openModal } = useModal();

    const {
        isCompleted,
        isSpinnerLoading,
        handleUpdateTask,
        deleteTask,
        SpinnerLoader,
    } = useTask(task);

    return (
        <Card className="flex justify-between items-center w-full p-6 rounded-2xl relative">
            {isSpinnerLoading && <SpinnerLoader className="rounded-2xl" />}
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
                <OptionsDropdown
                    onDelete={deleteTask}
                    onEdit={openModal}
                    className="ml-2 md:ml-4 lg:ml-6"
                />
            </div>
            <EditTask
                isEditModalOpen={isModalOpen}
                task={task}
                closeModal={closeModal}
            />
        </Card>
    );
};
