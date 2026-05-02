import z from "zod";

export const createEmployeeSchema = z.object({
  name: z.string()
    .min(3, "O nome deve conter pelo menos 3 caracteres")
    .max(50, "O nome deve conter no máximo 50 caracteres"),

  telephone: z.string()
    .transform((val) => val.replace(/\D/g, "")) 
    .refine((val) => val.length >= 10 && val.length <= 11, {
      message: "O telefone deve ter entre 10 e 11 dígitos numéricos",
    }),
});

export type CreateEmployeeData = z.infer<typeof createEmployeeSchema>;