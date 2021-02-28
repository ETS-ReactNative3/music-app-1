/*
 *
 * Library actions
 *
 */

import { FETCH_FOLLOWED_ALBUMS, FETCH_FOLLOWED_ARTIST, SAVE_FOLLOWED_ALBUMS, SAVE_FOLLOWED_ARTIST, SAVE_FOLLOWED_PLAYLIST } from "./constants"

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

export const fetchFollowedPlaylistAction = () => {
  return {
    type: FETCH_FOLLOWED_PLAYLIST
  }
}

export const saveFollowedPlaylistAction = (followedPlaylist) => {
  return {
    type: SAVE_FOLLOWED_PLAYLIST,
    followedPlaylist
  }
}