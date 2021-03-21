import { call, put, takeLatest } from "@redux-saga/core/effects";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/api";
import { onErrorBrowseData, saveBrowseDataAction } from "./actions";
import { FETCH_BROWSE_DATA } from "./constants";

function fetchBrowseDataApi() {
    return axiosInstance().get('albums/browse');
}

function* fetchBrowseDataSaga() {
    try {
        const response = yield call(fetchBrowseDataApi);
        if(response) {
            yield put(saveBrowseDataAction(response.data))
        }
    } catch (e) {
        yield put(onErrorBrowseData())
        toast.error(e);
    }
}

export default function* browseSaga() {
    yield takeLatest(FETCH_BROWSE_DATA, fetchBrowseDataSaga)
}