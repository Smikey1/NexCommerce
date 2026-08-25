import { Category } from "../model/category.model.js";

class CategoryRepository {
    async create(data) {
        return Category.create(data);
    }

    async findAll() {
        return Category.find();
    }

    async findBySlug(slug) {
        return Category.findOne({slug});
    }

    async updateBySlug(slug, data) {
    return Category.findOneAndUpdate({slug},data,{new:true});
}

    async deleteBySlug(slug) {
        return Category.deleteOne({slug});
    }

    async markAsActive(slug) {
        return Category.findOneAndUpdate({slug}, {isActive:true}, {new: true});
    }

    async markAsInactive(slug) {
        return Category.findOneAndUpdate({slug}, {isActive:false}, {new: true});
    }
}

export const categoryRepository= new CategoryRepository();