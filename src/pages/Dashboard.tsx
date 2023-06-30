import { lazy, Suspense, useContext, useState } from "react";
import Container from "../components/UI/Container";
import CardSkeleton from "../components/CardSkeleton";
import PageHeader from "../components/PageHeader";
import { ProjectsContext } from "../context/ProjectsContext";

const ProjectsContainer = lazy(() => import("../components/ProjectsContainer"));

export default function Dashboard() {
    const { projects } = useContext(ProjectsContext);
    const [searchText, setSearchText] = useState("");

    const filteredProjects = projects.filter((project) => {
        const projectName = project.name.toLowerCase();
        return projectName.includes(searchText.toLowerCase());
    });

    return (
        <>
            <PageHeader searchText={searchText} setSearchText={setSearchText} />
            <main className="w-full pb-28 lg:pb-12 px-6 md:px-12">
                <h2 className="my-6 md:my-12 font-bold md:text-2xl border-b pb-5 border-darkborder">
                    Dashboard
                </h2>
                <Suspense
                    fallback={
                        <Container className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10 relative h-[400px]">
                            {new Array(6).fill(1).map((_, idx) => (
                                <CardSkeleton key={idx} />
                            ))}
                        </Container>
                    }
                >
                    <ProjectsContainer projects={filteredProjects} />
                </Suspense>
            </main>
        </>
    );
}
