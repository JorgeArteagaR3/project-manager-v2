import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProjectById } from "../services/services";

import { Task } from "../components/Task";
import { TaskInterface } from "../types/types";
import { GoPlus } from "react-icons/go";
import SpinnerLoader from "../components/SpinnerLoader";
import { CreateNewTask } from "../components/CreateNewTask";
import { TasksContext, initialValue } from "../context/TasksContext";
import PageHeader from "../components/PageHeader";

export default function Project() {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [tasks, setTasks] = useState(initialValue.tasks);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        getTasks();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getTasks = async () => {
        setIsLoading(true);
        const data = await getProjectById(id!);
        if (!data) {
            setIsLoading(false);
            return;
        }
        let sortedTasks: TaskInterface[] = data.data.tasks;
        sortedTasks.sort(
            (a, b) =>
                new Date(a.createdAt!).getTime() -
                new Date(b.createdAt!).getTime()
        );
        setTasks(sortedTasks);
        setIsLoading(false);
    };

    const totalTasks = tasks.length;

    const filteredTasks = tasks.filter((task) => {
        const taskTitle = task.title?.toLowerCase();
        return taskTitle?.includes(searchText.toLowerCase());
    });

    return (
        <TasksContext.Provider value={{ tasks, setTasks }}>
            <PageHeader searchText={searchText} setSearchText={setSearchText} />
            <main className="w-full pb-28 lg:pb-12 px-6 md:px-12">
                <h2 className="page-title">Projects</h2>
                <div className="mx-auto border border-gray-700 flex items-center gap-3 px-3 py-4 rounded-xl mb-4 relative">
                    <div
                        className="bg-green-300 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
                        onClick={openModal}
                    >
                        <GoPlus className="lg:text-2xl text-background text-lg" />
                    </div>
                    <p>Add a task</p>
                    {isLoading && <SpinnerLoader className="rounded-full" />}
                </div>
                {<p className="font-bold mb-6">Tasks - {totalTasks}</p>}
                <div className="flex flex-col gap-4 relative">
                    {!isLoading
                        ? filteredTasks.map((task: TaskInterface) => (
                              <Task key={task.id} task={task} />
                          ))
                        : new Array(6)
                              .fill(1)
                              .map((_, idx) => (
                                  <div
                                      key={idx}
                                      className="min-h-[80px] h-full skeleton rounded-xl"
                                  ></div>
                              ))}
                </div>
                <CreateNewTask
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                />
            </main>
        </TasksContext.Provider>
    );
}
