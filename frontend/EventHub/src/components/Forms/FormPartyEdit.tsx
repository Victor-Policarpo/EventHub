import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import { PatternFormat, NumericFormat } from "react-number-format";
import { useParams } from "react-router-dom";
import { useGetParty } from "../../hooks/useGetParty";
import { useUpdateParty } from "../../hooks/useUpdateParty";
import { type UpdatePartyForm, updatePartySchema } from "../../schemas/updatePartySchema";
import { formatToDateTimeLocal } from "../../utils/formatDateHours";
import { Loading, ErrorState, Input, Button } from "../Ui";

export function FormPartyEdit(){
    const { partyId } = useParams();
    const id = Number(partyId);
    const { data, isLoading, isError } = useGetParty(id);
    const { mutate, isPending } = useUpdateParty();
    const { register, handleSubmit, control, formState: {errors}, setValue } = useForm<UpdatePartyForm>({
        values: {
            name: data?.name || "",
            address: data?.address || "",
            telephone: data?.telephone || "",
            value: data?.value ? String(data.value) : "",
            startDateHours: data?.startDateHours ? formatToDateTimeLocal(data.startDateHours) : "",
            endDateHours: data?.endDateHours ? formatToDateTimeLocal(data.endDateHours) : ""
        },
        resolver: zodResolver(updatePartySchema),
        mode: "onBlur"
    });

    if (isLoading) return <Loading />;
    if (isError) return <ErrorState message="Erro ao carregar dados do perfil 😢" />;


    function onSubmit(values: UpdatePartyForm) {
        const payload = {
            name: values.name,
            address: values.address,
            telephone: values.telephone.replace(/\D/g, ""),
            value: Number(values.value),
            startDateHours: values.startDateHours, 
            endDateHours: values.endDateHours
        };

        console.log("Payload: ", payload);
        if (!id || isNaN(id)) {
            toast.error("ID da festa inválido!");
            return;
        }

        mutate({ 
            id: id,
            data: payload 
        }, {
            onSuccess: () => toast.success("Festa atualizada com sucesso!"),
            onError: (err) => toast.error("Erro: " + err.message)
        });
    }

    return (
        <div>
           <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 w-125">

                <div>
                    <Input
                        label="Nome do Responsável"
                        type="text"
                        placeholder="Insira o Nome do Responsável"
                        error={errors.name?.message}
                        {...register("name")}
                    />
                </div>

                <div>
                    <Input
                        label="Endereço"
                        type="text"
                        placeholder="Insira o Endereço"
                        error={errors.address?.message}
                        {...register("address")}
                    />
                </div>
                <div>
                <Controller
                    control={control}
                    name="telephone"
                    render={({ field: { onChange, value, ref } }) => (
                    <PatternFormat
                        customInput={Input} 
                        label="Telefone"
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
                </div>

                <div>
                    <NumericFormat
                        customInput={Input}
                        label="Valor da Festa"
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        fixedDecimalScale
                        error={errors.value?.message}
                        value={data?.value} 
                        onValueChange={(values) => {
                        setValue("value", values.value); 
                        }}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Input
                        label="Data de Início"
                        type="datetime-local"
                        error={errors.startDateHours?.message}
                        {...register("startDateHours")}
                        />
                    </div>

                    <div>
                        <Input
                        label="Data de Término"
                        type="datetime-local"
                        error={errors.endDateHours?.message}
                        {...register("endDateHours")}
                        />
                    </div>
                </div>

                    <Button
                    type="submit"
                    isLoading={isPending}
                    disabled={isPending}
                    variant="primary"
                    >
                    Confirmar Alteração
                    </Button>
                    
            </form>
        </div>
    );
}