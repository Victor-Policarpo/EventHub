import z from "zod";

export const createToySchema = z.object({
    name: z.string()
        .min(3, "O nome do brinquedo deve conter pelo menos 3 caracteres")
        .max(50, "O nome do brinquedo deve conter no máximo 50 caracteres"),
    
    // Usamos o objeto dentro de number para capturar o erro de tipo (NaN/Vazio)
    valueForFourHours: z.coerce
        .number({ error: "Valor do brinquedo é obrigatório" })
        .min(1, "Valor do brinquedo deve ser maior que zero"),

    availableQuantity: z.coerce
        .number({ error: "Quantidade disponível é obrigatória" })
        .min(1, "Quantidade disponível deve ser pelo menos 1"),
});

export type CreateToyData = z.infer<typeof createToySchema>;