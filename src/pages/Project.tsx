import { Task } from "../components/Task";
import { TaskInterface } from "../types/task";

import { GoPlus } from "react-icons/go";
import SpinnerLoader from "../components/SpinnerLoader";
import { CreateNewTask } from "../components/CreateNewTask";
import PageHeader from "../components/PageHeader";
import { useTasks } from "../hooks/useTasks";
import { useModal } from "../hooks/useModal";
import Card from "../components/UI/Card";

export default function Project() {
    const { filteredTasks, searchTask, setSearchTask, isLoading, totalTasks } =
        useTasks();

    const { isModalOpen, openModal, closeModal } = useModal();

    return (
        <>
            <PageHeader
                searchText={searchTask}
                setSearchText={setSearchTask}
                showSearcher={true}
            />
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
                    {isLoading && <SpinnerLoader className="rounded-xl" />}
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
                                  <Card
                                      key={idx}
                                      className="min-h-[80px] h-full skeleton rounded-xl"
                                  ></Card>
                              ))}
                </div>
                <CreateNewTask
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                />
            </main>
        </>
    );
}
