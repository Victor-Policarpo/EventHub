import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { type LoginFormData, loginSchema } from "../../schemas";
import { loginUser } from "../../services";
import type { SpringError } from "../../types";
import { Button, Input } from "../Ui";

export function LoginUser(){
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
            navigate("/parties");
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
                <div>
                    <Input
                        label="Nome de usuario"
                        type="text"
                        placeholder="Insira seu nome de usuario"
                        error={errors.username?.message}
                        {...register("username")}
                    />
                </div>

                <div>
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Insira sua senha"
                        error={errors.password?.message}
                        {...register("password")}
                    />
                </div>

                <Button
                type="submit"
                isLoading={false}
                variant="primary"
                >
                    Entrar
                </Button>

            </form>
            <p className="mt-4">Esqueceu a Senha? <a href="/forgot-password" className="text-blue-500 hover:underline">Esqueceu a Senha</a></p>
            <p className="mt-4">Não tem uma conta? <a href="/register" className="text-blue-500 hover:underline">Registre-se</a></p>
        </main>

    );
}