import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../../schemas/registerSchema";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";
import { createUser } from "../../services/authService";
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
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img 
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" 
          alt="Your Company" 
          className="mx-auto h-10 w-auto" 
        />
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">Name</label>
            <div className="mt-2">
              <input
                id="name"
                type="text"
                {...register("name")}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                  errors.name ? "outline-red-500" : "outline-white/10 focus:outline-indigo-500"
                }`}
                placeholder="Your full name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-200">Username</label>
            <div className="mt-2">
              <input
                id="username"
                type="text"
                {...register("username")}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                  errors.username ? "outline-red-500 ring-1 ring-red-500" : "outline-white/10 focus:outline-indigo-500"
                }`}
                placeholder="username123"
              />
              {errors.username && <p className="mt-1 text-xs text-red-400">{errors.username.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email address</label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                  errors.email ? "outline-red-500 ring-1 ring-red-500" : "outline-white/10 focus:outline-indigo-500"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="password" id="password-label" className="block text-sm font-medium text-gray-200">Password</label>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                {...register("password")}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                  errors.password ? "outline-red-500 ring-1 ring-red-500" : "outline-white/10 focus:outline-indigo-500"
                }`}
              />
            </div>
            {/* Checklist de Validação */}
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
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200">Confirm Password</label>
            <div className="mt-2">
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={`block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
                  errors.confirmPassword ? "outline-red-500 ring-1 ring-red-500" : "outline-white/10 focus:outline-indigo-500"
                }`}
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-colors"
            >
              Register
            </button>
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
export default CreateUser;