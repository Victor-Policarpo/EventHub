import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../../schemas/registerSchema";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import { createUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { type SpringError } from "../../services/springError";

function CreateUser(){
    const navigate = useNavigate();
    const {register, handleSubmit, control, setError, formState: { errors }} = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur"
    });
    const onSubmit = async (data: RegisterFormData) => {
        if (data.password === data.confirmPassword) {
            try {
                await createUser(data);
                navigate("/login");
            } catch (error: unknown) {
            if (axios.isAxiosError<SpringError>(error)) {
                const msg = (error.response?.data?.message || "").toLowerCase();
                if (msg.includes("username")) {
                    setError("username", { 
                        type: "manual", 
                        message: "Este nome de usuário já está em uso" 
                    });
                } else if (msg.includes("email")) {
                    setError("email", { 
                        type: "manual", 
                        message: "Este e-mail já está cadastrado" 
                    });
                }
        } else {
            console.error("Erro inesperado:", error);
        }
            } 
        }
    };

    const passwordValue = useWatch({
        control,
        name: "password",
        defaultValue: ""
    });
    const { hasMinMax, hasLetter, hasNumber, hasSpecial } = usePasswordValidation(passwordValue);

    return (
        <main className="h-full w-full flex items-center mt-12 flex-col">
            <h1 className="text-3xl font-bold">Register Page</h1>
            
            <div className="w-125">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="w-full mt-4 p-2 border border-gray-300 rounded" placeholder="Name.." id="name" {...register("name")} />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    <label htmlFor="username">Username:</label>
                    <input type="text" className={`w-full mt-4 p-2 border rounded transition-all duration-300 outline-none ${ errors.username ? "border-red-400 ring-1 ring-red-400" : "border-gray-300 focus:border-blue-500"}`} placeholder="Username.." id="username" {...register("username")} />
                    {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                    <label htmlFor="email">E-mail:</label>
                    <input type="text" className={`w-full mt-4 p-2 border rounded transition-all duration-300 outline-none ${ errors.email ? "border-red-400 ring-1 ring-red-400" : "border-gray-300 focus:border-blue-500"}`} placeholder="E-mail.." id="email" {...register("email")} />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    <label htmlFor="password">Password:</label>
                    <input type="password" className={`w-full mt-4 p-2 border rounded transition-all duration-300 outline-none ${ errors.password? "border-red-400 ring-1 ring-red-400" : "border-gray-300 focus:border-blue-500" }`} placeholder="Password.." id="password" {...register("password")} />
                    <div className="mt-2 space-y-1 text-sm">
                        <p className={hasMinMax ? "text-green-500" : "text-gray-500"}>
                            {hasMinMax ? "✓" : "○"} Entre 6 e 16 caracteres
                        </p>
                        <p className={hasLetter ? "text-green-500" : "text-gray-500"}>
                            {hasLetter ? "✓" : "○"} Pelo menos uma letra
                        </p>
                        <p className={hasNumber ? "text-green-500" : "text-gray-500"}>
                            {hasNumber ? "✓" : "○"} Pelo menos um número
                        </p>
                        <p className={hasSpecial ? "text-green-500" : "text-gray-500"}>
                            {hasSpecial ? "✓" : "○"} Um caractere especial (!@#$)
                        </p>
                    </div>
                    <label htmlFor="confirmPassword">Confirme a senha:</label>
                    <input type="password" className={`w-full mt-4 p-2 border rounded transition-all duration-300 outline-none ${ errors.confirmPassword? "border-red-400 ring-1 ring-red-400" : "border-gray-300 focus:border-blue-500" }`} placeholder="Confirme a senha.." id="confirmPassword" {...register("confirmPassword")} />
                    {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                    <button type="submit" className="w-full mt-4 p-2 bg-blue-500 text-white rounded">Enviar</button>
                </form>
            </div>

        </main>
    )
}
export default CreateUser;