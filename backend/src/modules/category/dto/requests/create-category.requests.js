import { slugify } from "../../utils/slugify.js"

export const CreateCategoryRequest = (requestData, createdBy) => {
   const { name, description } = requestData
return {
   name,
   slug: slugify(name),
   description,
   isActive: true, 
   createdBy:createdBy, 
}
}