import CustomModal from "./UI/CustomModal";
import { FormEventHandler, useContext, useState } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { EditProjectInterface } from "../types/project";
import { updateProject as UpdateProjectService } from "../services/services";
import { ProjectsContext } from "../context/ProjectsContext/ProjectsContext";
import { NotificationContext } from "../context/NotificationContext";
import { Project } from "../types/project";
import { useSpinnerLoader } from "../hooks/useSpinnerLoader";
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
    const { SpinnerLoader, isSpinnerLoading, setIsSpinnerLoading } =
        useSpinnerLoader();
    const { setNotification, setIsNotificationShowing } =
        useContext(NotificationContext);
    const { updateProject } = useContext(ProjectsContext);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (newProject.name.length <= 6) return;
        if (
            newProject.name === project.name &&
            newProject.description === project.description
        )
            return;
        setIsSpinnerLoading(true);
        try {
            toggleOptions();
            const data = await UpdateProjectService(project.id!, newProject);

            setIsNotificationShowing(true);
            setNotification({ message: "Project updated!", success: true });

            const updatedProject: Project = data.data;
            updateProject(updatedProject);
            setIsSpinnerLoading(false);
            closeModal();
        } catch (e) {
            setIsSpinnerLoading(false);
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
            {isSpinnerLoading && <SpinnerLoader />}
        </CustomModal>
    );
};

export default EditProject;
