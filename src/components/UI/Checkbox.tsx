import { BsCheck } from "react-icons/bs";
import { updateTask } from "../../services/services";

export default function Checkbox({
    isCompleted,
    taskId,
    getTasks,
}: {
    isCompleted: boolean;
    taskId: string;
    getTasks: () => void;
}) {
    return (
        <div className="relative h-6 w-6">
            <input
                type="checkbox"
                className="appearance-none rounded-full border-2 border-green-300 h-6 w-6 cursor-pointer checked:bg-green-300"
                checked={isCompleted}
                onChange={(e) => {
                    updateTask(taskId, {
                        status: e.target.checked ? "COMPLETED" : "IN_PROGRESS",
                    }).then((data) => {
                        getTasks();
                    });
                }}
            />
            {isCompleted && (
                <BsCheck
                    className="absolute inset-0 m-auto pointer-events-none text-background"
                    size={24}
                />
            )}
        </div>
    );
}
