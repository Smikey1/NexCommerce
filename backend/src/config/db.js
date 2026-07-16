import mongoose from "mongoose";
import { Env } from "../shared/env/env.js";

export const connectDB = async () => {
    const connection = await mongoose.connect(Env.MONGO_URI);
    return connection; 
}