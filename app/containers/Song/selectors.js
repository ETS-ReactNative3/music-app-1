import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the song state domain
 */

const selectSongDomain = state => state.song || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Song
 */

const makeSelectSong = () =>
  createSelector(
    selectSongDomain,
    substate => substate.songs,
  );

const makeSelectedSong = () =>
  createSelector(
    selectSongDomain,
    substate => substate.song,
  );

const makeSelectSongLoader = () =>
  createSelector(
    selectSongDomain,
    substate => substate.isLoading,
  );

const makeSelectGenres = () =>
  createSelector(
    selectSongDomain,
    substate => substate.genres,
  );

const makeSelectSongFormLoader = () =>
  createSelector(
    selectSongDomain,
    substate => substate.songFormLoading,
  );

export {
  selectSongDomain,
  makeSelectedSong,
  makeSelectSong,
  makeSelectSongLoader,
  makeSelectGenres,
  makeSelectSongFormLoader,

};
