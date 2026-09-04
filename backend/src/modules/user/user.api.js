import { UserRepository } from "./repository/user.repository.js";
import { UserService } from "./service/user.service.js";
import {UserController} from "./controller/user.controller.js";
import { rbacService } from "../rbac/rbac.api.js"

const userRepository = new UserRepository()
export const userService = new UserService(userRepository, rbacService);
export const userController = new UserController(userService);