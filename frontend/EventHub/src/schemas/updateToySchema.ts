import { z } from "zod";

export const updateToySchema = z.object({
    name: z.string()
        .min(3, "O nome deve conter pelo menos 3 caracteres")
        .max(50, "O nome deve conter no máximo 50 caracteres"),

    availableQuantity: z.coerce.number()
        .int("A quantidade deve ser um número inteiro")
        .min(0, "A quantidade disponível não pode ser negativa")
        .max(100000, "A quantidade disponível não pode ser maior que 100000"),

    valueForFourHours: z.string()
    .transform((val) => {
        if (!val) return 0;
        const normalized = val.replace(",", ".");
        const parsed = parseFloat(normalized);
        return isNaN(parsed) ? 0 : parsed;
    })
});


export type UpdateToyInput = z.input<typeof updateToySchema>;
export type UpdateToyOutput = z.infer<typeof updateToySchema>;