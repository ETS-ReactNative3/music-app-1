import { call, put, takeLatest } from "@redux-saga/core/effects";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/api";
import { saveUsersAction } from "./actions";
import { BLOCK_USER, FETCH_USERS } from "./constant";

function fetchUsersApi(page, limit) {
    return axiosInstance().get(`/admin/all-users?page=${page}&limit=${limit}`)
}

function blockUserApi(userId) {
    return axiosInstance().get(`/admin/block-user/${userId}`);
}

function* fetchUsersSaga(action) {
    try {

        const { page, limit } = action;
        const response = yield call(fetchUsersApi, page, limit);
        if (response) {
            console.log(response.data);
            yield put(saveUsersAction(response.data));
        }
    } catch (e) {
        console.log(e)
        toast.error(e.message)
    }
}


function* blockUserSaga(action) {
    try {
        const {userId, page, limit } = action;
        yield call(blockUserApi, userId);
        toast.success('User blocked');
        const response = yield call(fetchUsersApi, page, limit);
        if (response) {
            console.log(response.data);
            yield put(saveUsersAction(response.data));
        }
    } catch(e) {
        toast.error('Failed to block user');
    }
}
export default function* adminUsersSaga() {
    yield takeLatest(FETCH_USERS, fetchUsersSaga);
    yield takeLatest(BLOCK_USER, blockUserSaga);
}
