import z from "zod";

export const loginSchema = z.object({
        username: z.string().trim()
        .min(3, { message: "O nome deve conter pelo menos 3 caracteres" })
        .min(6, { message: "O nome deve conter pelo menos 6 caracteres" }),
        password: z.string().trim()
        .min(6, { message: "A senha deve conter pelo menos 6 caracteres" }).max(16, { message: "A senha deve conter no máximo 16 caracteres" })
    
});

export type LoginFormData = z.infer<typeof loginSchema>;