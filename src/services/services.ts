import Cookies from "js-cookie";
import { Project } from "../types/types";

const url = "https://todo-backend-mf0a.onrender.com/api";
const token = Cookies.get("user");

export const getProjects = async () => {
    const res = await fetch(`${url}/project`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("API ERROR");
    }

    return res.json();
};

export const createProject = async (data: Project) => {
    const res = await fetch(`${url}/project`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("API ERROR");
    }
    return res.json();
};
