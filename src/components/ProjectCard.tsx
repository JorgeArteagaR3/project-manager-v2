import Card from "./UI/Card";
import { RxDotsVertical } from "react-icons/rx";
import { Project } from "../types/types";
import { useContext, useState } from "react";
import SpinnerLoader from "./SpinnerLoader";
import { deleteProject } from "../services/services";
import { Link } from "react-router-dom";
import EditProject from "./EditProject";
import CircularProgress from "./UI/CircularProgress";
import { BsCheck } from "react-icons/bs";
import clsx from "clsx";
import { ProjectsContext } from "../context/ProjectsContext";
import { useModal } from "../hooks/useModal";

export default function ProjectCard({ project }: { project: Project }) {
    const [areOptionsOpen, setAreOptionsOpen] = useState(false);
    const { isModalOpen, closeModal, openModal } = useModal();
    const { projects, setProjects } = useContext(ProjectsContext);
    const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);

    const handleOptions = () => {
        setAreOptionsOpen(!areOptionsOpen);
    };

    const handleDeleteProjects = () => {
        setIsSpinnerLoading(true);
        deleteProject(project.id!).then((data) => {
            const deletedProject: Project = data.data;
            const filteredProjects = projects.filter(
                (project) => project.id !== deletedProject.id
            );
            setProjects(filteredProjects);
            setIsSpinnerLoading(false);
        });
    };

    const totalTasks = project.tasks?.length;
    const completedTasks = project.tasks?.filter(
        (task) => task.status === "COMPLETED"
    ).length;

    const percentage = totalTasks ? (completedTasks! / totalTasks!) * 100 : 0;

    const allTasksAreCompleted = percentage === 100;

    return (
        <Card className="relative">
            <div className="flex justify-between items-center mb-2 border-b border-darkborder pb-2 mb-4">
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
                <div className="relative">
                    <RxDotsVertical
                        className={clsx(
                            "cursor-pointer lg:hover:text-white lg:duration-200 lg:hover:scale-110",
                            areOptionsOpen && "text-white scale-110"
                        )}
                        onClick={handleOptions}
                    />
                    <ul
                        className={clsx(
                            "options-list visible duration-300 opacity-1 ",
                            !areOptionsOpen && "invisible opacity-0 "
                        )}
                    >
                        <li
                            className="rounded-t-lg options-item text-red-400"
                            onClick={handleDeleteProjects}
                        >
                            Delete
                        </li>
                        <li
                            className="options-item"
                            onClick={() => {
                                handleOptions();
                                openModal();
                            }}
                        >
                            Edit
                        </li>
                        <li className="options-item" onClick={handleOptions}>
                            Cancel
                        </li>
                        {isSpinnerLoading && <SpinnerLoader />}
                    </ul>
                </div>
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
