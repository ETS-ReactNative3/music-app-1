import { createSelector } from 'reselect';
import { initialState } from './reducer';

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
    substate => substate.addModalState,
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

const makeSelectUpdateModalStatus = () =>
  createSelector(
    selectPlaylistDomain,
    substate => substate.updateModalState,
  );


  const makeSelectPopularPlaylist = () =>
  createSelector(
    selectPlaylistDomain,
    substate => substate.popularPlaylist,
  );


const makeSelectPopularPlaylistLoading = () =>
createSelector(
  selectPlaylistDomain,
  substate => substate.popularPlaylistLoading,
);


export {
  selectPlaylistDomain,
  makeSelectPlaylistPopUpState,
  makeSelectPlaylists,
  makeSelectPlaylist,
  makeSelectLoader,
  makeSelectUpdateModalStatus,

  makeSelectPopularPlaylist,
  makeSelectPopularPlaylistLoading
};
