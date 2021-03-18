import { FETCH_ALBUMS, MAKE_ALBUM_FEATURED, SAVE_ALBUMS } from "./contant"

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