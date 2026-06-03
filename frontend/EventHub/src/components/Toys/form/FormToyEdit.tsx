import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import { useGetToy } from "../../../hooks";
import { useUpdateToy } from "../../../hooks";
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

    if (isLoading) return <Loading />;
    if (isError) return <ErrorState message="Erro ao carregar brinquedo 😢" onRetry={() => refetch()} />;
    if (!data) return <ErrorState message="Brinquedo não encontrado" onRetry={() => refetch()} />;

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
        <div className="p-6 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 w-125">
                <div>
                    <Input
                        label="Brinquedo"
                        error={errors.name?.message}
                        {...register("name")}
                    />
                </div>
                
                <div>
                    <Input
                        label="Quantidade Disponível"
                        type="number"
                        error={errors.availableQuantity?.message}
                        {...register("availableQuantity")}
                    />
                </div>
                <div>
                    <NumericFormat
                        customInput={Input}
                        label="Valor (4 horas)"
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
                </div>

               <Button type="submit" isLoading={isPending} variant="primary">
                    Atualizar Brinquedo
                </Button>
            </form>
        </div>
    );
}