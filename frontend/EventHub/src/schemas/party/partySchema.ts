import { z } from 'zod';

export const stepBasicInfoSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  telephone: z.string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length >= 10 && val.length <= 11, {
      message: "O telefone deve ter entre 10 e 11 números",
    }),
  
  address: z.string().min(5, 'O endereço deve ser mais descritivo'),
  startDateHours: z.string().min(1, 'A data e horário de início são obrigatórios'),
  endDateHours: z.union([z.string(), z.literal('')]).optional(),
  value: z.string().optional(),

})
.refine((data) => {
  if (!data.endDateHours) return true;
  const start = new Date(data.startDateHours).getTime();
  const end = new Date(data.endDateHours).getTime();
  
  return end > start;
}, {
  message: 'O horário de término deve ser posterior ao início',
  path: ['endDateHours'],
});

export type StepFormValues = z.infer<typeof stepBasicInfoSchema>;