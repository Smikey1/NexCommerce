import express from "express";
import cors from "cors";
import { errorHandler } from "./shared/middlewares/errorHandler.js";
import fileUpload from "express-fileupload";
import { authModule } from "./modules/auth/auth.module.js"

const app = express();

app.use(cors());
app.use(express.json())

//  to create and store temporary folder for user uploaded images
app.use(fileUpload({ useTempFiles: true }))


app.get("/", (req, res) => {
    res.status(200).send("Welcome to NexCommerce API")
})

// modules use here.
authModule(app);

//custom middleware
app.use(errorHandler);

export default app