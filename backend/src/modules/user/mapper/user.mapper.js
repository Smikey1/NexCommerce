import { UserResponse } from "../dto/response/user.response.js";

export const toUserResponse = (data) => {
  return UserResponse(data);
}