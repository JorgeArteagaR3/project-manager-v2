import { getProjects } from "../services/services";
import { Project } from "../types/types";
import ProjectCard from "./ProjectCard";
import { useContext, useEffect, useState } from "react";
import Container from "./UI/Container";
import CreateNewProject from "./CreateNewProject";
import CardSkeleton from "./CardSkeleton";
import { ProjectsContext } from "../context/ProjectsContext";

export default function ProjectsContainer() {
    const { projects, setProjects } = useContext(ProjectsContext);
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

    return (
        <Container className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10 pb-28 relative w-full">
            {!isLoading ? (
                <>
                    <CreateNewProject />
                    {projects?.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </>
            ) : (
                new Array(6)
                    .fill(1)
                    .map((_, index) => <CardSkeleton key={index} />)
            )}
        </Container>
    );
}
