import { ADD_TEAM, FETCH_TEAMS, SHOW_PROGRESS,SAVE_TEAMS, FETCH_TEAM_DETAILS, SAVE_TEAM_DETAILS, SAVE_TEAM_NAME, SAVE_TEAM_NAME_ERROR, SAVE_TEAM_NAME_SUCCESS, SAVE_TEAM_MEMBER, SAVE_TEAM_MEMBER_ERROR, SAVE_TEAM_MEMBER_SUCCESS, SAVE_PENDING_INVITES,
    FETCH_PENDING_INVITES,
    CANCEL_PENDING_REQUEST,
    FETCH_TEAM_MEMBERS,
    SAVE_TEAM_MEMBERS,
    FETCH_MY_TEAM_REQUESTS,
SAVE_MY_TEAM_REQUESTS} from "./constants"

export const fetchTeamsAction = () => {
    return {
        type: FETCH_TEAMS
    }
}

export const saveTeamsAction = (teams) => {
    return {
        type: SAVE_TEAMS,
        teams
    }
}

export const showProgressAction = (flag) => {
    return {
        type: SHOW_PROGRESS,
        flag
    }
}

export const addTeamAction = (name) => {
    return {
        type: ADD_TEAM,
        name
    }
}

export const fetchTeamDetailsAction = (id) => {
    return {
        type: FETCH_TEAM_DETAILS,
        id
    }
}

export const saveTeamDetailsAction = (teamDetails) => {
    return {
        type:SAVE_TEAM_DETAILS,
        teamDetails
    }
}

export const saveTeamNameAction = (id, name) => {
    return {
        type: SAVE_TEAM_NAME,
        id, name
    }
}

export const saveTeamNameErrorAction = () => {
    return {
        type: SAVE_TEAM_NAME_ERROR
    }
}

export const saveTeamNameSuccessAction = () => {
    return {
        type: SAVE_TEAM_NAME_SUCCESS
    }
}

export const saveTeamMemberAction = (teamId, email) => {
    return {
        type: SAVE_TEAM_MEMBER,
        teamId, email
    }
}

export const saveTeamMemberErrorAction = () => {
    return {
        type: SAVE_TEAM_MEMBER_ERROR,
    }
}

export const saveTeamMemberSuccessAction = () => {
    return {
        type: SAVE_TEAM_MEMBER_SUCCESS,
    }
}

export const fetchPendingInvitesAction = (teamId) => {
    return {
        type: FETCH_PENDING_INVITES,
        teamId
    }
}

export const savePendingInvitesAction = (invites) => {
    return {
        type: SAVE_PENDING_INVITES,
        invites
    }
}

export const cancelPendingRequestAction = (email) => {
    return {
        type: CANCEL_PENDING_REQUEST,
        email
    }
}

export const fetchTeamMembersAction = (teamId) => {
    return {
        type: FETCH_TEAM_MEMBERS,
        teamId
    }
}

export const saveTeamMembersAction = (members) => {
    return {
        type: SAVE_TEAM_MEMBERS,
        members
    }
}

export const fetchMyTeamRequestAction = () => {
    return {
        type: FETCH_MY_TEAM_REQUESTS,
    }
}

export const saveMyTeamRequestAction = (requests) => {
    return {
        type: SAVE_MY_TEAM_REQUESTS,
        requests
    }
}