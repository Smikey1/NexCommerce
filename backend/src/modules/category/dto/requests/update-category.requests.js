import { slugify } from "../../utils/slugify.js"

export const UpdateCategoryRequest = (requestData) => {
   const {name, description, adminId} = requestData
return {
   name,
   slug: slugify(name),
   description, 
   createdBy: adminId, 
}
}