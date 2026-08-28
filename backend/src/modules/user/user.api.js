import { UserRepository } from "./repository/user.repository.js";
import { UserService } from "./service/user.service.js";
import {UserController} from "./controller/user.controller.js";

const userRepository = new UserRepository()
export const userService = new UserService(userRepository);
export const userController = new UserController(userService);