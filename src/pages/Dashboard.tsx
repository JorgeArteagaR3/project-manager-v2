import { lazy, Suspense } from "react";
import Container from "../components/UI/Container";
import CardSkeleton from "../components/CardSkeleton";
import { ProjectsProvider } from "../context/ProjectsContext";

const ProjectsContainer = lazy(() => import("../components/ProjectsContainer"));

export default function Dashboard() {
    return (
        <div>
            <h2 className="my-6 md:my-12 font-bold md:text-2xl border-b pb-5 border-darkborder">
                Dashboard
            </h2>
            <ProjectsProvider>
                <Suspense
                    fallback={
                        <Container className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10 relative h-[400px]">
                            {new Array(6).fill(1).map((_, idx) => (
                                <CardSkeleton key={idx} />
                            ))}
                        </Container>
                    }
                >
                    <ProjectsContainer />
                </Suspense>
            </ProjectsProvider>
        </div>
    );
}
