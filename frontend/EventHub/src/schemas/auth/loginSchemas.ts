import z from "zod";

export const loginSchema = z.object({
        username: z.string().trim()
        .min(8, { message: "O nome deve conter pelo menos 8 caracteres" }),

        password: z.string().trim()
        .min(8, { message: "A senha deve conter pelo menos 8 caracteres" })
    
});

export type LoginFormData = z.infer<typeof loginSchema>;