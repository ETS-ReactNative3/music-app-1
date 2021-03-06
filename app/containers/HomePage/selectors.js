/**
 * Homepage selectors
 */

import {createSelector} from 'reselect';
import {initialState} from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectNewReleaseLoading = () =>
  createSelector(
    selectHome,
    homeState => homeState.newReleaseLoading,
  );

const makeSelectNewReleases = () =>
  createSelector(
    selectHome,
    homeState => homeState.newReleases,
  );

const makeSelectFeaturedAlbumLoading = () =>
  createSelector(
    selectHome,
    homeState => homeState.featuredAlbumLoading,
  );

const makeSelectFeaturedAlbum = () =>
  createSelector(
    selectHome,
    homeState => homeState.featuredAlbum,
  );

const makeSelectTopSongsLoading = () =>
  createSelector(
    selectHome,
    homeState => homeState.topSongsLoading,
  );

const makeSelectTopSongs = () =>
  createSelector(
    selectHome,
    homeState => homeState.topSongs,
  );
export {
  selectHome,
  makeSelectNewReleaseLoading,
  makeSelectNewReleases,
  makeSelectFeaturedAlbumLoading,
  makeSelectFeaturedAlbum,
  makeSelectTopSongsLoading,
  makeSelectTopSongs,
};
