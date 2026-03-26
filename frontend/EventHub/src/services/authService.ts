import { type RegisterFormData  } from "../schemas/registerSchema";
import { api } from "../lib/axios";

export const createUser = async (userData: RegisterFormData) => {
    const { name, username, email, password } = userData;
    return await api.post("/access/register", {
        fullName: name,
        username: username,
        email: email,
        password: password
    });
}