import {createSelector} from 'reselect';
import {initialState} from './reducer';

/**
 * Direct selector to the playlist state domain
 */

const selectPlaylistDomain = state => state.playlist || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Playlist
 */

const makeSelectPlaylistPopUpState = () =>
  createSelector(
    selectPlaylistDomain,
    substate => substate.modalState,
  );

const makeSelectPlaylists = () =>
  createSelector(
    selectPlaylistDomain,
    substate => substate.playlists,
  );

const makeSelectPlaylist = () =>
  createSelector(
    selectPlaylistDomain,
    substate => substate.playlist,
  );

const makeSelectLoader = () =>
  createSelector(
    selectPlaylistDomain,
    substate => substate.loader,
  );

export {
  selectPlaylistDomain,
  makeSelectPlaylistPopUpState,
  makeSelectPlaylists,
  makeSelectPlaylist,
  makeSelectLoader
};
