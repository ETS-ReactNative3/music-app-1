import { FETCH_BROWSE_DATA, ON_ERROR_BROWSE_DATA, SAVE_BROWSE_DATA } from "./constants"

export const fetchBrowseDataAction = () => {
    return {
        type: FETCH_BROWSE_DATA,
    }
}

export const saveBrowseDataAction = (browseData) => {
    return {
        type: SAVE_BROWSE_DATA,
        browseData
    }
}

export const onErrorBrowseData = () => {
    return {
        type: ON_ERROR_BROWSE_DATA
    }
}