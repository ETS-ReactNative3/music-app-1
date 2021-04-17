// import { take, call, put, select } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosInstance } from '../../utils/api';
import history from '../../utils/history';
import { saveTeamsAction, showProgressAction, saveTeamDetailsAction,fetchTeamMembersAction, saveTeamNameSuccessAction, saveTeamMemberSuccessAction, saveTeamMemberErrorAction, savePendingInvitesAction, fetchPendingInvitesAction, saveTeamMembersAction, saveMyTeamRequestAction } from './actions';
import { ADD_TEAM, CANCEL_PENDING_REQUEST, FETCH_MY_TEAM_REQUESTS, FETCH_PENDING_INVITES, FETCH_TEAMS, FETCH_TEAM_DETAILS, FETCH_TEAM_MEMBERS, REQUEST_ACTION, SAVE_TEAM_MEMBER, SAVE_TEAM_NAME } from './constants';



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

function fetchInvitesAPI(teamId) {
  return axiosInstance().get(`team/pending/${teamId}`)
}

function fetchTeamMembersAPI(teamId) {
  return axiosInstance().get(`team/members/${teamId}`)
}

function fetchMyTeamRequest() {
  return axiosInstance().get(`team/invite/requests`)
}

function requestActionAPI(teamsId, accepted) {
  return axiosInstance().post('team/request/action', {teamsId, accepted})
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

    yield put(fetchPendingInvitesAction(id))
    yield put(fetchTeamMembersAction(id))
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
    toast.success("Invitation sent")
  } catch (e) {
    toast.error("Failed to add member")
    yield put(saveTeamMemberErrorAction())
  }
}

function* fetchPendingInvitesSaga(action) {
  try{
    const {teamId} = action;
    const result = yield call(fetchInvitesAPI, teamId);
    yield put(savePendingInvitesAction(result.data));
  }catch(e){  
    toast.error('Error in fetching pending invites');

  }
}

function* cancelPendingRequestSaga(action) {
  try {
    const {email} = action;
    
  } catch (e) {
    toast.error('Cannot able to cancel request');
  }
}

function* fetchTeamMembersSaga(action) {
  try {
    const {teamId} = action;
    const result = yield call(fetchTeamMembersAPI, teamId);
    yield put(saveTeamMembersAction(result.data))
  } catch (e) {
    toast.error('Failed to fetch team members');
  }
}

function* fetchMyTeamRequestSaga() {
  try {
    const result = yield call(fetchMyTeamRequest);
    yield put(saveMyTeamRequestAction(result.data))
    yield put(showProgressAction(false));
  } catch (e) {
    toast.error('Failed to fetch request')
    yield put(showProgressAction(false));
  }
}

function* requestActionSaga(action) {
  const {teamsId, accepted} = action;
  try {
    yield call(requestActionAPI, teamsId, accepted);
    if (accepted) toast.success('Request accepted, you in team');
    else toast.success('Request declined');
  } catch (e) {
    if (accepted) toast.error('Unable to accept request');
    else toast.error('Unable to decline request');
  }
}
// Individual exports for testing
export default function* teamSaga() {
  yield takeLatest(FETCH_TEAMS, fetchTeamsSaga);
  yield takeLatest(ADD_TEAM, addTeamSaga);
  yield takeLatest(FETCH_TEAM_DETAILS, fetchTeamDetailsSaga);
  yield takeLatest(SAVE_TEAM_NAME, saveTeamNameSaga);
  yield takeLatest(SAVE_TEAM_MEMBER, saveTeamMemberSaga);
  yield takeLatest(FETCH_PENDING_INVITES, fetchPendingInvitesSaga);
  yield takeLatest(CANCEL_PENDING_REQUEST, cancelPendingRequestSaga);
  yield takeLatest(FETCH_TEAM_MEMBERS, fetchTeamMembersSaga),
  yield takeLatest(FETCH_MY_TEAM_REQUESTS, fetchMyTeamRequestSaga);
  yield takeLatest(REQUEST_ACTION, requestActionSaga);
}
