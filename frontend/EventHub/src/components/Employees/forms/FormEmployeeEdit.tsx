import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type Resolver } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { UserCog } from "lucide-react";
import { useGetEmployee, useUpdateEmployee } from "../../../hooks";
import { type UpdateEmployeeForm, updateEmployeeSchema } from "../../../schemas";
import { Loading, ErrorState, Input, Button } from "../../Ui";
import { PatternFormat } from "react-number-format";

type FormEmployeeEditProps = {
    employeeId: number;
}

export function FormEmployeeEdit({ employeeId }: FormEmployeeEditProps) {
    const navigate = useNavigate();
    const { data, isLoading, isError, refetch } = useGetEmployee(employeeId);
    const { mutate, isPending } = useUpdateEmployee();

    const { register, handleSubmit, control, formState: { errors }} = useForm<UpdateEmployeeForm>({
        resolver: zodResolver(updateEmployeeSchema) as Resolver<UpdateEmployeeForm>,
        values: {
            name: data?.name || "",
            telephone: data?.telephone || "",
        },
        mode: "onBlur"
    });

    if (isLoading) return (
        <div className="py-12 flex justify-center"><Loading /></div>
    );
    if (isError || (data && !data.isActive)) return <Navigate to="/employees" replace />;
    if (!data) return <ErrorState message="Funcionário não encontrado." onRetry={() => refetch()} />;

    const onSubmit = (values: UpdateEmployeeForm) => {
        mutate({ id: employeeId, data: values }, {
            onSuccess: () => {
                toast.success("Funcionário atualizado com sucesso!");
                navigate("/employees", { replace: true });
            },
            onError: (error) => {
                toast.error(`Erro ao atualizar: ${error.message}`);
            }
        });
    };

    return (
        <div className="flex flex-col gap-6">
            
            <div className="pb-4 border-b border-slate-100 flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <UserCog size={20} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
                        Editar Funcionário
                    </h2>
                    <p className="text-sm text-slate-500">
                        Atualize os dados de contato do membro da equipe.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                
                <Input
                    label="Nome Completo"
                    placeholder="Insira o nome do funcionário"
                    error={errors.name?.message}
                    {...register("name")}
                />
                
                <Controller
                    control={control}
                    name="telephone"
                    render={({ field: { onChange, value, ref } }) => (
                        <PatternFormat
                            customInput={Input} 
                            label="Telefone / WhatsApp"
                            format="(##) #####-####"
                            mask="_"
                            value={value}
                            getInputRef={ref}
                            onValueChange={(vals) => onChange(vals.formattedValue)}
                            error={errors.telephone?.message}
                            placeholder="(00) 00000-0000"
                        />
                    )}
                />
                
                <div className="pt-4 flex justify-end">
                    <Button
                        type="submit"
                        isLoading={isPending}
                        disabled={isPending}
                        variant="primary"
                        className="w-full sm:w-auto px-8 min-h-12"
                    >
                        Atualizar Funcionário   
                    </Button>
                </div>
                
            </form> 
        </div>
    );
}