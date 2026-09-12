import { HTTP_STATUS_CODE } from "../../../shared/constant/httpStatusCode.js";
import { success } from "../../../shared/utils/appResponse.js";
import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import { CATEGORY_SUCCESS } from "../constant/category.success.js";
import { toCategoryResponse } from "../mapper/category.mapper.js";

export class CategoryController {
    /**
     * @param {import("../service/category.service.js").CategoryService} categoryService
     */
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    create = asyncHandler(async(req, res) => {
        const createdBy = req.user.id
        const category = await this.categoryService.createCategory(req.body, createdBy);
        return res.status(HTTP_STATUS_CODE.CREATED).json(success(CATEGORY_SUCCESS.CREATED, toCategoryResponse(category)));
    })

    getAll = asyncHandler(async(req,res) => {
        const categories = await this.categoryService.getAllCategory();
        return res.status(HTTP_STATUS_CODE.OK).json(success(CATEGORY_SUCCESS.GET_ALL, categories.map(category => toCategoryResponse(category))));
    })

    getByName = asyncHandler(async(req,res) => {
        const category = await this.categoryService.getCategoryByName(req.params.name);
        return res.status(HTTP_STATUS_CODE.OK).json(success(CATEGORY_SUCCESS.GET, toCategoryResponse(category)));
    })

    updateByName = asyncHandler(async(req, res) => {
        const category = await this.categoryService.updateByName(req.params.name, req.body);
        return res.status(HTTP_STATUS_CODE.OK).json(success(CATEGORY_SUCCESS.UPDATED, toCategoryResponse(category)));
    })

    deleteByName = asyncHandler(async(req, res) => {
        await this.categoryService.deleteByName(req.params.name);
        return res.status(HTTP_STATUS_CODE.OK).json(success(CATEGORY_SUCCESS.DELETED));
    })

    markAsActive = asyncHandler(async(req,res) => {
        const category = await this.categoryService.markAsActive(req.params.name);
        return res.status(HTTP_STATUS_CODE.OK).json(success(CATEGORY_SUCCESS.ACTIVATED, toCategoryResponse(category)));
    })

    markAsInactive = asyncHandler(async(req,res) => {
        const category = await this.categoryService.markAsInactive(req.params.name);
        return res.status(HTTP_STATUS_CODE.OK).json(success(CATEGORY_SUCCESS.DEACTIVATED, toCategoryResponse(category)));
    })

}