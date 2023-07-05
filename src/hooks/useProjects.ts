import { useContext, useState, useEffect } from "react";
import { ProjectsContext } from "../context/ProjectsContext";
import { Project } from "../types/types";
import { getProjects } from "../services/services";

export const useProjects = () => {
    const { projects, setProjects } = useContext(ProjectsContext);
    const [searchProject, setSearchProject] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllProjects();
    }, []);

    const getAllProjects = async () => {
        setIsLoading(true);
        const data = await getProjects();
        if (!data) {
            setIsLoading(false);
            return;
        }
        let sortedProjects: Project[] = data.data;
        sortedProjects.sort(
            (a, b) =>
                new Date(a.createdAt!).getTime() -
                new Date(b.createdAt!).getTime()
        );
        setProjects(sortedProjects);
        setIsLoading(false);
    };

    const filteredProjects = projects.filter((project) => {
        const projectName = project.name.toLowerCase();
        return projectName.includes(searchProject.toLowerCase());
    });

    return { filteredProjects, searchProject, setSearchProject, isLoading };
};
