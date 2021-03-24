import { call, put, takeLatest } from "@redux-saga/core/effects";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/api";
import { onErrorBrowseData, saveAlbumsAction, saveBrowseDataAction } from "./actions";
import { FETCH_ALBUMS, FETCH_BROWSE_DATA } from "./constants";

function fetchBrowseDataApi() {
    return axiosInstance().get('albums/browse');
}

function fetchAlbumsGenres(page, limit, id) {
    return axiosInstance().get(`albums/genre/${id}?page=${page}&limit=${limit}`)
}


function fetchAlbumsMoods(page, limit, id) {
    return axiosInstance().get(`albums/mood/${id}?page=${page}&limit=${limit}`)
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

function* fetchAlbumsSaga(action) {
    try {
        const {browseType, page, limit, id} = action;
        if (browseType === 'genre') {
            const response = yield call(fetchAlbumsGenres, page, limit, id)
            if (response) {
                yield put(saveAlbumsAction(response.data.albums))
            }
        } else {
            const response = yield call(fetchAlbumsMoods, page, limit, id)
            if (response) {
                yield put(saveAlbumsAction(response.data.albums))
            }
        }
    } catch (e) {
        toast.error(e);
    }
}

export default function* browseSaga() {
    yield takeLatest(FETCH_BROWSE_DATA, fetchBrowseDataSaga)
    yield takeLatest(FETCH_ALBUMS, fetchAlbumsSaga)
}