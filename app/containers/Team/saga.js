// import { take, call, put, select } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosInstance } from '../../utils/api';
import history from '../../utils/history';
import { saveTeamsAction, showProgressAction, saveTeamDetailsAction, saveTeamNameSuccessAction, saveTeamMemberSuccessAction, saveTeamMemberErrorAction } from './actions';
import { ADD_TEAM, FETCH_TEAMS, FETCH_TEAM_DETAILS, SAVE_TEAM_MEMBER, SAVE_TEAM_NAME } from './constants';



function fetchTeamsAPI() {
  return axiosInstance().get('team');
}

function addTeamAPI(name) {
  return axiosInstance().post('team', {name})
}

function fetchTeamDetailsAPI(id) {
  return axiosInstance().get(`team/${id}`)
}

function saveTeamNameAPI(id, name) {
  // return axiosInstance().get(`team/${id}`)
}

function inviteTeamMemberAPI(id, email) {
  return axiosInstance().post(`team/invite`, {teamsId: id, email})
}

function* fetchTeamsSaga() {
  try {
    const result = yield call(fetchTeamsAPI);
    yield put(saveTeamsAction(result.data));
  } catch (e) {
    toast.error(e.message);
    yield put(showProgressAction(false));
  }
}

function* addTeamSaga(action) {
  try {
    const {name} = action;
    yield call(addTeamAPI, name);
    toast.success('Team Added');
    history.goBack()
    yield put(showProgressAction(false))
  } catch (e) {
    toast.error('Error in adding team');
    yield put(showProgressAction(false))
  }
}

function* fetchTeamDetailsSaga(action) {
  try {
    const {id} = action;
    const result = yield call(fetchTeamDetailsAPI, id);
    yield put(saveTeamDetailsAction(result.data))
    yield put(showProgressAction(false))
  } catch (e) {
    toast.error('Failed to fetch details');
    yield put(showProgressAction(false))
  
  }
}

function* saveTeamNameSaga(action) {
  try {
    const {id, name} = action;
    yield call(saveTeamNameAPI, id, name);
    yield put(saveTeamNameSuccessAction())
  } catch (e) {
    toast.error("Error in saving name");
    yield put(saveTeamNameErrorAction())
  }
}

function* saveTeamMemberSaga(action) {
  try {
    const {teamId, email} = action;
    yield call(inviteTeamMemberAPI, teamId, email);
    yield put(saveTeamMemberSuccessAction())
  } catch (e) {
    toast.error("Failed to add member")
    yield put(saveTeamMemberErrorAction())
  }
}

// Individual exports for testing
export default function* teamSaga() {
  yield takeLatest(FETCH_TEAMS, fetchTeamsSaga);
  yield takeLatest(ADD_TEAM, addTeamSaga);
  yield takeLatest(FETCH_TEAM_DETAILS, fetchTeamDetailsSaga);
  yield takeLatest(SAVE_TEAM_NAME, saveTeamNameSaga);
  yield takeLatest(SAVE_TEAM_MEMBER, saveTeamMemberSaga)
  
}
