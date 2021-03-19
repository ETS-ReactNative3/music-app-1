import { BLOCK_USER, FETCH_USERS, SAVE_USERS, SAVE_USERS_COUNT, ADD_CREDITS } from "./constant"

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


export const saveUsersCountAction = (userCount) => {
    return {
        type: SAVE_USERS_COUNT,
        userCount
    }
}

export const blockUserAction = (userId, page, limit,block) => {
    return {
        type: BLOCK_USER,
        userId, page, limit,block
    }
}

export const addCreditsAction = (userId, credits, page, limit) => {
    return {
        type: ADD_CREDITS,
        userId, credits,page, limit
    }
}