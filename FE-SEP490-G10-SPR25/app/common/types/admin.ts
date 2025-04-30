export interface AdminDTO {
    name?: string;
    userName: string;
    email: string;
    password?: string;
    Password?: string;
    phone: string;
    gender: string;
    dob: string;
    address: string;
    role?: string;
    citizenId: number | string; // Allow both number and string types for flexibility
    avatarUrl?: string;
}

export interface Role {
    roleId: number;
    roleName: string;
}