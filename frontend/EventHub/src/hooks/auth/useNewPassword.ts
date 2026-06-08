import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../services";

export const useNewPassword = () => {
    return useMutation({
        mutationFn: updatePassword
    })
}