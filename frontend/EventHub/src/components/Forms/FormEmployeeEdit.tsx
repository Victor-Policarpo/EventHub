import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useGetEmployee } from "../../hooks/useGetEmployee";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import { type UpdateEmployeeForm, updateEmployeeSchema } from "../../schemas/updateEmployeeSchema";
import { Loading, ErrorState, Input, Button } from "../Ui";

export function FormEmployeeEdit() {
    const { employeeId } = useParams();
    const id = employeeId ? Number(employeeId) : NaN;

    const { data, isLoading, isError, refetch } = useGetEmployee(id);
    const { mutate, isPending } = useUpdateEmployee();

    const { register, handleSubmit, formState: { errors }} = useForm<UpdateEmployeeForm>({
        resolver: zodResolver(updateEmployeeSchema) as Resolver<UpdateEmployeeForm>,
        values: {
            name: data?.name || "",
            telephone: data?.telephone || "",
        },
        mode: "onBlur"
    });

    if (isLoading) return <Loading />;
    if (isError) return <ErrorState message="Erro ao carregar Funcionário 😢" onRetry={() => refetch()} />;
    if (!data) return <ErrorState message="Funcionário não encontrado" onRetry={() => refetch()} />;

    const onSubmit = (values: UpdateEmployeeForm) => {
        mutate({ id, data: values }, {
            onSuccess: () => {
                toast.success("Funcionário atualizado com sucesso!");
            },
            onError: (error) => {
                toast.error(`Erro ao atualizar: ${error.message}`);
            }
        });
    };

    return (
        <div className="p-6 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 w-125">
                <div>
                    <Input
                        label="Nome do Funcionário"
                        placeholder="Insira o nome do funcionário"
                        error={errors.name?.message}
                        {...register("name")}
                    />
                </div>
                <div>
                    <Input
                        label="Telefone"
                        placeholder="Insira o telefone do funcionário"
                        error={errors.telephone?.message}
                        {...register("telephone")}
                    />
                </div>

                <Button
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                    variant="primary"
                >
                    Atualizar Funcionário   
                </Button>
            </form> 
        </div>
    );
}