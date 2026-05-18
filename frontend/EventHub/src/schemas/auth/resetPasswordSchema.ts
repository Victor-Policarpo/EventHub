import z from "zod";

export const resetPasswordSchema = z.object({
    password: z.string()
        .trim()
        .min(8, { message: "A senha deve conter entre 8 e 16 caracteres" })
        .max(16, { message: "A senha deve conter entre 8 e 16 caracteres" })
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/, { 
            message: "A senha deve conter pelo menos uma letra, um número e um caractere especial" 
        }),

    confirmPassword: z.string()
        .trim()
        .min(1, { message: "A confirmação de senha é obrigatória" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
});

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;