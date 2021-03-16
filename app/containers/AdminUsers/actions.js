import { BLOCK_USER, FETCH_USERS, SAVE_USERS } from "./constant"

export const fetchUsersAction = (page, limit = 10) => {
    return {
        type: FETCH_USERS,
        page, limit
    }
}

export const saveUsersAction = (users) => {
    return {
        type: SAVE_USERS,
        users
    }
}

export const blockUserAction = (userId, page, limit) => {
    return {
        type: BLOCK_USER,
        userId, page, limit
    }
}