import Container from "../components/UI/Container";
import CardSkeleton from "../components/CardSkeleton";
import PageHeader from "../components/PageHeader";
import { useProjects } from "../hooks/useProjects";
import ProjectsContainer from "../components/ProjectsContainer";

export default function Dashboard() {
    const { searchProject, setSearchProject, filteredProjects, isLoading } =
        useProjects();

    return (
        <>
            <PageHeader
                searchText={searchProject}
                setSearchText={setSearchProject}
            />
            <main className="w-full pb-28 lg:pb-12 px-6 md:px-12">
                <h2 className="page-title">Dashboard</h2>
                {isLoading ? (
                    <Container className="grid md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10 pb-28 relative w-full h-[400px]">
                        {new Array(6).fill(1).map((_, idx) => (
                            <CardSkeleton key={idx} />
                        ))}
                    </Container>
                ) : (
                    <ProjectsContainer projects={filteredProjects} />
                )}
            </main>
        </>
    );
}
