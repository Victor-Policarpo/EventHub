import { useMutation } from "@tanstack/react-query"
import type { ResetPassword } from "../../types";
import { resetPasswordRequest } from "../../services";

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (data: ResetPassword) => resetPasswordRequest(data)
    });
}