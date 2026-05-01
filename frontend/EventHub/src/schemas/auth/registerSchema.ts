import z from "zod";

export const registerSchema = z.object({
    name: z.string().trim()
    .min(3, { message: "O nome deve conter pelo menos 3 caracteres" })
    .max(50, { message: "O nome deve conter no máximo 50 caracteres" }),
    username: z.string().trim()
    .min(3, { message: "O username deve conter pelo menos 3 caracteres" })
    .max(50, { message: "O username deve conter no máximo 50 caracteres" }),
    email: z.string().email({message: "Endereço de e-mail inválido"}),
    password: z.string().trim()
    .min(6).max(16)
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/, 
    { message: "A senha deve conter letras, números e caracteres especiais" }),
    confirmPassword: z.string().trim().min(1, { message: "Confirme a senha" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});
export type RegisterFormData = z.infer<typeof registerSchema>;