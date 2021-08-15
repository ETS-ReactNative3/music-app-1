import { createSelector } from "reselect";

export const browseState = state => state.browse;

const makeSelectBrowseData = () =>
    createSelector(
        browseState,
        state => state && state.browseData || {genres: [], moods: []}
    )

const makeSelectBrowseDataLoading = () =>
    createSelector(
        browseState,
        state => state && state.loading || false
    )

    const makeSelectAlbums = () =>
    createSelector(
        browseState,
        state => state && state.albums || []
    )

export {
    makeSelectBrowseData,
    makeSelectBrowseDataLoading,
    makeSelectAlbums
}