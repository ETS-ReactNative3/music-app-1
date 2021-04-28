import { FETCH_STAKE, SAVE_STAKE, SHOW_PROGRESS, CREATE_STAKE, CREATE_STAKE_PROGRESS } from "./constants"

export const fetchStakeAction = () => {
    return {
        type: FETCH_STAKE
    }
}

export const saveStakeAction = (stakes) => {
    return {
        type: SAVE_STAKE,
        stakes
    }
}

export const showProgressAction = (flag) => {
    return {
        type: SHOW_PROGRESS,
        flag
    }
}

export const createStakeAction = (data) => {
    return {
        type: CREATE_STAKE,
        data
    }
}

export const createStakeProgressAction = (flag) => {
    return {
        type: CREATE_STAKE_PROGRESS,
        flag
    }
}