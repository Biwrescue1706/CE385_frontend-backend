import { GET_CATEGORY_ALL, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from "@/apis/endpoint.api";
import mainApi from "@/apis/main.api";
import { PayLoadCreateCategory, PayloadUpdateCategory, PayLoadDeleteCategory } from "@/types/requests/request.category";
import { CategoryResponse } from "@/types/response/response.category";

export const getCategories = async () => {
    const { data: response } = await mainApi.get(
        GET_CATEGORY_ALL
    );
    return response;
};

export const postCategory = async (data: PayLoadCreateCategory) => {
    const { data: response } = await mainApi.post<CategoryResponse>(
        CREATE_CATEGORY,
        data
    );
    return response;
}
export const patchCategory = async (data: PayloadUpdateCategory) => {
    const { data: response } = await mainApi.patch<CategoryResponse>(
        UPDATE_CATEGORY,
        data
    );
    return response;
}

export const deleteCategory = async (data: PayLoadDeleteCategory) => {
    const { data: response } = await mainApi.delete<CategoryResponse>(
        DELETE_CATEGORY + "/" + data.id
    );
    return response;
}