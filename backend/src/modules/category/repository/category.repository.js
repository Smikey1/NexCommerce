import { Category } from "../model/category.model.js";

export class CategoryRepository {

    create = async (data) => {
        return Category.create(data);
    };

    findAll = async () => {
        return Category.find();
    };

    findBySlug = async (slug) => {
        return Category.findOne({ slug }).lean();
    };

    updateBySlug = async (slug, data) => {
        return Category.findOneAndUpdate(
            { slug },
            data,
            { new: true }
        );
    };

    deleteBySlug = async (slug) => {
        return Category.findOneAndDelete({ slug });
    };

    markAsActive = async (slug) => {
        return Category.findOneAndUpdate(
            { slug },
            { isActive: true },
            { new: true }
        );
    };

    markAsInactive = async (slug) => {
        return Category.findOneAndUpdate(
            { slug },
            { isActive: false },
            { new: true }
        );
    };
}