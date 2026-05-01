import { z } from "zod";

export const updatePartySchema = z.object({
  name: z.string()
  .min(3, "O nome deve conter pelo menos 3 caracteres")
  .max(50, "O nome deve conter no máximo 50 caracteres"),

  address: z.string()
  .min(5, "O endereço deve conter pelo menos 5 caracteres")
  .max(255, "O endereço deve conter no máximo 255 caracteres"),

  telephone: z.string()
  .transform((val) => val.replace(/\D/g, ""))
  .refine((val) => val.length >= 10 && val.length <= 11, {
    message: "O telefone deve ter entre 10 e 11 números",
  }),

  value: z.string().min(1, "Valor da festa obrigatório"),

  startDateHours: z.string().min(1, "Data de início obrigatória"),

  endDateHours: z.string().min(1, "Data de término obrigatória"),
  
});

export type UpdatePartyForm = z.infer<typeof updatePartySchema>;