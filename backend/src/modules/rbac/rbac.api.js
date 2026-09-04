import { RbacController } from "./controller/rbac.controller.js";
import { RbacRepository } from "./repository/rbac.repository.js";
import { RbacService } from "./service/rbac.service.js";

const rbacRepository = new RbacRepository();
export const rbacService = new RbacService(rbacRepository);
export const rbacController = new RbacController(rbacService)