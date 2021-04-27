import { FETCH_STAKE, SAVE_STAKE, SHOW_PROGRESS } from "./constants"

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