import { api } from "../../lib/axios";
import type { ForgotPasswordData, LoginFormData, RegisterFormData } from "../../schemas";
import type { LoginResponse, ResetPassword } from "../../types";

export const createUser = async (userData: RegisterFormData) => {
    return await api.post("/access/register", userData);
}

export const loginUser = async (data: LoginFormData) => {
    return await api.post<LoginResponse>("/access/login", data);
}


export const forgotPasswordRequest = async (data: ForgotPasswordData) => {
    return await api.post("/access/forgot-password", data)
}

export const resetPasswordRequest = async (data: ResetPassword) => {
    return await api.post("/access/reset-password", data)
}