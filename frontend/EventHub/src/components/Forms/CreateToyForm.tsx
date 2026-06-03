import { NumericFormat } from "react-number-format";
import { Button, Input } from "../Ui";
import { useCreateToy } from "../../hooks";
import { useForm, type Resolver } from "react-hook-form";
import { createToySchema, type CreateToyData } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function CreateToyForm() {
    const navigate = useNavigate();
    const { mutate, isPending } = useCreateToy();
    const {  register, handleSubmit, setValue, formState: { errors } } = useForm<CreateToyData>({
        resolver: zodResolver(createToySchema) as Resolver<CreateToyData>,
        mode: "onBlur"
    });

    const onSubmit = (data: CreateToyData) => {
        mutate(data, {
            onSuccess: () => {
                toast.success(`${data.name} criado com sucesso!`);
                navigate("/toys/new", { replace: true });
            },
            onError: (error) => {  
                toast.error(`Erro ao criar brinquedo: ${error.message}`);
            }
        });
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 w-125">
                <div>
                    <Input
                        label="Brinquedo"
                        placeholder="Digite o nome do brinquedo"
                        type="text"
                        {...register("name")}
                        error={errors.name?.message}
                    />
                </div>

                <div>
                    <NumericFormat
                        customInput={Input}
                        label="Valor do brinquedo"
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
                </div>

                <div>
                    <Input
                        label="Quantidade Disponível"
                        placeholder="Digite a quantidade disponível do brinquedo"
                        {...register("availableQuantity", { valueAsNumber: true })}
                        error={errors.availableQuantity?.message}
                    />
                </div>
                
                <Button
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                    variant="primary"
                >
                    Criar Brinquedo
                </Button>

            </form>
        </div>
    );
}