import { HTTP_STATUS_CODE } from "../../../shared/constant/httpStatusCode.js";
import { success } from "../../../shared/utils/appResponse.js";
import { USER_SUCCESS } from "../constant/user.success.js";
import { UpdateUserRequest } from "../dto/requests/user.requests.js";
import { toUserResponse } from "../mapper/user.mapper.js";

export class UserController {
    /**
     * @param {import("../service/user.service.js").UserService} userService
     */
    constructor(userService) {
        this.userService = userService;
    }

    findAllUsers = async (req,res) => {
        const users = await this.userService.findAll();
        return res.status(HTTP_STATUS_CODE.OK).json(success(USER_SUCCESS.ALL_USERS_FETCHED, users.map(toUserResponse)));
    }

    findUserById = async () => {
        const userId = req.params;
        const user = await this.userService.findById(userId);
        return res.status(HTTP_STATUS_CODE.OK).json(success(USER_SUCCESS.USER_BY_THIS_ID_FETCHED, toUserResponse(user)));
    }

    assignRoleToUser = async (req,res) => {
        const {roleId, userId} = req.body;  
        const user = await this.userService.assignRoleToUser(roleId, userId);
        return res.status(HTTP_STATUS_CODE.OK).json(success(USER_SUCCESS.USER_ROLE_UPDATED));
    }

    getMyProfile = async (req, res) => {
        const userId = req.user.id; 
        const user = await this.userService.findById(userId);
        return res.status(HTTP_STATUS_CODE.OK).json(success(USER_SUCCESS.PROFILE_FETCHED, toUserResponse(user)));
    }

    updateMyProfile = async (req,res) => {
          const userId = req.user.id;
          const updateData = UpdateUserRequest(data);
          const user = await this.userService.updateUserProfile(userId, updateData); 
          return res.status(HTTP_STATUS_CODE.OK).json(success(USER_SUCCESS.USER_DETAILS_UPDATED, toUserResponse(user)));
    }

    updateUserProfile = async (req,res) => {
        const userId = req.params.userId;
        const updateData = UpdateUserRequest(data);
        const user = await this.userService.updateUserProfile(userId, updateData);
        return res.status(HTTP_STATUS_CODE.OK).json(USER_SUCCESS.USER_DETAILS_UPDATED, toUserResponse(user));
    }

    activateUser = async (req,res) => {
        const userId = req.user.id;
        const user = await this.userService.updateUserStatus(userId,true);
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json(success(USER_SUCCESS.ACTIVATED_USER_STATUS));
    }

    deactivateUser = async (req,res) => {
        const userId = req.user.id;
        const user = await this.userService.updateUserStatus(userId,false);
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json(success(USER_SUCCESS.DEACTIVATED_USER_STATUS));
    }


}