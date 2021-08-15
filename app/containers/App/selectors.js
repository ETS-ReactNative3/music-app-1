/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;
const selectMetaInformation = state => state.metaInformation || {songCount: 0};

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectLatestPosts = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.latestPosts,
  );

const makeSelectFeaturedAlbums = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.featuredAlbum,
  );

const makeSelectWeeklyTop = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.weeklyTop,
  );

const makeSelectNewReleases = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.newReleases,
  );

const makeSelectRecommended = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.recommended,
  );

const makeSelectAlbumInfo = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.albumInfo,
  );

const makeSelectPlaylist = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentPlaylist,
  );

const makeSelectCurrentSong = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentSong,
  );

const makeSelectGenres = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.genres,
  );

const makeSelectRole = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.role,
  );

const makeSelectUserDetails = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userDetails,
  );

const makeSelectUserWallet = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userDetails && globalState.userDetails.credit,
  );
const makeSelectInfluencerDetails = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.influencerProfile,
  );

const makeSelectLoader = () =>
  createSelector(
    selectGlobal,
    substate => substate.loader,
  );

const makeSelectSongPlayDuration = () =>
  createSelector(
    selectGlobal,
    substate => substate.songPlayDuration,
  );

const makeSelectSongCount = () =>
  createSelector(
    selectMetaInformation,
    substate => substate.songCount,
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectLatestPosts,
  makeSelectFeaturedAlbums,
  makeSelectWeeklyTop,
  makeSelectNewReleases,
  makeSelectRecommended,
  makeSelectAlbumInfo,
  makeSelectPlaylist,
  makeSelectCurrentSong,
  makeSelectGenres,
  makeSelectRole,
  makeSelectUserDetails,
  makeSelectInfluencerDetails,
  makeSelectLoader,
  makeSelectUserWallet,
  makeSelectSongPlayDuration,
  makeSelectSongCount
};
