import CustomModal from "./UI/CustomModal";
import Card from "./UI/Card";
import { FaPlusCircle } from "react-icons/fa";
import { FormEventHandler, useContext, useState } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { Project } from "../types/project";
import { createProject } from "../services/services";
import SpinnerLoader from "./SpinnerLoader";
import { ProjectsContext } from "../context/ProjectsContext/ProjectsContext";
import { useModal } from "../hooks/useModal";
import { NotificationContext } from "../context/NotificationContext";

const CreateNewProject = () => {
    const { closeModal, isModalOpen, openModal } = useModal();
    const [newProject, setNewProject] = useState<Project>({
        name: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const { addProject } = useContext(ProjectsContext);
    const { setIsNotificationShowing, setNotification } =
        useContext(NotificationContext);

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleSubmitForm: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if (newProject.name.length <= 8) return;

        setIsLoading(true);
        const data = await createProject(newProject);

        setIsNotificationShowing(true);
        setNotification({ message: "Project created!", success: true });
        setNewProject({ name: "", description: "" });
        addProject(data.data);
        setIsLoading(false);
        closeModal();
    };

    return (
        <Card className="h-full flex flex-col items-center justify-center text-white min-h-[200px]">
            <p className="mb-6 text-center text-black font-bold text-x dark:text-white">
                Create new Project
            </p>
            <FaPlusCircle
                onClick={openModal}
                size={36}
                className="text-center mx-auto cursor-pointer hover:text-green-300 duration-300 hover:rotate-90"
            />
            <CustomModal isModalOpen={isModalOpen} closeModal={closeModal}>
                <form onSubmit={handleSubmitForm}>
                    <p className="text-xl font-bold text-center mb-6">
                        Create a new Project
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
        </Card>
    );
};

export default CreateNewProject;
