export const CategoryResponse = (data) => {
    if (data === null || data === undefined) {
        return {}
    } 
    const {name, slug, description, _id} = data;
    return {
        id: _id, 
        name, 
        slug, 
        description,
        }
}