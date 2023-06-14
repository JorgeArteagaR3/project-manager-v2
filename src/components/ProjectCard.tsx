import Card from "./UI/Card";
import { RxDotsVertical } from "react-icons/rx";
import { Project } from "../types/types";

export default function ProjectCard({ id, name, description }: Project) {
    return (
        <Card className="relative overflow-hidden" id={id}>
            <div className="flex justify-between items-center mb-2">
                <div className="bg-amber-400 text-white rounded-full px-2">
                    On Going
                </div>
                <div>
                    <RxDotsVertical />
                </div>
            </div>
            <div className="border-b border-gray-600 pb-6">
                <h2 className="font-bold text-base mb-1">{name}</h2>
                <p className="text-xs">{description}</p>
            </div>
        </Card>
    );
}
