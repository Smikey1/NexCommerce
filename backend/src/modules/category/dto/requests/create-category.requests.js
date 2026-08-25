import { slugify } from "../../utils/slugify.js"

export const CreateCategoryRequest = (requestData) => {
   const {name, description, adminId} = requestData
return {
   name,
   slug: slugify(name),
   description,
   isActive: true, 
   createdBy: adminId, 
}
}