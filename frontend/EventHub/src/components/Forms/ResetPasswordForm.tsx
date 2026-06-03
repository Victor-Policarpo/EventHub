import { useForm, useWatch } from "react-hook-form";
import { Button, Input } from "../Ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordData } from "../../schemas";
import { usePasswordValidation, useResetPassword } from "../../hooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function ResetPasswordForm(){
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
                toast.success("Senha resetada com sucesso!");
                navigate("/login", { replace: true });
            }, 
            onError: () => {
                toast.error("Ocorreu um erro ao resetar a senha.");
            }
    });
};

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input 
                    type="password"
                    label="Nova Senha"
                    placeholder="Digite sua nova senha"
                    error={errors.password?.message}
                    {...register("password")}
                />
                <div className="mt-3 space-y-1 text-xs">
                    <p className={hasMinMax ? "text-green-400" : "text-gray-500"}>
                        {hasMinMax ? "✓" : "○"} Entre 8 e 16 caracteres
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

                <Input 
                    type="password"
                    label="Confirme a Nova Senha"
                    placeholder="Confirme sua nova senha"
                    error={errors.confirmPassword?.message}
                    {...register("confirmPassword")}
                />

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isPending}
                    isLoading={isPending}
                >
                    Resetar Senha
                </Button>
            </form>
        </div>
    );
}