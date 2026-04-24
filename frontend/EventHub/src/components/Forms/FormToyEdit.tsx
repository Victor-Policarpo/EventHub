import { useParams } from "react-router-dom";
import { useGetToy } from "../../hooks/useGetToy";
import Loading from "../Ui/Loading";
import ErrorState from "../Ui/ErrorState";
import { useForm, type Resolver } from "react-hook-form";
import { updateToySchema, type UpdateToyForm } from "../../schemas/updateToySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateToy } from "../../hooks/useUpdateToy";
import toast from "react-hot-toast";

export default function FormToyEdit() {
    const { toyId } = useParams();
    const id = toyId ? Number(toyId) : NaN;
    
    const { data, isLoading, isError, refetch } = useGetToy(id);
    const { mutate, isPending } = useUpdateToy();

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateToyForm>({
        resolver: zodResolver(updateToySchema) as Resolver<UpdateToyForm>,
        values: {
            name: data?.name || "",
            availableQuantity: data?.availableQuantity || 0,
            valueForFourHours: data?.valueForFourHours || 0,
        },
        mode: "onBlur"
    });

    if (isLoading) return <Loading />;
    if (isError) return <ErrorState message="Erro ao carregar brinquedo 😢" onRetry={() => refetch()} />;
    if (!data) return <ErrorState message="Brinquedo não encontrado" onRetry={() => refetch()} />;

    const onSubmit = (values: UpdateToyForm) => {
        mutate({ id, data: values }, {
            onSuccess: () => {
                toast.success("Brinquedo atualizado com sucesso!");
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
                    <label className="font-bold text-sm text-gray-600" htmlFor="name">Brinquedo</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name")}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                <div>
                    <label className="font-bold text-sm text-gray-600" htmlFor="availableQuantity">Quantidade Disponível</label>
                    <input
                        type="number"
                        id="availableQuantity"
                        {...register("availableQuantity")}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    {errors.availableQuantity && <p className="text-red-500 text-xs">{errors.availableQuantity.message}</p>}
                </div>

                <div>
                    <label className="font-bold text-sm text-gray-600" htmlFor="valueForFourHours">Valor para 4 horas</label>
                    <input
                        type="number"
                        id="valueForFourHours"
                        {...register("valueForFourHours")}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                    {errors.valueForFourHours && <p className="text-red-500 text-xs">{errors.valueForFourHours.message}</p>}
                </div>

                <button 
                    type="submit" 
                    disabled={isPending}
                    className="w-full text-white bg-indigo-600 hover:bg-indigo-700 font-bold rounded-xl text-sm px-5 py-3 transition-all disabled:opacity-50"
                >
                    {isPending ? "Processando..." : "Atualizar Brinquedo"}
                </button>
            </form>
        </div>
    );
}