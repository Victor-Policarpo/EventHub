import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { usePasswordValidation } from "../../hooks";
import { type RegisterFormData, registerSchema } from "../../schemas";
import { createUser } from "../../services";
import type { SpringError } from "../../types";
import { Button, Input } from "../Ui";

export function CreateUser() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register, handleSubmit, control, setError, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur"
    });
    
    const onSubmit = async (data: RegisterFormData) => {
        setIsSubmitting(true);

        try {
            await createUser(data);
            navigate("/login", { replace: true });
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
        } finally {
            setIsSubmitting(false);
        }
    };

    const passwordValue = useWatch({
        control,
        name: "password",
        defaultValue: ""
    });
    const { hasMinMax, hasLetter, hasNumber, hasSpecial } = usePasswordValidation(passwordValue); 

    return (
        <main className="min-h-screen w-full flex flex-col items-center bg-white md:bg-slate-50 pt-8 pb-12 md:pt-16">
            <div className="w-full px-6 md:max-w-2xl md:bg-white md:border md:border-slate-200 md:shadow-sm md:rounded-2xl md:p-10">
                
                <div className="flex flex-col text-center mb-8 md:mb-10">
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Criar conta</h1>
                    <p className="text-base text-slate-500 mt-2">
                        Preencha os dados abaixo para se cadastrar no EventHub.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    
                    <div className="md:col-span-2">
                        <Input
                            label="Nome Completo"
                            type="text"
                            placeholder="Ex: João da Silva"
                            error={errors.fullName?.message}
                            {...register("fullName")}
                        />
                    </div>

                    <div>
                        <Input
                            label="Nome de Usuário"
                            type="text"
                            placeholder="Ex: joaosilva"
                            error={errors.username?.message}
                            {...register("username")}
                        />
                    </div>

                    <div>
                        <Input
                            label="E-mail"
                            type="email"
                            placeholder="joao@exemplo.com"
                            error={errors.email?.message}
                            {...register("email")}
                        />
                    </div>

                    <div>
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Crie uma senha forte"
                            error={errors.password?.message}
                            {...register("password")}
                        />
                    </div>

                    <div>
                        <Input
                            label="Confirmar Senha"
                            type="password"
                            placeholder="Digite a senha novamente"
                            error={errors.confirmPassword?.message}
                            {...register("confirmPassword")}
                        />
                    </div>

                    <div className="md:col-span-2 mb-4">
                        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                <p className={`text-sm font-medium flex items-center gap-2 transition-colors ${hasMinMax ? "text-green-600" : "text-slate-500"}`}>
                                    <span>{hasMinMax ? "✓" : "○"}</span> Entre 8 e 16 caracteres
                                </p>
                                <p className={`text-sm font-medium flex items-center gap-2 transition-colors ${hasLetter ? "text-green-600" : "text-slate-500"}`}>
                                    <span>{hasLetter ? "✓" : "○"}</span> Pelo menos uma letra
                                </p>
                                <p className={`text-sm font-medium flex items-center gap-2 transition-colors ${hasNumber ? "text-green-600" : "text-slate-500"}`}>
                                    <span>{hasNumber ? "✓" : "○"}</span> Pelo menos um número
                                </p>
                                <p className={`text-sm font-medium flex items-center gap-2 transition-colors ${hasSpecial ? "text-green-600" : "text-slate-500"}`}>
                                    <span>{hasSpecial ? "✓" : "○"}</span> Um caractere especial (!@#$)
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 mt-2">
                        <Button
                            type="submit"
                            isLoading={isSubmitting}
                            disabled={isSubmitting}
                            variant="primary"
                            className="w-full min-h-12 text-base"
                        >
                            Criar Conta
                        </Button>
                    </div>
                </form>

                <div className="mt-8 flex justify-center text-base text-slate-600 md:text-sm">
                    <p>
                        Já possui uma conta?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors focus-visible:outline-blue-600">
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}