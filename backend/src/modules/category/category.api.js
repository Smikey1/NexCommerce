import { CategoryRepository } from "./repository/category.repository.js";
import { CategoryService } from "./service/category.service.js";
import { CategoryController } from "./controller/category.controller.js";

const categoryRepository = new CategoryRepository()
export const categoryService = new CategoryService(categoryRepository);
export const categoryController = new CategoryController(categoryService);