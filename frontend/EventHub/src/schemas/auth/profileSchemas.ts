import z from "zod";

export const profileSchema = z.object({
    fullName: z.string().trim()
    .min(3, { message: "O nome deve conter pelo menos 3 caracteres" })
    .max(100, { message: "O nome deve conter no máximo 100 caracteres" }),
    username: z.string().trim()
        .min(3, { message: "O username deve conter pelo menos 3 caracteres" })
        .max(50, { message: "O username deve conter no máximo 50 caracteres" }),
    email: z.email({message: "Endereço de e-mail inválido"}).trim(),
})

export type ProfileFormData = z.infer<typeof profileSchema>;