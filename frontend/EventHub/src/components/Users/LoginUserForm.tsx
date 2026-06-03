import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";
import { type LoginFormData, loginSchema } from "../../schemas";
import { loginUser } from "../../services";
import type { SpringError } from "../../types";
import { Button, Input } from "../Ui";

export function LoginUser() {
    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginFormData>({
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
        <main className="min-h-screen w-full flex flex-col md:items-center md:justify-center bg-white md:bg-slate-50">
            
            <div className="w-full flex-1 flex flex-col justify-center px-6 py-8 md:flex-none md:max-w-md md:bg-white md:border md:border-slate-200 md:shadow-sm md:rounded-2xl md:p-10">
                
                <div className="flex flex-col items-center text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Login</h1>
                    <p className="text-base text-slate-500 mt-2">
                        Bem-vindo. Insira suas credenciais.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">
                    <Input
                        label="Nome de usuário"
                        type="text"
                        placeholder="Ex: admin"
                        error={errors.username?.message}
                        {...register("username")}
                    />

                    <Input
                        label="Senha"
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    <Button
                        type="submit"
                        isLoading={false}
                        variant="primary"
                        className="w-full mt-2 min-h-12 text-base"
                    >
                        Entrar
                    </Button>
                </form>

                <div className="mt-8 flex flex-col items-center gap-3 text-sm">
                    <Link
                        to="/forgot-password"
                        className="font-medium text-slate-600 hover:text-blue-700 hover:underline transition-colors focus-visible:outline-blue-600"
                    >
                        Esqueceu a senha?
                    </Link>

                    <Link
                        to="/register"
                        className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors focus-visible:outline-blue-600"
                    >
                        Criar nova conta
                    </Link>
                </div>

            </div>
        </main>
    );
}