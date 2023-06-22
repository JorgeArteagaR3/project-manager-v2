import Card from "./UI/Card";
import { RxDotsVertical } from "react-icons/rx";
import { Project, ProjectsContextInterface } from "../types/types";
import { useContext, useState } from "react";
import SpinnerLoader from "./SpinnerLoader";
import { deleteProject } from "../services/services";
import { ProjectsContext } from "./ProjectsContainer";
import { Link } from "react-router-dom";
import EditProject from "./EditProject";
import CircularProgress from "./UI/CircularProgress";
import { BsCheck } from "react-icons/bs";
import clsx from "clsx";

export default function ProjectCard({ project }: { project: Project }) {
    const [areOptionsOpen, setAreOptionsOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
        handleOptions();
    };
    const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);

    const closeModal = () => setIsModalOpen(false);

    const { projects, setProjects } = useContext(
        ProjectsContext
    ) as ProjectsContextInterface;

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

    const allTasks = project.tasks?.length;
    const completedTasks = project.tasks?.filter(
        (task) => task.status === "COMPLETED"
    ).length;

    const percentage = allTasks ? (completedTasks! / allTasks!) * 100 : 0;
    const allTasksAreCompleted = percentage === 100;
    return (
        <Card className="relative">
            <div className="flex justify-between items-center mb-2">
                <div
                    className={clsx(
                        "bg-amber-400 rounded-full px-2 py-1 font-bold text-sm mb-2 text-bigcontainer",
                        allTasksAreCompleted && "bg-green-300"
                    )}
                >
                    {allTasksAreCompleted ? "Completed" : "On Going"}
                </div>
                <div className="relative">
                    <RxDotsVertical
                        className="cursor-pointer"
                        onClick={handleOptions}
                    />
                    {areOptionsOpen && (
                        <ul className="options-list">
                            <li
                                className="rounded-t-lg border-b border-stone-800 py-2 options-item text-red-400"
                                onClick={handleDeleteProjects}
                            >
                                Delete
                            </li>
                            <li
                                className="py-2 border-b border-stone-800 options-item"
                                onClick={openModal}
                            >
                                Edit
                            </li>
                            <li
                                className="py-2 options-item"
                                onClick={handleOptions}
                            >
                                Cancel
                            </li>
                            {isSpinnerLoading && <SpinnerLoader />}
                        </ul>
                    )}
                </div>
            </div>
            <div className="border-b border-gray-600 pb-6">
                <Link
                    to={`/project/${project.id}`}
                    className="font-bold text-lg mb-1 first-letter:uppercase"
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
                        <p className="opacity-70">{`All ${allTasks} done!`}</p>
                    ) : (
                        <p className="opacity-70">{`${completedTasks}/${allTasks} done`}</p>
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
            />
        </Card>
    );
}
