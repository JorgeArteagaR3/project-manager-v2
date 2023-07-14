import { RxDotsVertical } from "react-icons/rx";
import { useSpinnerLoader } from "../hooks/useSpinnerLoader";
import { useState } from "react";
import clsx from "clsx";

type OptionsTypes = {
    onDelete: () => Promise<void>;
    onEdit: () => void;
    className?: string;
};

export default function OptionsDropdown({
    onDelete,
    onEdit,
    className,
}: OptionsTypes) {
    const { SpinnerLoader, isSpinnerLoading, setIsSpinnerLoading } =
        useSpinnerLoader();
    const [areOptionsOpen, setAreOptionsOpen] = useState(false);

    const toggleOptions = () => {
        setAreOptionsOpen(!areOptionsOpen);
    };

    const handleOnEdit = () => {
        onEdit();
        toggleOptions();
    };

    const handleOnDelete = async () => {
        setIsSpinnerLoading(true);
        await onDelete();
        setIsSpinnerLoading(false);
    };

    return (
        <div className={clsx("relative ", className)}>
            <button
                className="justify-self-center flex "
                onClick={toggleOptions}
            >
                <RxDotsVertical className="cursor-pointer hover:text-white hover:scale-110 duration-300" />
            </button>

            <ul
                className={clsx(
                    "options-list visible opacity-1 duration-300",
                    !areOptionsOpen && "invisible opacity-0"
                )}
            >
                <li>
                    <button
                        type="button"
                        onClick={handleOnDelete}
                        className="options-item py-2 text-red-400 rounded-t-lg"
                    >
                        Delete
                    </button>
                </li>
                <li>
                    <button
                        className="options-item py-2"
                        onClick={handleOnEdit}
                    >
                        Edit
                    </button>
                </li>
                <li>
                    <button
                        className="options-item py-2 rounded-b-lg"
                        onClick={toggleOptions}
                    >
                        Cancel
                    </button>
                </li>
                {isSpinnerLoading && <SpinnerLoader />}
            </ul>
        </div>
    );
}
