import { HTTP_STATUS_CODE } from "../../../shared/constant/httpStatusCode.js";
import { success } from "../../../shared/utils/appResponse.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { CATEGORY_SUCCESS } from "../constant/category.success.js";
import { toCategoryResponse } from "../mapper/category.mapper.js";
import { categoryService } from "../service/category.service.js";

class CategoryController {
create = asyncHandler(async(req, res) => {
const category = await categoryService.createCategory(req.body);
return res.status(HTTP_STATUS_CODE.CREATED).json(success(CATEGORY_SUCCESS.CREATED, toCategoryResponse(category)));
})

getAll = asyncHandler(async(req,res) => {
    const categories = await categoryService.getAllCategory();
    return res.status(HTTP_STATUS_CODE.OK).json(success(CATEGORY_SUCCESS.GET_ALL, categories.map(category => toCategoryResponse(category))));
})

getByName = asyncHandler(async(req,res) => {
    const category = await categoryService.getCategoryByName(req.params.name);
    return res.status(HTTP_STATUS_CODE.OK).json(success(CATEGORY_SUCCESS.GET, toCategoryResponse(category)));
})

updateByName = asyncHandler(async(req, res) => {
    const category = await categoryService.updateByName(req.params.name, req.body);
    return res.status(HTTP_STATUS_CODE.OK).json(success(CATEGORY_SUCCESS.UPDATED, toCategoryResponse(category)));
})

deleteByName = asyncHandler(async(req, res) => {
    const category = await categoryService.deleteByName(req.params.name);
    return res.status(HTTP_STATUS_CODE.OK).json(success(CATEGORY_SUCCESS.DELETED));
})

markAsActive = asyncHandler(async(req,res) => {
    const category = await categoryService.markAsActive(req.params.name);
    return res.status(HTTP_STATUS_CODE.OK).json(success(CATEGORY_SUCCESS.ACTIVATED, toCategoryResponse(category)));
})

markAsInActive = asyncHandler(async(req,res) => {
    const category = await categoryService.markAsInactive(req.params.name);
    return res.status(HTTP_STATUS_CODE.OK).json(success(CATEGORY_SUCCESS.DEACTIVATED, toCategoryResponse(category)));
})


}

export const categoryController = new CategoryController();