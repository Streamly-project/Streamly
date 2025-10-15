export type User = {
    id: number;
    name: string;
    role: UserRole;
    status: "active" | "inactive" | "pending";
    createdAt: string;
}

export enum UserRole {
    USER = "User",
    MODERATOR = "Moderator",
    ADMIN = "Administrator",
}