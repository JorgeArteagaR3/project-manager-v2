import { Project } from "../types/types";
import ProjectCard from "./ProjectCard";
import Container from "./UI/Container";
import CreateNewProject from "./CreateNewProject";

export default function ProjectsContainer({
    projects,
}: {
    projects: Project[];
}) {
    return (
        <Container className="grid md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10 pb-28 relative w-full">
            <CreateNewProject />
            {projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </Container>
    );
}
