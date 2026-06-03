import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import { Package } from "lucide-react"; // Adicionado ícone para o cabeçalho
import { useGetToy, useUpdateToy } from "../../../hooks";
import { type UpdateToyInput, type UpdateToyOutput, updateToySchema } from "../../../schemas";
import { Loading, ErrorState, Input, Button } from "../../Ui";

export function FormToyEdit() {
    const { toyId } = useParams();
    const id = toyId ? Number(toyId) : NaN;
    const navigate = useNavigate();

    const { data, isLoading, isError, refetch } = useGetToy(id);
    const { mutate, isPending } = useUpdateToy();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm<UpdateToyInput, undefined, UpdateToyOutput>({
        resolver: zodResolver(updateToySchema),
        values: data ? {
            name: data.name,
            availableQuantity: String(data.availableQuantity),
            valueForFourHours: String(data.valueForFourHours),
        } : undefined
    });

    if (isLoading) return (
        <div className="py-12 flex justify-center"><Loading /></div>
    );
    if (isError) return <ErrorState message="Erro ao carregar dados do brinquedo." onRetry={() => refetch()} />;
    if (!data) return <ErrorState message="Brinquedo não encontrado." onRetry={() => refetch()} />;

    const onSubmit = (values: UpdateToyOutput) => {
        mutate({ id, data: values }, {
            onSuccess: () => {
                toast.success("Brinquedo atualizado com sucesso!");
                navigate("/toys", { replace: true });
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
                    <Package size={20} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-slate-900 tracking-tight">
                        Editar Brinquedo
                    </h2>
                    <p className="text-sm text-slate-500">
                        Atualize as informações de estoque e valores.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
                
                <Input
                    label="Nome do Brinquedo"
                    type="text"
                    error={errors.name?.message}
                    {...register("name")}
                />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <NumericFormat
                        customInput={Input}
                        label="Valor (Período de 4h)"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        fixedDecimalScale={true}
                        value={data?.valueForFourHours} 
                        error={errors.valueForFourHours?.message}
                        onValueChange={(values) => {
                            setValue("valueForFourHours", values.value); 
                        }}
                    />

                    <Input
                        label="Quantidade Disponível"
                        type="number"
                        error={errors.availableQuantity?.message}
                        {...register("availableQuantity")}
                    />
                </div>

                <div className="pt-4 flex justify-end">
                    <Button 
                        type="submit" 
                        isLoading={isPending} 
                        disabled={isPending}
                        variant="primary"
                        className="w-full sm:w-auto px-8 min-h-12"
                    >
                        Atualizar Brinquedo
                    </Button>
                </div>
                
            </form>
        </div>
    );
}