import { useMutation } from "@tanstack/react-query"
import { resetPasswordRequest } from "../../services";

export const useResetPassword = () => {
    return useMutation({
        mutationFn: resetPasswordRequest
    });
}