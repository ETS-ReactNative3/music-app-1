import {createSelector} from 'reselect';
import {initialState} from './reducer';

/**
 * Direct selector to the wallet state domain
 */

const selectTeamDomain = state => state.team || initialState;


const makeSelectTeams = () =>
  createSelector(
    selectTeamDomain,
    substate => substate.team,
  );


const makeSelectProgress = () =>
createSelector(
  selectTeamDomain,
  substate => substate.progress,
);

export {
  makeSelectProgress,
  makeSelectTeams,
};
