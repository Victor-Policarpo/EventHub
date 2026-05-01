import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCurrentUser } from "../../hooks";
import { useUpdateUser } from "../../hooks";
import { type ProfileFormData, profileSchema } from "../../schemas";
import type { UserUpdateData } from "../../types";
import { Loading, ErrorState, Input, Button } from "../Ui";

export function ProfileForm() {
    const { data, isLoading, isError } = useCurrentUser();
    const {register, handleSubmit , formState: { errors }} = useForm<ProfileFormData>({
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
    if (isError) return <ErrorState message="Erro ao carregar dados do perfil 😢" />;

    return (
  <div className="w-full flex justify-start px-8 mt-12">
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
      
      <div className="relative z-0 w-full mb-6 group">
        <Input
          label="Nome completo"
          type="text"
          placeholder="Insira seu nome completo"
          error={errors.fullName?.message}
          {...register("fullName")}
        />
      </div>

      <div className="relative z-0 w-full mb-6 group">
        <Input
          label="Nome de usuário"
          type="text"
          placeholder="Insira seu nome de usuário"
          error={errors.username?.message}
          {...register("username")}
        />
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <Input
          label="Email"
          type="email"
          placeholder="Insira seu email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>
      <Button
        type="submit"
        isLoading={isPending}
        disabled={isPending}
        variant="primary"
      >
        Editar Dados da Conta
      </Button>
    </form>
  </div>
);
}