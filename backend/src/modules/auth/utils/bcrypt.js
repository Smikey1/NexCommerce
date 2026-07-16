import bcrypt from "bcrypt"

export const isMatched = async (plainText, hashed) => {
    return await bcrypt.compare(plainText, hashed);

}

export const generateHash = async(plainText) => {
    return await bcrypt.hash(plainText, 12);
}