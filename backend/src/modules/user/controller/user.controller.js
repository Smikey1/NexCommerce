export class UserController {
    /**
     * @param {import("../service/user.service.js").UserService} userService
     */
    constructor(userService) {
        this.userService = userService;
    }

    test = () => {
        this.userService.findById("a")
    }
}