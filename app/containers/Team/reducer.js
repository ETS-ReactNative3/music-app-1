/*
 *
 * Wallet reducer
 *
 */
import produce from 'immer';
import {
  SHOW_PROGRESS, SAVE_TEAMS, FETCH_TEAMS, ADD_TEAM, SAVE_TEAM_DETAILS, FETCH_TEAM_DETAILS, SAVE_TEAM_NAME, SAVE_TEAM_NAME_ERROR, SAVE_TEAM_NAME_SUCCESS, SAVE_TEAM_MEMBER, SAVE_TEAM_MEMBER_SUCCESS, SAVE_TEAM_MEMBER_ERROR,
  SAVE_PENDING_INVITES, SAVE_TEAM_MEMBERS, FETCH_MY_TEAM_REQUESTS, SAVE_MY_TEAM_REQUESTS, FETCH_MY_TEAMS, SAVE_MY_TEAMS
} from './constants';


export const initialState = {
  teams: [],
  progress: false,
  teamDetails: {},

  saveTeamNameProgress: false,

  saveTeamMemberProgress: false,

  pendingInvites: [],
  teamMembers: [],

  requests: [],
  myTeams: []
};

/* eslint-disable default-case, no-param-reassign */
const teamReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_TEAMS:
        draft.progress = true;
        break;
      case ADD_TEAM:
        draft.progress = true;
        break;
      case SAVE_TEAMS:
        draft.teams = action.teams;
        draft.progress = false;
        break;
      case SHOW_PROGRESS:
        draft.progress = action.flag;
        break;

      case FETCH_TEAM_DETAILS:
        draft.progress = true;
        break;
      case SAVE_TEAM_DETAILS:
        draft.teamDetails = action.teamDetails;
        break;

      case SAVE_TEAM_NAME:
        draft.saveTeamNameProgress = true;
        break;
      case SAVE_TEAM_NAME_SUCCESS:
      case SAVE_TEAM_NAME_ERROR:
        draft.saveTeamNameProgress = false;
        break;

      case SAVE_TEAM_MEMBER:
        draft.saveTeamMemberProgress = true;
        break;
      case SAVE_TEAM_MEMBER_SUCCESS:
      case SAVE_TEAM_MEMBER_ERROR:
        draft.saveTeamMemberProgress = false;
        break;

      case SAVE_PENDING_INVITES:
        draft.pendingInvites = action.invites;
        break;

      case SAVE_TEAM_MEMBERS:
        draft.teamMembers = action.members;
        break;

      case FETCH_MY_TEAM_REQUESTS:
        draft.progress = true;
        break;
      case SAVE_MY_TEAM_REQUESTS:
        draft.requests = action.requests;
        break;

        case FETCH_MY_TEAMS:
          draft.progress = true;
          break;

          case SAVE_MY_TEAMS:
            draft.myTeams = action.teams;
            break;
    }
  });

export default teamReducer;
