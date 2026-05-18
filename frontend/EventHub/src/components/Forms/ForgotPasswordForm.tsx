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
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input 
                    type="email"
                    label="E-mail"
                    placeholder="Insira seu E-mail"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <Button 
                    type="submit"
                    variant="primary"
                    disabled={isPending}
                    isLoading={isPending}
                >
                    Enviar E-mail de Recuperação
                </Button>
            </form>
        </div>
    );
}