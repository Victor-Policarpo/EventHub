import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../../schemas/loginSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../../services/authService";
import axios from "axios";
import type { SpringError } from "../../services/springError";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function LoginUser(){
    const navigate = useNavigate();
    const {register, handleSubmit , setError , formState: { errors }} = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur"
    });

    const { login } = useAuth();

    const onSubmit = async (data: LoginFormData) => {  
        try {
            const response = await loginUser(data);
            login(response.data);
            navigate("/feed");
        } catch (error) {
    if (axios.isAxiosError<SpringError>(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 400) {
            setError("username", { message: "Credenciais inválidas ou dados incorretos" });
            setError("password", { message: "Credenciais inválidas ou dados incorretos" });
        }
    }
}
    };
    
    return (
        <main className="h-full w-full flex items-center mt-12 flex-col">
            <h1 className="text-3xl font-bold">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm mt-6">
                  <label htmlFor="username">Username:</label>
                  <input type="text" className="w-full mt-4 p-2 border border-gray-300 rounded" placeholder="Username.." id="username" {...register("username")} />
                  {errors.username && <span className="text-red-500">{errors.username.message}</span>}

                  <input type="password" className={`w-full mt-4 p-2 border rounded transition-all duration-300 outline-none ${ errors.password? "border-red-400  ring-1 ring-red-400" : "border-gray-300 focus:border-blue-500" }`} placeholder="Password.." id="password" {...register("password")} />
                  {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                  <button type="submit" className="w-full mt-4 p-2 bg-blue-500 text-white rounded">Enviar</button>
            </form>
            <p className="mt-4">Não tem uma conta? <a href="/register" className="text-blue-500 hover:underline">Registre-se</a></p>
        </main>

    );
}
export default LoginUser;