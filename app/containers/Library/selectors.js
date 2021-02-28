import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tastemaker state domain
 */

const selectLibraryDomain = state => state.library || initialState;

/**
 * Other specific selectors
 */

const makeSelectFollowedAlbums = () =>
  createSelector(
    selectLibraryDomain,
    substate => substate.followedAlbums,
  );


const makeSelectFollowedArtist = () =>
  createSelector(
    selectLibraryDomain,
    substate => substate.followedArtist,
  );



export {
  makeSelectFollowedAlbums,
  makeSelectFollowedArtist,
};
