/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'boilerplate/App/LOAD_REPOS';
export const LOAD_REPOS_SUCCESS = 'boilerplate/App/LOAD_REPOS_SUCCESS';
export const LOAD_REPOS_ERROR = 'boilerplate/App/LOAD_REPOS_ERROR';
export const LOAD_FEATURED_ALBUM = 'boilerplate/App/LOAD_FEATURED_ALBUM';
export const LOAD_DEFAULT_DATA = 'boilerplate/App/LOAD_DEFAULT_DATA';
export const LOAD_DEFAULT_DATA_SUCCESS =
  'boilerplate/App/LOAD_DEFAULT_DATA_SUCCESS';
export const SET_PLAYLIST = 'boilerplate/App/SET_PLAYLIST';
export const LOAD_ALBUM = 'boilerplate/App/LOAD_ALBUM';
export const LOAD_ALBUM_SUCCESS = 'boilerplate/App/LOAD_ALBUM_SUCCESS';
export const HANDLE_SONG_PLAYING = 'boilerplate/App/HANDLE_SONG_PLAYING';
export const HANDLE_SINGLE_SONG = 'boilerplate/App/HANDLE_SINGLE_SONG';
export const SET_ROLE = 'app/Global/SET_ROLE';
export const GET_GENRES = 'app/Global/GET_GENRES';
export const GET_GENRES_SUCCESS = 'app/Global/GET_GENRES_SUCCESS';
export const GET_GENRES_FAIL = 'app/Global/GET_GENRES_FAIL';
export const PREPARE_APP = 'app/Global/PREPARE_APP';
export const SET_SONGS = 'app/Global/SET_SONGS';
export const SET_USER_DETAILS = 'app/Global/SET_USER_DETAILS';
export const SET_INFLUENCER_DETAILS = 'app/Global/SET_INFLUENCER_DETAILS';
export const SET_LOADER = 'app/Global/SET_LOADER';