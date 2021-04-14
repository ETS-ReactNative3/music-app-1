// import { take, call, put, select } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosInstance } from '../../utils/api';
import history from '../../utils/history';
import { saveTeamsAction, showProgressAction } from './actions';
import { ADD_TEAM, FETCH_TEAMS } from './constants';



function fetchTeamsAPI() {
  return axiosInstance().get('team');
}

function addTeamAPI(name) {
  return axiosInstance().post('team', {name})
}

function* fetchTeamsSaga() {
  try {
    yield call(fetchTeamsAPI);
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

// Individual exports for testing
export default function* teamSaga() {
  yield takeLatest(FETCH_TEAMS, fetchTeamsSaga);
  yield takeLatest(ADD_TEAM, addTeamSaga)
  
}
