export interface Project {
    id?: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    belongsToId?: string;
}

export interface User {
    exp: number;
    iat: number;
    id: string;
    username: string;
}
