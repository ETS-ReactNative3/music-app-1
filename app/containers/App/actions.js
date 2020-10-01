/*
 * App Actions
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

import axios from 'axios';

import {
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  LOAD_FEATURED_ALBUM,
  LOAD_DEFAULT_DATA,
  LOAD_DEFAULT_DATA_SUCCESS,
  SET_PLAYLIST,
  LOAD_ALBUM,
  LOAD_ALBUM_SUCCESS,
  HANDLE_SONG_PLAYING,
  HANDLE_SINGLE_SONG,
} from './constants';

import albumsJson from '../../utils/json/albums';
import latestPostsJson from '../../utils/json/posts';
import weeklyTop from '../../utils/json/weeklyTop';

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

/**
 * Dispatched when the app are loaded by the request user
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function loadFeaturedAlbum() {
  return {
    type: LOAD_FEATURED_ALBUM,
  };
}

/**
 * Dispatched when the app are loaded by the request user
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function loadDefaultData() {
  return {
    type: LOAD_DEFAULT_DATA,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function defaultDataLoaded(posts, albums, weeklyTop) {
  return {
    type: LOAD_DEFAULT_DATA_SUCCESS,
    posts,
    albums,
    weeklyTop,
  };
}

/*asynchronous thunk action creator
  calls the api, then dispatches the synchronous action creator
*/
export const fetchPosts = () => {
  return async dispatch => {
    try {
      Promise.all([
        axios.get('https://jsonplaceholder.typicode.com/posts'),
        axios.get('https://jsonplaceholder.typicode.com/users'),
        axios.get('https://jsonplaceholder.typicode.com/albums'),
        axios.get('https://jsonplaceholder.typicode.com/photos'),
      ]).then(response => {
        // const [posts, users, albums, photos] = response;
        dispatch(defaultDataLoaded(latestPostsJson, albumsJson, weeklyTop));
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export function setPlaylist(songs) {
  return {
    type: SET_PLAYLIST,
    songs,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function loadAlbumSuccess(albumInfo, playlist) {
  return {
    type: LOAD_ALBUM_SUCCESS,
    albumInfo,
    playlist,
  };
}

export function loadAlbum(slug) {
  return {
    type: LOAD_ALBUM,
    slug,
  };
}

export function handleSongPlaying(playing) {
  return {
    type: HANDLE_SONG_PLAYING,
    playing,
  };
}

export function handleSingleSong(index, status) {
  return {
    type: HANDLE_SINGLE_SONG,
    index,
    status,
  };
}
