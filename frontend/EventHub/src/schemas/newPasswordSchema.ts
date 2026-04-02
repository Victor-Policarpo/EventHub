import z from "zod";

export const newPasswordSchema = z.object({
    oldPassword: z.string().min(6, { message: "A senha deve conter pelo menos 8 caracteres" }),
    newPassword: z.string().min(6, { message: "A nova senha deve conter pelo menos 8 caracteres" }),
});

export type NewPasswordFormData = z.infer<typeof newPasswordSchema>;