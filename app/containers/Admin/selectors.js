import { createSelector } from "reselect";

export const adminState = state => state.admin;

const makeSelectFeaturedAlbums = () =>
    createSelector(
        adminState,
        state => state && state.featuredAlbums
    )

export {
    makeSelectFeaturedAlbums
}