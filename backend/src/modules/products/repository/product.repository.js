import { Product } from "../model/product.model.js";

export class ProductRepository {

    create = async (data) => {
        return Product.create(data);
    };

    findAll = async () => {
        return Product.find().lean();
    };

    findBySlug = async (slug) => {
        return Product.findOne({ slug }).lean();
    };

    updateById = async (id, data) => {
        return Product.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
    };

    deleteById = async (id) => {
        return Product.findByIdAndDelete(id);
    };
}