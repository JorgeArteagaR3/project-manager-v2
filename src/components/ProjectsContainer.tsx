import { getProjects } from "../services/services";
import { Project } from "../types/types";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import Container from "./UI/Container";
import CreateNewProject from "./CreateNewProject";
import { createContext } from "react";
import CardSkeleton from "./CardSkeleton";

interface ProjectsContextType {
    projects: Project[];
    setProjects: (value: React.SetStateAction<Project[]>) => void;
}
export const ProjectsContext = createContext<ProjectsContextType | undefined>(
    undefined
);

export default function ProjectsContainer() {
    const [projects, setProjects] = useState<Project[]>([]);
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
        <ProjectsContext.Provider value={{ projects, setProjects }}>
            <Container className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10 mb-32 relative">
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
        </ProjectsContext.Provider>
    );
}
