import { ADD_TEAM, FETCH_TEAMS, SHOW_PROGRESS } from "./constants"

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