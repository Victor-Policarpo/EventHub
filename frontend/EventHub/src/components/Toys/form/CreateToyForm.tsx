import { NumericFormat } from "react-number-format";
import { Button, Input } from "../../Ui";
import { useCreateToy } from "../../../hooks";
import { useForm, type Resolver } from "react-hook-form";
import { createToySchema, type CreateToyData } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function CreateToyForm() {
    const navigate = useNavigate();
    const { mutate, isPending } = useCreateToy();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateToyData>({
        resolver: zodResolver(createToySchema) as Resolver<CreateToyData>,
        mode: "onBlur"
    });

    const onSubmit = (data: CreateToyData) => {
        mutate(data, {
            onSuccess: () => {
                toast.success(`${data.name} criado com sucesso!`);
                navigate("/toys", { replace: true });
            },
            onError: (error) => {  
                toast.error(`Erro ao criar brinquedo: ${error.message}`);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
            
            <Input
                label="Nome do Brinquedo"
                placeholder="Ex: Pula-Pula Castelo"
                type="text"
                {...register("name")}
                error={errors.name?.message}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <NumericFormat
                    customInput={Input}
                    label="Valor (Período de 4h)"
                    placeholder="R$ 0,00"
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="R$ "
                    decimalScale={2}
                    fixedDecimalScale
                    error={errors.valueForFourHours?.message}
                    {...register("valueForFourHours")}
                    onValueChange={(values) => {
                        setValue("valueForFourHours", values.floatValue as number, {
                            shouldValidate: true
                        }); 
                    }}
                />

                <Input
                    label="Quantidade em Estoque"
                    placeholder="Ex: 2"
                    type="number"
                    {...register("availableQuantity", { valueAsNumber: true })}
                    error={errors.availableQuantity?.message}
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
                    Criar Brinquedo
                </Button>
            </div>
        </form>
    );
}