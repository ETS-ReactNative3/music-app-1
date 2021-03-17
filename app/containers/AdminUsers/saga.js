import { call, put, takeLatest } from "@redux-saga/core/effects";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/api";
import { saveUsersAction, saveUsersCountAction } from "./actions";
import { ADD_CREDITS, BLOCK_USER, FETCH_USERS } from "./constant";
import history from '../../utils/history';


function fetchUsersApi(page, limit) {
    return axiosInstance().get(`/admin/all-users?page=${page}&limit=${limit}`)
}

function blockUserApi(userId, block) {
    return axiosInstance().post(`/admin/block-user/${userId}`);
}

function addCreditsApi(data) {
    return axiosInstance().post(`/admin/add-credit`, data);
}

function* fetchUsersSaga(action) {
    try {

        const { page, limit } = action;
        const response = yield call(fetchUsersApi, page, limit);
        if (response) {
            yield put(saveUsersAction(response.data.users));
            yield put(saveUsersCountAction(response.data.usersCount));
        }
    } catch (e) {
        toast.error(e.message)
    }
}


function* blockUserSaga(action) {
    try {
        const {userId, page, limit, block } = action;
        yield call(blockUserApi, userId, block);
        toast.success('User blocked');
        const response = yield call(fetchUsersApi, page, limit);
        if (response) {
            yield put(saveUsersAction(response.data.users));
            yield put(saveUsersCountAction(response.data.usersCount));
        }
    } catch(e) {
        toast.error('Failed to block user');
    }
}

function* addCreditsSaga(action) {
    try {
        const {userId, credits, page, limit} = action;
        yield call(addCreditsApi, {userId, amount: credits})
        toast.success('Credits added successfully')
        const response = yield call(fetchUsersApi, page, limit);
        if (response) {
            yield put(saveUsersAction(response.data.users));
            yield put(saveUsersCountAction(response.data.usersCount));
        }
    } catch(e) {
        toast.error("Failed to add credits")
    }
}
export default function* adminUsersSaga() {
    yield takeLatest(FETCH_USERS, fetchUsersSaga);
    yield takeLatest(BLOCK_USER, blockUserSaga);
    yield takeLatest(ADD_CREDITS, addCreditsSaga)
}
