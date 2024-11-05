import { LOGIN, AUTH_STATUS } from "@/apis/endpoint.api";
import mainApi from "@/apis/main.api";
import { PayloadLogin } from "@/types/requests/request.auth";
import { AuthResponse  } from "@/types/response/response.auth";

export const postLogin = async (data: PayloadLogin) => {
    const { data: response } = await mainApi.post<AuthResponse>(
        LOGIN,
        data
    );
    return response;
}

export const getAuthStatus = async () => {
    const { data: response } = await mainApi.get<AuthResponse>(
        AUTH_STATUS
    );
    return response;
}
