import { FETCH_ALBUMS, MAKE_ALBUM_FEATURED, SAVE_ALBUMS, BLOCK_USER, FETCH_USERS, SAVE_USERS, SAVE_USERS_COUNT, ADD_CREDITS, SAVE_ALBUMS_COUNT, FETCH_DISPUTED_CAMPAIGNS, SAVE_DISPUTED_CAMPAIGNS, ON_ERROR_DISPUTED_CAMPAIGNS } from "./contant"

export const fetchAlbumAction = (page, limit) => {
    return {
        type: FETCH_ALBUMS,
        page, limit
    }
}

export const saveAlbumAction = (albums) => {
    return {
        type: SAVE_ALBUMS,
        albums
    }
}
export const makeAlbumFeaturedAction = (albumId, page, limit, featured) => {
    return {
        type: MAKE_ALBUM_FEATURED,
        albumId, page, limit, featured
    }
}


export const saveAlbumsCountAction = (albumCount) => {
    return {
        type: SAVE_ALBUMS_COUNT,
        albumCount
    }
}


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

export const fetchDisputedCampaignAction =(page, limit) => {
    
    return {
        type: FETCH_DISPUTED_CAMPAIGNS,
        page, limit
    }
}

export const saveDisputedCampaignAction =(disputedCampaigns) => {
    return {
        type: SAVE_DISPUTED_CAMPAIGNS,
        disputedCampaigns
    }
}

export const onErrorDisputedCampaignsAction = () => {
    return {
        type: ON_ERROR_DISPUTED_CAMPAIGNS,
    }
}