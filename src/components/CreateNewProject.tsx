import Modal from "react-modal";
import Card from "./UI/Card";
import { FaPlusCircle } from "react-icons/fa";
import { useContext, useState } from "react";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { Project } from "../types/types";
import { createProject } from "../services/services";
import { ProjectsContext } from "./ProjectsContainer";
Modal.setAppElement("#modal");

const CreateNewProject = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProject, setNewProject] = useState<Project>({
        name: "",
        description: "",
    });

    const projectsContext = useContext(ProjectsContext);
    if (!projectsContext) {
        throw new Error("No Projects context found");
    }
    console.log("NEWPROJECT", newProject);
    const { setProjects } = projectsContext;

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <Card className="h-full">
            <p className="mb-6 text-center">Create new Project</p>
            <FaPlusCircle
                onClick={openModal}
                size={36}
                className="text-center mx-auto cursor-pointer"
            />
            <Modal
                shouldCloseOnOverlayClick
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                className="z-50 w-2/3 md:w-[400px] bg-background rounded-xl p-8"
                overlayClassName={
                    "bg-[rgba(0,0,0,.7)] top-0 absolute z-50 flex w-screen h-screen items-center justify-center"
                }
            >
                <form
                    action=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (newProject.name.length <= 8) return;
                        createProject(newProject).then((data) => {
                            setProjects((prev) => [...prev, data.data]);
                            closeModal();
                        });
                    }}
                >
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
            </Modal>
        </Card>
    );
};

export default CreateNewProject;
