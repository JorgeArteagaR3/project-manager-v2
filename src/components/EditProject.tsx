import CustomModal from "./UI/CustomModal";
import { FormEventHandler, useContext, useState } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { EditProjectInterface, Project } from "../types/types";
import SpinnerLoader from "./SpinnerLoader";
import { updateProject } from "../services/services";
import { ProjectsContext } from "../context/ProjectsContext";

const EditProject = ({
    project,
    closeModal,
    isModalOpen,
    toggleOptions,
}: EditProjectInterface) => {
    const [newProject, setNewProject] = useState<Project>({
        name: project.name,
        description: project.description,
    });
    const [isLoading, setIsLoading] = useState(false);

    const { projects, setProjects } = useContext(ProjectsContext);

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
            toggleOptions();
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
            setIsLoading(false);
            toggleOptions();
        }
    };
    const handleCloseModal = () => {
        toggleOptions();
        closeModal();
    };

    return (
        <CustomModal isModalOpen={isModalOpen} closeModal={handleCloseModal}>
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
                    <Button type="submit">Save</Button>
                    <Button className="bg-red-400" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </div>
            </form>
            {isLoading && <SpinnerLoader />}
        </CustomModal>
    );
};

export default EditProject;
