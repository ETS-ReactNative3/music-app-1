import {createSelector} from 'reselect';
import {initialState} from './reducer';

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
    substate => {
      return substate.genres;
    },
  );


const makeSelectMoods = () =>
  createSelector(
    selectSongDomain,
    substate => {
      return substate.moods;
    },
  );

const makeSelectSongFormLoader = () =>
  createSelector(
    selectSongDomain,
    substate => substate.songFormLoading,
  );

const makeSelectTeamMembers = () =>
  createSelector(
    selectSongDomain,
    substate => {
      return substate.members;
    },
  );


export {
  selectSongDomain,
  makeSelectedSong,
  makeSelectSong,
  makeSelectSongLoader,
  makeSelectGenres,
  makeSelectMoods,
  makeSelectSongFormLoader,
  makeSelectTeamMembers
};
