import z from "zod";

export const forgotPasswordSchema = z.object({
    email: z.email({message: "Endereço de e-mail inválido"}).trim()
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;