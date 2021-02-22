import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the artist state domain
 */

const selectArtistDomain = state => state.artist || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Artist
 */

const makeSelectArtist = () =>
  createSelector(
    selectArtistDomain,
    substate => substate,
  );

export default makeSelectArtist;
export { selectArtistDomain };
