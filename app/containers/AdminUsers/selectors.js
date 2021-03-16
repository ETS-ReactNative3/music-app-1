/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectAdminUsersState = state => {console.log(state); return state.adminUsers};

const makeSelectAdminUsers = () =>
  createSelector(
    selectAdminUsersState,
    globalState => globalState && globalState.users || [],
  );

export {
  makeSelectAdminUsers
};
