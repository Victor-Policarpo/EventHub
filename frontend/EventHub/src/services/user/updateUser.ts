import type { UserUpdateData } from "../../types";
import api from "../../lib/axios";

export default function updateUser(data: UserUpdateData){
    const response = api.patch<UserUpdateData>("/auth/profile/update", data);
    return response;
}