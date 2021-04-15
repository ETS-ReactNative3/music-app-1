import { ADD_TEAM, FETCH_TEAMS, SHOW_PROGRESS,SAVE_TEAMS, FETCH_TEAM_DETAILS, SAVE_TEAM_DETAILS, SAVE_TEAM_NAME, SAVE_TEAM_NAME_ERROR, SAVE_TEAM_NAME_SUCCESS, SAVE_TEAM_MEMBER, SAVE_TEAM_MEMBER_ERROR, SAVE_TEAM_MEMBER_SUCCESS } from "./constants"

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
