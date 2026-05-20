import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepBasicInfoSchema, type StepFormValues } from '../../../../schemas';
import { Button, Input } from '../../..';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { formatToDateTimeLocal } from '../../../../utils/formatDateHours';

interface StepBasicInfoProps {
  initialData: StepFormValues | null;
  onNext: (data: StepFormValues) => void;
}

export function StepBasicInfo({ initialData, onNext }: StepBasicInfoProps) {
  const { register, handleSubmit, formState: { errors }, control } = useForm<StepFormValues>({
    resolver: zodResolver(stepBasicInfoSchema),
    defaultValues: initialData ? {
      ...initialData,
      startDateHours: formatToDateTimeLocal(initialData.startDateHours),
      endDateHours: formatToDateTimeLocal(initialData.endDateHours),
    } : {
      name: '',
      telephone: '',
      address: '',
      startDateHours: '',
      endDateHours: '',
      value: '',
    },
  });

  return (
    <form 
      onSubmit={handleSubmit(onNext)} 
      className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-sm"
    >
      <Input
        label="Nome do Responsável"
        placeholder='Insira o nome do responsavel pela festa...'
        type="text"
        error={errors.name?.message}
        {...register('name')}
      />

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

      <Input
        label="Endereço"
        placeholder='Insira o endereço da festa...'
        type="text"
        error={errors.address?.message}
        {...register('address')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Início"
          type="datetime-local"
          error={errors.startDateHours?.message}
          {...register('startDateHours')}
        />

        <Input
          label="Fim"
          type="datetime-local"
          error={errors.endDateHours?.message}
          {...register('endDateHours')}
        />
      </div>

      <Controller
        control={control}
        name="value"
        render={({ field: { onChange, value, ref } }) => (
          <NumericFormat
            customInput={Input}
            label="Valor da Festa"
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            value={value}
            getInputRef={ref}
            onValueChange={(vals) => {
              onChange(vals.value);
            }}
            error={errors.value?.message}
          />
        )}
      />

      <div className="flex justify-end mt-2">
        <Button type="submit" className="w-full md:w-auto">
          Continuar
        </Button>
      </div>
    </form>
  );
}