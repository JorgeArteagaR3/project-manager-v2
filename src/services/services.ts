import Cookies from "js-cookie";
import {
    NewEmail,
    NewPassword,
    Project,
    TaskInterface,
    User,
} from "../types/types";

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

//User

export const getUser = async (): Promise<{ data: User }> => {
    const token = Cookies.get("user");

    const res = await fetch(`${url}/user`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        throw new Error("Api Error");
    }
    return res.json();
};

export const updateUser = async (id: string, data: NewEmail | NewPassword) => {
    const token = Cookies.get("user");

    const res = await fetch(`${url}/user/${id}`, {
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

export const userLogin = async (data: {
    username: string;
    password: string;
}) => {
    const res = await fetch("https://todo-backend-mf0a.onrender.com/signin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res;
};

export const createUser = async (newuser: {
    username: string;
    email: string;
    password: string;
}) => {
    const registerurl = "https://todo-backend-mf0a.onrender.com/user";

    const res = await fetch(registerurl, {
        method: "POST",
        body: JSON.stringify(newuser),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return res;
};
