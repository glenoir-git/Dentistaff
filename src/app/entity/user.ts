export interface Role {
    id: number;
    name: string;
}

export interface Status {
    id: number;
    name: string;
}

export enum Provider {
    EMAIL = "email",
    GOOGLE = "google",
    FACEBOOK = "facebook",
}

export interface Photo {
    id: string;
    path: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface User {
    id: number;
    email: string;
    provider: Provider;
    socialId: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    role: Role;
    status: Status;
    photo: Photo;
}