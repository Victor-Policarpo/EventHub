import { useForm, useWatch } from "react-hook-form";
import { Button, Input } from "../Ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordData } from "../../schemas";
import { usePasswordValidation, useResetPassword } from "../../hooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function ResetPasswordForm() {
    const { register, handleSubmit , formState: { errors }, control } = useForm<ResetPasswordData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: "onBlur"
    });

    const navigate = useNavigate();
    const token = new URLSearchParams(window.location.search).get("token");
    const { mutate, isPending } = useResetPassword();

    const passwordValue = useWatch({
        control,
        name: "password",
        defaultValue: ""
    });
    const { hasMinMax, hasLetter, hasNumber, hasSpecial } = usePasswordValidation(passwordValue);

    const onSubmit = (data: ResetPasswordData) => {
        if (!token) {
            toast.error("Token de recuperação não encontrado.");
            return;
        }

        const payload = {
            token: token,
            newPassword: data.password
        };

        mutate(payload, {
            onSuccess: () => {
                toast.success("Senha redefinida com sucesso!");
                navigate("/login", { replace: true });
            }, 
            onError: () => {
                toast.error("Ocorreu um erro ao redefinir a senha.");
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">
            
            <div className="flex flex-col">
                <Input 
                    type="password"
                    label="Nova Senha"
                    placeholder="Digite sua nova senha"
                    error={errors.password?.message}
                    {...register("password")}
                />
                
                <div className="mt-1 mb-2 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
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

            <Input 
                type="password"
                label="Confirmar Nova Senha"
                placeholder="Confirme sua nova senha"
                error={errors.confirmPassword?.message}
                {...register("confirmPassword")}
            />

            <Button
                type="submit"
                variant="primary"
                disabled={isPending}
                isLoading={isPending}
                className="w-full mt-4 min-h-12 text-base"
            >
                Redefinir Senha
            </Button>
        </form>
    );
}