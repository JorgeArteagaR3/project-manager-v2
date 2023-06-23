import { lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import Container from "../components/UI/Container";
import CardSkeleton from "../components/CardSkeleton";

const ProjectsContainer = lazy(() => import("../components/ProjectsContainer"));

export default function Dashboard() {
    return (
        <div className="flex flex-col lg:flex-row h-screen w-screen">
            <Navbar />
            <main className="w-full px-6">
                <PageHeader title="Dashboard" />
                <Suspense
                    fallback={
                        <Container className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10 mb-32 relative h-[400px]">
                            {new Array(6).fill(1).map((_, idx) => (
                                <CardSkeleton key={idx} />
                            ))}
                        </Container>
                    }
                >
                    <ProjectsContainer />
                </Suspense>
            </main>
        </div>
    );
}
