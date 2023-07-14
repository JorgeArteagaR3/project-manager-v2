import { useContext } from "react";
import { Project } from "../types/project";
import { deleteProject } from "../services/services";
import { ProjectsContext } from "../context/ProjectsContext/ProjectsContext";
import { NotificationContext } from "../context/NotificationContext";
import { useSpinnerLoader } from "./useSpinnerLoader";

export const useProject = ({ project }: { project: Project }) => {
    const { removeProject } = useContext(ProjectsContext);

    const { setIsNotificationShowing, setNotification } =
        useContext(NotificationContext);

    const handleDeleteProjects = async () => {
        const data = await deleteProject(project.id!);
        setIsNotificationShowing(true);
        setNotification({ message: "Project deleted!", success: true });
        const deletedProject: Project = data.data;
        removeProject(deletedProject);
    };

    const totalTasks = project.tasks?.length;
    const completedTasks = project.tasks?.filter(
        (task) => task.status === "COMPLETED"
    ).length;

    const percentage = totalTasks ? (completedTasks! / totalTasks!) * 100 : 0;

    const allTasksAreCompleted = percentage === 100;
    return {
        allTasksAreCompleted,
        completedTasks,
        totalTasks,
        percentage,
        handleDeleteProjects,
    };
};
