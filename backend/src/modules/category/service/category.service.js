import { CreateCategoryRequest } from "../dto/requests/create-category.requests.js";
import { UpdateCategoryRequest } from "../dto/requests/update-category.requests.js";
import { CategoryAlreadyExistsError } from "../error/category-already-exists.error.js";
import { CategoryNotFoundError } from "../error/category-not-found.error.js";
import { slugify } from "../utils/slugify.js";

export class CategoryService {
    /**
     * @param {import("../repository/category.repository.js").CategoryRepository} categoryRepository
     */
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    async createCategory(data, createdBy) {
        const request = CreateCategoryRequest(data, createdBy);
        const existingCategory = await this.categoryRepository.findBySlug(request.slug);

        if (existingCategory) {
            throw new CategoryAlreadyExistsError(); 
        }
        const category = await Category.create(request);
        return category;
    }
    
    async getAllCategory(){
        const categories = await this.categoryRepository.findAll();

        return categories;
    }

    async getCategoryByName(name){
        const slug = slugify(name);
        const category = await this.categoryRepository.findBySlug(slug);
        if (!category) {
            throw new CategoryNotFoundError();
        }
        return category; 
    }

    async updateByName(name, data) {
        const slug = slugify(name);
        const requestData = UpdateCategoryRequest(data);
        const category = await this.categoryRepository.updateBySlug(slug, requestData);

        return category;
    }

    async deleteByName(name) {
        const slug = slugify(name);
        const category = await this.categoryRepository.deleteBySlug(slug);

        return category; 
    }

    async markAsActive(name) { 
        const slug = slugify(name);
        const category = await this.categoryRepository.markAsActive(slug);
        // TODO: #1 If not category
        return category;
    }

    async markAsInactive(name) {
        const slug = slugify(name);
        const category = await this.categoryRepository.markAsInactive(slug);

        return category; 
    }
    
}