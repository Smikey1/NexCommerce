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

    createCategory = async (data, createdBy) => {
        const request = CreateCategoryRequest(data, createdBy);

        const existingCategory =
            await this.categoryRepository.findBySlug(request.slug);

        if (existingCategory) {
            throw new CategoryAlreadyExistsError();
        }

        const category = await this.categoryRepository.create(request);

        return category;
    };

    getAllCategory = async () => {
        const categories = await this.categoryRepository.findAll();

        return categories;
    };

    getCategoryByName = async (name) => {
        const slug = slugify(name);

        const category = await this.categoryRepository.findBySlug(slug);

        if (!category) {
            throw new CategoryNotFoundError();
        }

        return category;
    };

    updateByName = async (name, data) => {
        const slug = slugify(name);
        const requestData = UpdateCategoryRequest(data);

        const category = await this.categoryRepository.updateBySlug(
            slug,
            requestData
        );

        if (!category) {
            throw new CategoryNotFoundError();
        }

        return category;
    };

    deleteByName = async (name) => {
        const slug = slugify(name);

        const category = await this.categoryRepository.deleteBySlug(slug);

        if (!category) {
            throw new CategoryNotFoundError();
        }

        return category;
    };

    markAsActive = async (name) => {
        const slug = slugify(name);

        const category = await this.categoryRepository.markAsActive(slug);

        if (!category) {
            throw new CategoryNotFoundError();
        }

        return category;
    };

    markAsInactive = async (name) => {
        const slug = slugify(name);

        const category = await this.categoryRepository.markAsInactive(slug);

        if (!category) {
            throw new CategoryNotFoundError();
        }

        return category;
    };
}