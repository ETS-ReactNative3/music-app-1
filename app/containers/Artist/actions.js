/*
 *
 * Artist actions
 *
 */

import { DEFAULT_ACTION, FETCH_ARTIST, FETCH_SUPPORT_DATA, FOLLOW_ARTIST, SAVE_ARTIST, SAVE_SUPPORT_DATA, SUPPORT_ARTIST } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function fetchArtistAction(id) {
  return {
    type: FETCH_ARTIST,
    id
  };
}

export function saveArtistAction(artist) {
  return {
    type: SAVE_ARTIST,
    artist
  };
}

export function followArtistAction (artistId, follow, id) {
  return {
    type: FOLLOW_ARTIST,
    artistId, follow, id
  }
}

export const supportArtistAction = (artistId) => {
  return {
    type: SUPPORT_ARTIST,
    artistId
  }
}

export const fetchSupportedArtistAction = () => {
  return {
    type: FETCH_SUPPORT_DATA,
  }
}


export const saveSupportedArtistAction = (supportedArtist) => {
  return {
    type: SAVE_SUPPORT_DATA,
    supportedArtist
  }
}