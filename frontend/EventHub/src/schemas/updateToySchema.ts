import { z } from "zod";

export const updateToySchema = z.object({
    name: z.string()
        .min(3, "O nome deve conter pelo menos 3 caracteres")
        .max(50, "O nome deve conter no máximo 50 caracteres"),

    availableQuantity: z.coerce.number()
        .int("A quantidade deve ser um número inteiro")
        .min(0, "A quantidade disponível não pode ser negativa")
        .max(100000, "A quantidade disponível não pode ser maior que 100000"),

    valueForFourHours: z.coerce.number()
        .min(0, "O valor não pode ser negativo")
        .max(100000, "O valor não pode ser maior que 100000"),
});

export type UpdateToyForm = z.infer<typeof updateToySchema>;