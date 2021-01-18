/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  GET_FEATURED_ALBUMS,
  GET_FEATURED_ALBUMS_SUCCESS,
  GET_FEATURED_ALBUMS_FAIL,
  GET_NEW_RELEASES_FAIL,
  GET_NEW_RELEASES,
  GET_NEW_RELEASES_SUCCESS,
  GET_TOP_SONGS,
  GET_TOP_SONGS_FAIL,
  GET_TOP_SONGS_SUCCESS
} from './constants';


export function getFeaturedAlbums() {
  return {
    type: GET_FEATURED_ALBUMS
  };
}

export function getFeaturedAlbumsSuccess(albums) {
  return {
    type: GET_FEATURED_ALBUMS_SUCCESS,
    albums
  };
}

export function getFeaturedAlbumsFail(error) {
  return {
    type: GET_FEATURED_ALBUMS_FAIL,
    error
  };
}

export function getTopSongs() {
  return {
    type: GET_TOP_SONGS
  };
}

export function getTopSongsSuccess(songs) {
  return {
    type: GET_TOP_SONGS_SUCCESS,
    songs
  };
}

export function getTopSongsFail(error) {
  return {
    type: GET_TOP_SONGS_FAIL,
    error
  };
}

export function getNewReleases() {
  return {
    type: GET_NEW_RELEASES
  };
}

export function getNewReleasesSuccess(releases) {
  return {
    type: GET_NEW_RELEASES_SUCCESS,
    releases
  };
}

export function getNewReleasesFail(error) {
  return {
    type: GET_NEW_RELEASES_FAIL,
    error
  };
}
