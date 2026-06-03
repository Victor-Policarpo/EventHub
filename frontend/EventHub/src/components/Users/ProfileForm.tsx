import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCurrentUser, useUpdateUser } from "../../hooks";
import { type ProfileFormData, profileSchema } from "../../schemas";
import type { UserUpdateData } from "../../types";
import { Loading, ErrorState, Input, Button } from "../Ui";

export function ProfileForm() {
    const { data, isLoading, isError } = useCurrentUser();
    
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
        values: {
            fullName: data?.fullName || "",
            username: data?.username || "",
            email: data?.email || "",
        },
        resolver: zodResolver(profileSchema),
        mode: "onBlur"
    });
    
    const { mutate, isPending } = useUpdateUser();
    
    const onSubmit = (formData: UserUpdateData) => {
        mutate(formData, {
            onSuccess: () => {
                toast.success("Perfil atualizado com sucesso!");
            },
            onError: (error) => {
                toast.error("Erro ao atualizar: " + error.message);
            }
        });
    };
    
    if (isLoading) return <Loading />;
    if (isError) return <ErrorState message="Erro ao carregar os dados do perfil." />;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
            
            <Input
                label="Nome completo"
                type="text"
                placeholder="Insira seu nome completo"
                error={errors.fullName?.message}
                {...register("fullName")}
            />

            <Input
                label="Nome de usuário"
                type="text"
                placeholder="Insira seu nome de usuário"
                error={errors.username?.message}
                {...register("username")}
            />
            
            <Input
                label="E-mail"
                type="email"
                placeholder="Insira seu e-mail"
                error={errors.email?.message}
                {...register("email")}
            />
            
            <div className="pt-4">
                <Button
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                    variant="primary"
                    className="w-full sm:w-auto px-8 min-h-12"
                >
                    Salvar Alterações
                </Button>
            </div>
            
        </form>
    );
}