import z from "zod";
import { createEmployeeSchema } from "./createEmployeeSchema";

export const updateEmployeeSchema = createEmployeeSchema;

export type UpdateEmployeeForm = z.infer<typeof updateEmployeeSchema>;