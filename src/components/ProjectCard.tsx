import Card from "./UI/Card";
import { Project } from "../types/project";
import { useState } from "react";
import { Link } from "react-router-dom";
import EditProject from "./EditProject";
import CircularProgress from "./UI/CircularProgress";
import { BsCheck } from "react-icons/bs";
import clsx from "clsx";
import { useModal } from "../hooks/useModal";
import { useProject } from "../hooks/useProject";
import OptionsDropdown from "./OptionsDropdown";

export default function ProjectCard({ project }: { project: Project }) {
    const { isModalOpen, closeModal, openModal } = useModal();
    const [areOptionsOpen, setAreOptionsOpen] = useState(false);
    const handleOptions = () => {
        setAreOptionsOpen(!areOptionsOpen);
    };

    const {
        allTasksAreCompleted,
        completedTasks,
        totalTasks,
        handleDeleteProjects,
        percentage,
    } = useProject({ project });

    return (
        <Card className="relative">
            <div className="flex justify-between items-center border-b border-darkborder pb-2 mb-4">
                <div
                    className={clsx(
                        "bg-amber-400 rounded-full px-2 py-1 font-bold text-sm mb-2 text-secondary",
                        allTasksAreCompleted && "bg-green-300",
                        !totalTasks && "bg-gray-300"
                    )}
                >
                    {!totalTasks
                        ? "Not Started"
                        : totalTasks && !allTasksAreCompleted
                        ? "On Going"
                        : "Completed"}
                </div>
                <OptionsDropdown
                    onDelete={handleDeleteProjects}
                    onEdit={openModal}
                />
            </div>
            <div className="border-b border-darkborder pb-6 dark:text-white text-black">
                <Link
                    to={`/project/${project.id}`}
                    className="font-bold text-lg mb-1 first-letter:uppercase dark:lg:hover:text-green-200 lg:hover:text-slate-700 lg:duration-200"
                >
                    {project.name}
                </Link>
                <p className="text-xs first-letter:uppercase">
                    {project.description}
                </p>
            </div>
            {project.tasks?.length ? (
                <div className="w-full flex justify-between pt-4">
                    {allTasksAreCompleted ? (
                        <p className="opacity-70">{`All ${totalTasks} done!`}</p>
                    ) : (
                        <p className="opacity-70">{`${completedTasks}/${totalTasks} done`}</p>
                    )}
                    <div className="relative">
                        <CircularProgress
                            percentage={percentage}
                            key={project.id}
                            strokeWidth={14}
                        />
                        {allTasksAreCompleted && (
                            <div className="absolute w-full h-full bg-green-300 top-0 rounded-full">
                                <BsCheck className="h-full w-full text-background" />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full flex justify-between pt-4">
                    <p>No Tasks yet</p>
                </div>
            )}
            <EditProject
                closeModal={closeModal}
                isModalOpen={isModalOpen}
                project={project}
                toggleOptions={handleOptions}
            />
        </Card>
    );
}
