export const LoginResponse = (data) => {
    return {
        user: {
            id:data.user._id,
            firstName:data.user.firstName,
            lastName:data.user.lastName,
            email:data.user.email,
            role:data.user.role
        },
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
    }
}