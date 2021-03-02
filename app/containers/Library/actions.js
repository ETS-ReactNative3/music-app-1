/*
 *
 * Library actions
 *
 */

import { FETCH_FOLLOWED_ALBUMS, FETCH_FOLLOWED_ARTIST, SAVE_FOLLOWED_ALBUMS, SAVE_FOLLOWED_ARTIST } from "./constants"

export const fetchFollowedAlbumsAction = () => {
  return {
    type: FETCH_FOLLOWED_ALBUMS
  }
}

export const saveFollowedAlbumsAction = (followedAlbums) => {
  return {
    type: SAVE_FOLLOWED_ALBUMS,
    followedAlbums
  }
}

export const fetchFollowedArtistAction = () => {
  return {
    type: FETCH_FOLLOWED_ARTIST
  }
}

export const saveFollowedArtistAction = (followedArtist) => {
  return {
    type: SAVE_FOLLOWED_ARTIST,
    followedArtist
  }
}
