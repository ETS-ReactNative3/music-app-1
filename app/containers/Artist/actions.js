/*
 *
 * Artist actions
 *
 */

import { DEFAULT_ACTION, FETCH_ARTIST, FOLLOW_ARTIST, SAVE_ARTIST } from './constants';

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

export function followArtistAction (artist) {
  return {
    type: FOLLOW_ARTIST,
    artist
  }
}