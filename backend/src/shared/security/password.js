import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export const hash = async (value) => bcrypt.hash(value, SALT_ROUNDS);

export const compare = async (plainValue, hashedValue) => bcrypt.compare(plainValue, hashedValue);