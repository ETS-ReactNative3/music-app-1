/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectAdminUsersState = state => state.adminUsers;

const makeSelectAdminUsers = () =>
  createSelector(
    selectAdminUsersState,
    globalState => globalState && globalState.users || [],
  );


const makeSelectAdminUsersCount = () =>
  createSelector(
    selectAdminUsersState,
    globalState => globalState && globalState.userCount || [],
  );

export {
  makeSelectAdminUsers,
  makeSelectAdminUsersCount,
};
