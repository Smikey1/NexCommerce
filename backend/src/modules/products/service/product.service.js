import { NotFoundError } from "../../../shared/error/not-found.error.js";
import { slugify } from "../../category/utils/slugify.js";
import { CreateProductRequest } from "../dto/requests/create-product.requests.js";

export class ProductService {
    /**
     * @param {import("../repository/product.repository.js").ProductRepository} productRepository
     */
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    createProduct = async (data, createdBy) => {
        const request = CreateProductRequest(data, createdBy);

        // existing product hudaina haina? 

        const product = await this.productRepository.create(request);

        return product;
    }


    findAllProducts = async () => {
        const products = await this.productRepository.findAll();

        return products; 
    }

    findProductByName = async (name) => {
        const slug = slugify(name);
        const product = await this.productRepository.findBySlug(slug);

        if (!product) {
            throw new NotFoundError();
        }

        return product; 
    }


}