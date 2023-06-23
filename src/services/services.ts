import Cookies from "js-cookie";
import { Project, TaskInterface } from "../types/types";

const url = "https://todo-backend-mf0a.onrender.com/api";

export const getProjects = async () => {
    const token = Cookies.get("user");

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

export const updateProject = async (projectId: string, data: Project) => {
    const token = Cookies.get("user");

    const res = await fetch(`${url}/project/${projectId}`, {
        method: "PUT",
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

export const createProject = async (data: Project) => {
    const token = Cookies.get("user");

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

export const deleteProject = async (id: string) => {
    const token = Cookies.get("user");

    const res = await fetch(`${url}/project/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error("API ERROR");
    }
    return res.json();
};

export const getProjectById = async (id: string) => {
    const token = Cookies.get("user");

    const res = await fetch(`${url}/project/${id}`, {
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

//TASKS

export const updateTask = async (taskId: string, data: TaskInterface) => {
    const token = Cookies.get("user");

    const res = await fetch(`${url}/task/${taskId}`, {
        method: "PUT",
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

export const createTask = async (projectId: string, newTask: TaskInterface) => {
    const token = Cookies.get("user");

    const res = await fetch(`${url}/task`, {
        method: "POST",
        body: JSON.stringify({ projectId, ...newTask }),
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

export const deleteTask = async (id: string) => {
    const token = Cookies.get("user");

    const res = await fetch(`${url}/task/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) {
        throw new Error("API ERROR");
    }
    return res.json();
};
