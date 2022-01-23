import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the album state domain
 */

const selectAlbumDomain = state => state.album || initialState;

/**
 * Default selector used by Album
 */

const makeSelectAlbum = () =>
  createSelector(
    selectAlbumDomain,
    substate => substate.album,
  );

const makeSelectAlbumSongs = () =>
  createSelector(
    selectAlbumDomain,
    substate => substate.album && substate.album.albumSongs,
  );

const makeSelectAlbumLoader = () =>
  createSelector(
    selectAlbumDomain,
    substate => substate.loader,
  );

const makeSelectMyAlbums = () =>
  createSelector(
    selectAlbumDomain,
    substate => substate.myAlbums,
  );

const makeSelectMySongs = () =>
  createSelector(
    selectAlbumDomain,
    substate => substate.songs,
  );

const makeSelectEditAlbum = () =>
  createSelector(
    selectAlbumDomain,
    substate => substate.editAlbum,
  );

const makeSelectGenres = () =>
  createSelector(
    selectAlbumDomain,
    substate => substate.genres,
  );

const makeSelectFormLoader = () =>
  createSelector(
    selectAlbumDomain,
    substate => substate.formLoader,
  );

const makeSelectRecommendedAlbumsLoading = () =>
  createSelector(
    selectAlbumDomain,
    substate => substate.recommendedAlbumsLoading,
  );

const makeSelectRecommendedAlbums = () =>
  createSelector(
    selectAlbumDomain,
    substate => substate.recommendedAlbums,
  );

const makeSelectVoteLoader = () =>
  createSelector(
    selectAlbumDomain,
    substate => substate.voteLoader,
  );

export {
  makeSelectAlbum,
  makeSelectAlbumLoader,
  makeSelectMyAlbums,
  makeSelectAlbumSongs,
  makeSelectMySongs,
  makeSelectEditAlbum,
  makeSelectGenres,
  makeSelectFormLoader,
  makeSelectRecommendedAlbumsLoading,
  makeSelectRecommendedAlbums,
  makeSelectVoteLoader
};
