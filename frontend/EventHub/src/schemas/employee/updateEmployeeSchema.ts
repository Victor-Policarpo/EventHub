import z from "zod";

export const updateEmployeeSchema = z.object({
  name: z.string()
    .min(3, "This field must contain 3 to 50 characters.")
    .max(50, "This field must contain 3 to 50 characters."),

  telephone: z.string()
    .min(10, "Telefone inválido") 
    .max(20, "Telefone muito longo")
    .transform((val) => val.replace(/\D/g, "")) 
    .refine((val) => val.length >= 10 && val.length <= 11, {
      message: "O telefone deve ter entre 10 e 11 dígitos numéricos",
    }),
});

export type UpdateEmployeeForm = z.infer<typeof updateEmployeeSchema>;