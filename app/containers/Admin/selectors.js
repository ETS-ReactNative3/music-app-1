import { createSelector } from "reselect";

export const adminState = state => state.admin;

const makeSelectFeaturedAlbums = () =>
    createSelector(
        adminState,
        state => state && state.featuredAlbums || []
    )

const makeSelectAdminUsers = () =>
    createSelector(
        adminState,
        globalState => globalState && globalState.users || [],
    );


const makeSelectAdminAlbumsCount = () =>
createSelector(
    adminState,
    globalState => globalState && globalState.albumCount || 0,
);


const makeSelectAdminUsersCount = () =>
    createSelector(
        adminState,
        globalState => globalState && globalState.userCount,
    );

export {
    makeSelectFeaturedAlbums,
    makeSelectAdminUsers,
    makeSelectAdminUsersCount,
    makeSelectAdminAlbumsCount
}