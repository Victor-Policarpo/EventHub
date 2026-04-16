import { useMutation } from "@tanstack/react-query";
import type { PasswordUpdateData } from "../types/types";
import updatePassword from "../services/user/updatePassword";

export const useNewPassword = () => {
    return useMutation({
        mutationFn: (data: PasswordUpdateData) => updatePassword(data)
    })
}