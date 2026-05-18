import { useMutation } from "@tanstack/react-query";
import type { ForgotPasswordData } from "../../schemas";
import { forgotPasswordRequest } from "../../services";

export function useForgotPassword() {
    return useMutation({
        mutationFn: (data: ForgotPasswordData) => forgotPasswordRequest(data)
    });
}