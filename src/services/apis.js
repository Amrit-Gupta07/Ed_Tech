const BASE_URL = "http://localhost:8080/api/v1"


export const endpoints = {
    LOGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    SEND_OTP: BASE_URL + "/auth/sendotp"
}

export const categories = {
    CATAGORIES_API: BASE_URL + "/course/showAllCategories"
}

export const settingsEndPoint = {
    UPDATE_DISPLAY_PICTURE_API : BASE_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE : BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD: BASE_URL + "/auth/changepassword"
}