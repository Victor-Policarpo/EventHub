import { useParams } from "react-router-dom";
import { useGetEmployee } from "../../hooks/useGetEmployee";
import Loading from "../Ui/Loading";
import ErrorState from "../Ui/ErrorState";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";
import { useForm, type Resolver } from "react-hook-form";
import { updateEmployeeSchema, type UpdateEmployeeForm } from "../../schemas/updateEmployeeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export default function FormEmployeeEdit() {
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
                    <label className="font-bold text-sm text-gray-600" htmlFor="name">Nome do Funcionario</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name")}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>
                <div>
                    <label className="font-bold text-sm text-gray-600" htmlFor="telephone">Telefone</label>
                    <input
                        type="text"
                        id="telephone"
                        {...register("telephone")}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    {errors.telephone && <p className="text-red-500 text-xs">{errors.telephone.message}</p>}
                </div>
                <button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-bold rounded-xl text-sm px-5 py-3 transition-all disabled:opacity-50"
                >
                    {isPending ? "Processando..." : "Atualizar Funcionário"}
                </button>
            </form> 
        </div>
    );
}