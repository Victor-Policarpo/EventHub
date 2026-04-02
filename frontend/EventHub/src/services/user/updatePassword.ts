import api from "../../lib/axios";
import type { PasswordUpdateData } from "../../types/types";

export default function updatePassword(data: PasswordUpdateData){
    const response = api.patch("auth/profile/change-password", data);
    return response;
}