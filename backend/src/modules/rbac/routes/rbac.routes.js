import { Router } from "express";
import { rbacController } from "../controller/rbac.controller.js";

const router = Router();

router.get("/roles", ()=>{
    rbacController
});

export default router; 