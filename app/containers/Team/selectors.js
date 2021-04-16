import {createSelector} from 'reselect';
import {initialState} from './reducer';

/**
 * Direct selector to the wallet state domain
 */

const selectTeamDomain = state => state.team || initialState;


const makeSelectTeams = () =>
  createSelector(
    selectTeamDomain,
    substate => substate.teams,
  );


const makeSelectProgress = () =>
createSelector(
  selectTeamDomain,
  substate => substate.progress,
);


const makeSelectTeamDetails = () =>
createSelector(
  selectTeamDomain,
  substate => substate.teamDetails,
);


const makeSelectSaveTeamNameProgress = () =>
createSelector(
  selectTeamDomain,
  substate => substate.saveTeamNameProgress,
);

const makeSelectSaveTeamMemberProgress = () =>
createSelector(
  selectTeamDomain,
  substate => substate.saveTeamMemberProgress,
);


const makeSelectPendingInvites = () =>
createSelector(
  selectTeamDomain,
  substate => substate.pendingInvites,
);


const makeSelectTeamMembers = () =>
createSelector(
  selectTeamDomain,
  substate => substate.teamMembers,
);

export {
  makeSelectProgress,
  makeSelectTeams,
  makeSelectTeamDetails,
  makeSelectSaveTeamNameProgress,
  makeSelectSaveTeamMemberProgress,
  makeSelectPendingInvites,
  makeSelectTeamMembers
};
