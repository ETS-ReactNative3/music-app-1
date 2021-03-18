import { call, put, takeLatest } from "@redux-saga/core/effects";
import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/api";
import { fetchAlbumAction, saveAlbumAction } from "./action";
import { FETCH_ALBUMS, MAKE_ALBUM_FEATURED } from "./contant";

function fetchAlbumAPI(page, limit) {
    return axiosInstance().get(`admin/published-albums?page=${page}&limit=${limit}`)
}

function makeAlbumFeaturedAPI(albumId, featured) {
    return axiosInstance().put(`admin/feature-album/${albumId}`)
}

function* fetchAlbumSaga(action) {
    try {
        const {page, limit} = action;
        const response = yield call(fetchAlbumAPI, page, limit);
        yield put(saveAlbumAction(response.data));

    } catch(e) {
        toast.error('Failed to fetch albums');
    }
}

function* makeAlbumFeaturedSaga(action) {
    try {
        const {albumId, page, limit, featured} = action;
        yield call(makeAlbumFeaturedAPI, albumId, !featured)
        yield put(fetchAlbumAction(page-1, limit));
    } catch(e) {
        toast.error('Failed in album transition')
    }
}

export default function* adminSaga() {
    yield takeLatest(FETCH_ALBUMS, fetchAlbumSaga)
    yield takeLatest(MAKE_ALBUM_FEATURED, makeAlbumFeaturedSaga)
}