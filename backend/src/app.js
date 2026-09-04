import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorHandler } from "./shared/middlewares/errorHandler.js";
import { authModule } from "./modules/auth/auth.module.js"
import { notificationModule } from "./modules/notification/notification.module.js";
import { categoryModule } from "./modules/category/category.module.js"
import { rbacModule } from "./modules/rbac/rbac.module.js"
import { userModule } from "./modules/user/user.module.js"

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
userModule(app);
notificationModule(app);
categoryModule(app);
rbacModule(app);

//custom middleware
app.use(errorHandler);

export default app