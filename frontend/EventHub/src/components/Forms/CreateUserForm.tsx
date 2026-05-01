import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePasswordValidation } from "../../hooks";
import { type RegisterFormData, registerSchema } from "../../schemas";
import { createUser } from "../../services";
import type { SpringError } from "../../types";
import { Button, Input } from "../Ui";


export function CreateUser(){
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {register, handleSubmit, control, setError, formState: { errors }} = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onBlur"
    });
    const onSubmit = async (data: RegisterFormData) => {
        setIsSubmitting(true);

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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Insira seu nome completo"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>

          <div>
          <Input
            label="Nome de Usuário"
            type="text"
            placeholder="Insira seu nome de usuário"
            error={errors.username?.message}
            {...register("username")}
          />
          </div>

          <div>
            <Input
              label="E-mail"
              type="email"
              placeholder="Insira seu E-mail"
              error={errors.email?.message}
              {...register("email")}
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
            <div className="mt-3 space-y-1 text-xs">
              <p className={hasMinMax ? "text-green-400" : "text-gray-500"}>
                {hasMinMax ? "✓" : "○"} Entre 6 e 16 caracteres
              </p>
              <p className={hasLetter ? "text-green-400" : "text-gray-500"}>
                {hasLetter ? "✓" : "○"} Pelo menos uma letra
              </p>
              <p className={hasNumber ? "text-green-400" : "text-gray-500"}>
                {hasNumber ? "✓" : "○"} Pelo menos um número
              </p>
              <p className={hasSpecial ? "text-green-400" : "text-gray-500"}>
                {hasSpecial ? "✓" : "○"} Um caractere especial (!@#$)
              </p>
            </div>
          </div>
          <div>
            <Input
              label="Confirme Senha"
              type="password"
              placeholder="Confirme sua senha"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />
          </div>

          <div>
            <Button
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
            variant="primary"
            >
              Criar Conta
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300">
            Sign in here
          </a>
        </p>
      </div>
    </div>
    )
}