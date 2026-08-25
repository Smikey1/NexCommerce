export const CategoryResponse = (data) => {
if (data === null || data === undefined) {
    return {}
} 
    const {name, slug, description} = data;
return {
name, 
slug, 
description,
}
}