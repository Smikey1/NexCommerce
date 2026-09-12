import { slugify } from "../../utils/slugify.js"

export const CreateProductRequest = (requestData, createdBy) => {
   const { name, description, stock, category, price } = requestData;
return {
   name,
   slug: slugify(name),
   description,
   stock,
   category,
   price,
   createdBy:createdBy, 
}
}