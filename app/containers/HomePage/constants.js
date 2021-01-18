/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_FEATURED_ALBUMS = 'boilerplate/Home/GET_FEATURED_ALBUMS';
export const GET_FEATURED_ALBUMS_SUCCESS = 'boilerplate/Home/GET_FEATURED_ALBUMS_SUCCESS';
export const GET_FEATURED_ALBUMS_FAIL = 'boilerplate/Home/GET_FEATURED_ALBUMS_FAIL';

export const GET_TOP_SONGS = 'boilerplate/Home/GET_TOP_SONGS';
export const GET_TOP_SONGS_SUCCESS = 'boilerplate/Home/GET_TOP_SONGS_SUCCESS';
export const GET_TOP_SONGS_FAIL = 'boilerplate/Home/GET_TOP_SONGS_FAIL';

export const GET_NEW_RELEASES = 'boilerplate/Home/GET_NEW_RELEASES_SONGS';
export const GET_NEW_RELEASES_SUCCESS = 'boilerplate/Home/GET_NEW_RELEASES_SUCCESS';
export const GET_NEW_RELEASES_FAIL = 'boilerplate/Home/GET_NEW_RELEASES_FAIL';
