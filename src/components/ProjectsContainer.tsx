import { getProjects } from "../services/services";
import { Project } from "../types/types";
import ProjectCard from "./ProjectCard";
import { useEffect, useState } from "react";
import Container from "./UI/Container";
import CreateNewProject from "./CreateNewProject";
import { createContext } from "react";

interface ProjectsContextType {
    projects: Project[];
    setProjects: (value: React.SetStateAction<Project[]>) => void;
}
export const ProjectsContext = createContext<ProjectsContextType | undefined>(
    undefined
);

export default function ProjectsContainer() {
    const [projects, setProjects] = useState<Project[]>([]);
    useEffect(() => {
        getProjects().then((data) => {
            setProjects(data.data);
        });
    }, []);
    const sortedProjects = [...projects].sort((a, b) => {
        return (
            new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
        );
    });
    return (
        <ProjectsContext.Provider value={{ projects, setProjects }}>
            <Container className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10 mb-32">
                {projects &&
                    sortedProjects?.map((project) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            description={project.description}
                            name={project.name}
                        />
                    ))}
                <CreateNewProject />
            </Container>
        </ProjectsContext.Provider>
    );
}
