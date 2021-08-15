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

export const SET_PLAYLIST = 'boilerplate/App/SET_PLAYLIST';
export const HANDLE_SONG_PLAYING = 'boilerplate/App/HANDLE_SONG_PLAYING';
export const HANDLE_SINGLE_SONG = 'boilerplate/App/HANDLE_SINGLE_SONG';
export const SUCCESS_HANDLE_SONG_PLAYING = 'boilerplate/App/SUCCESS_HANDLE_SONG_PLAYING';
export const SUCCESS_HANDLE_SINGLE_SONG = 'boilerplate/App/SUCCESS_HANDLE_SINGLE_SONG';
export const UPDATE_SONG_PLAY_DURATION = 'boilerplate/App/UPDATE_SONG_PLAY_DURATION';
export const TRACK_SONG = 'boilerplate/App/TRACK_SONG';
export const SET_ROLE = 'app/Global/SET_ROLE';
export const GET_GENRES = 'app/Global/GET_GENRES';
export const GET_GENRES_SUCCESS = 'app/Global/GET_GENRES_SUCCESS';
export const GET_GENRES_FAIL = 'app/Global/GET_GENRES_FAIL';
export const PREPARE_APP = 'app/Global/PREPARE_APP';
export const SET_SONGS = 'app/Global/SET_SONGS';
export const SET_LOADER = 'app/Global/SET_LOADER';

export const GET_USER_DETAILS = 'app/Global/GET_USER_DETAILS';
export const GET_USER_DETAILS_SUCCESS = 'app/Global/GET_USER_DETAILS_SUCCESS';
export const GET_USER_DETAILS_ERROR = 'app/Global/GET_USER_DETAILS_ERROR';

export const SOCIAL_MEDIA = {
  FACEBOOK: 'facebook',
  TWITTER: 'twitter',
  INSTAGRAM: 'instagram',
  BLOG: 'blog',
  YOUTUBE: 'youtube',
};

export const SOCIAL_CHANNELS = {
  FACEBOOK: 1,
  TWITTER: 2,
  INSTAGRAM: 3,
  YOUTUBE: 4,
  BLOG: 5,
};
