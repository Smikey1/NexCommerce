import { CreateCategoryRequest } from "../dto/requests/create-category.requests.js";
import { UpdateCategoryRequest } from "../dto/requests/update-category.requests.js";
import { CategoryAlreadyExistsError } from "../error/category-already-exists.error.js";
import { CategoryNotFoundError } from "../error/category-not-found.error.js";
import { categoryRepository } from "../repository/category.repository.js";
import { slugify } from "../utils/slugify.js";

class CategoryService {
    async createCategory(data) {
        const request = CreateCategoryRequest(data);

        const existingCategory = await categoryRepository.findBySlug(request.slug);

        if (existingCategory) {
            throw new CategoryAlreadyExistsError(); 
        }

        const category = await categoryRepository.create(request);

        return category;
    }
    
    async getAllCategory(){
        const categories = await categoryRepository.findAll();

        return categories;
    }

    async getCategoryByName(name){
        const slug = slugify(name);
        const category = await categoryRepository.findBySlug(slug);
        if (!category) {
            throw new CategoryNotFoundError();
        }
        return category; 
    }

    async updateByName(name, data) {
        const slug = slugify(name);
        const requestData = UpdateCategoryRequest(data);
        const category = await categoryRepository.updateBySlug(slug, requestData);

        return category;
    }

    async deleteByName(name) {
        const slug = slugify(name);
        const category = await categoryRepository.deleteBySlug(slug);

        return category; 
    }

    async markAsActive(name) { 
        const slug = slugify(name);
        const category = await categoryRepository.markAsActive(slug);
        // TODO: #1 If not category
        return category;
    }

    async markAsInactive(name) {
        const slug = slugify(name);
        const category = await categoryRepository.markAsInactive(slug);

        return category; 
    }
    
}

export const categoryService = new CategoryService(); 