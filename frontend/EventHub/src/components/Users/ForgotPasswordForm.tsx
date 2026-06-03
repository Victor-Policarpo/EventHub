import { useForm } from "react-hook-form";
import { Button, Input } from "../Ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordData } from "../../schemas";
import { useForgotPassword } from "../../hooks";
import toast from "react-hot-toast";

export function ForgotPasswordForm() {
    const { register, handleSubmit , formState: { errors } } = useForm<ForgotPasswordData>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: "onBlur"
    });
    const { mutate, isPending } = useForgotPassword();
 
    const onSubmit = (data: ForgotPasswordData) => {
        mutate(data, {
            onSuccess: () => {
                toast.success("E-mail de recuperação enviado com sucesso!");
            },
            onError: () => {
                toast.error("Ocorreu um erro ao processar a solicitação.");
            }
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">
            <Input 
                type="email"
                label="E-mail"
                placeholder="Ex: joao@exemplo.com"
                error={errors.email?.message}
                {...register("email")}
            />
            
            <Button 
                type="submit"
                variant="primary"
                disabled={isPending}
                isLoading={isPending}
                className="w-full mt-2 min-h-12 text-base"
            >
                Enviar E-mail de Recuperação
            </Button>
        </form>
    );
}