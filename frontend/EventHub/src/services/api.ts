import Axios from "axios";
import { type RegisterFormData  } from "../schemas/registerSchema";
const axiosInstance = Axios.create({
    baseURL: "http://localhost:8080"
})
export const createUser = async (userData: RegisterFormData) => {
    const { name, username, email, password } = userData;
    await axiosInstance.post("/users", {
        fullName: name,
        username: username,
        email: email,
        password: password
    });
}