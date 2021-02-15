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


const makeSelectVerifySubmitting = () =>
  createSelector(
    selectLibraryDomain,
    substate => substate.followedArtist,
  );

  const makeSelectDeclineSubmitting = () =>
  createSelector(
    selectLibraryDomain,
    substate => substate.followedPlaylist,
  );


export {
  makeSelectFollowedAlbums,
  makeSelectVerifySubmitting,
  makeSelectDeclineSubmitting
};
