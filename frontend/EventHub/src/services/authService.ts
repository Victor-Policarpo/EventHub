import { type RegisterFormData  } from "../schemas/registerSchema";
import { api } from "../lib/axios";
import type { LoginFormData } from "../schemas/loginSchemas";
import type { LoginResponse } from "../types/types";

export const createUser = async (userData: RegisterFormData) => {
    const { name, username, email, password } = userData;
    return await api.post("/access/register", {
        fullName: name,
        username: username,
        email: email,
        password: password
    });
}

export const loginUser = async (data: LoginFormData) => {
    const { username, password } = data;
    return await api.post<LoginResponse>("/access/login", {
        username, password 
    });
}


