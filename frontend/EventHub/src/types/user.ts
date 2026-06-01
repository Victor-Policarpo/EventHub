export interface UserDataResponse {
    userId: string;
    fullName: string;
    username: string;
    email: string;
    roles: string[];
    active: boolean;
}

export interface UserUpdateData {
    fullName?: string;
    username?: string;
    email?: string;
}

export interface PasswordUpdateData {
    oldPassword: string;
    newPassword: string;
}

export interface ResetPassword {
  token: string;
  newPassword: string;
}

export interface ListUsers {
    users: UserDataResponse[];
}