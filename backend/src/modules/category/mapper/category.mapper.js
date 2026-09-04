import { CategoryResponse } from "../dto/response/category.response.js"

export const toCategoryResponse = (data) => {
    return CategoryResponse(data);
}; 