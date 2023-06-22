import CustomModal from "./UI/CustomModal";
import { FormEventHandler, useContext, useState } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import {
    EditProjectInterface,
    Project,
    ProjectsContextInterface,
} from "../types/types";
import { ProjectsContext } from "./ProjectsContainer";
import SpinnerLoader from "./SpinnerLoader";
import { updateProject } from "../services/services";

const EditProject = ({
    project,
    closeModal,
    isModalOpen,
}: EditProjectInterface) => {
    const [newProject, setNewProject] = useState<Project>({
        name: project.name,
        description: project.description,
    });
    const [isLoading, setIsLoading] = useState(false);

    const { projects, setProjects } = useContext(
        ProjectsContext
    ) as ProjectsContextInterface;

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (newProject.name.length <= 8) return;
        if (newProject.name === project.name) return;
        setIsLoading(true);
        try {
            updateProject(project.id!, newProject).then((data) => {
                const updatedProject: Project = data.data;
                const filteredProjects = projects.map((oneProject) =>
                    oneProject.id === updatedProject.id
                        ? updatedProject
                        : oneProject
                );
                setProjects(filteredProjects);
                setIsLoading(false);
                closeModal();
            });
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    };

    return (
        <CustomModal isModalOpen={isModalOpen} closeModal={closeModal}>
            <form onSubmit={handleSubmitForm}>
                <p className="text-xl font-bold text-center mb-6">
                    Edit your Project
                </p>
                <div className="flex flex-col gap-2 mb-6">
                    <label htmlFor="name" className="mb-2">
                        Name
                    </label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="Project name"
                        name="name"
                        value={newProject.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex flex-col gap-2 mb-10">
                    <label htmlFor="description mb-2">
                        Description (optional)
                    </label>
                    <Input
                        type="text"
                        id="description"
                        placeholder="Project description"
                        name="description"
                        value={newProject.description}
                        className="h-16"
                        onChange={handleInputChange}
                    />
                </div>
                <div className="flex gap-4">
                    <Button type="submit">Create</Button>
                    <Button className="bg-red-400" onClick={closeModal}>
                        Cancel
                    </Button>
                </div>
            </form>
            {isLoading && <SpinnerLoader />}
        </CustomModal>
    );
};

export default EditProject;
