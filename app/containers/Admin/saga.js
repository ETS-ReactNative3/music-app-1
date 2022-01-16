import {call, put, takeLatest} from "@redux-saga/core/effects";
import {toast} from "react-toastify";
import {axiosInstance} from "../../utils/api";
import {
  fetchAlbumAction,
  onErrorDisputedCampaignsAction,
  saveAlbumAction,
  saveAlbumsCountAction,
  saveDisputedCampaignAction,
  saveInfluencerDataAction,
  saveUsersAction,
  saveUsersCountAction
} from "./action";
import {
  ADD_CREDITS,
  BLOCK_USER, CREATE_WALLET,
  FETCH_ALBUMS,
  FETCH_DISPUTED_CAMPAIGNS,
  FETCH_USERS,
  MAKE_ALBUM_FEATURED, USER_DETAILS
} from "./contant";

function fetchAlbumAPI(page, limit) {
  return axiosInstance().get(`admin/published-albums?page=${page}&limit=${limit}`)
}

function makeAlbumFeaturedAPI(albumId, featured) {
  return axiosInstance().put(`admin/feature-album/`, {
    id: albumId,
    featured
  })
}

function fetchUsersApi(page, limit) {
  return axiosInstance().get(`/admin/all-users?page=${page}&limit=${limit}`)
}

function fetchDisputedCampaignAPI(page, limit) {
  return axiosInstance().get(`admin/campaigns/disputed`)
}

function blockUserApi(userId, block) {
  return axiosInstance().put(`/admin/block-user/`, {
    id: userId,
    block
  });
}

function addCreditsApi(data) {
  return axiosInstance().post(`/admin/add-credit`, data);
}

function createWalletApi(email) {
  return axiosInstance().post(`/admin/create/wallet`, {email});
}

function fetchInfluencerDetails(id) {
  return axiosInstance().get(`admin/user/details/${id}`)
}


function* fetchAlbumSaga(action) {
  try {
    const {page, limit} = action;
    const response = yield call(fetchAlbumAPI, page, limit);
    if (response && response.data) {
      yield put(saveAlbumAction(response.data.albums));
      yield put(saveAlbumsCountAction(response.data.albumCount));

    }
  } catch (e) {
    toast.error('Failed to fetch albums');
  }
}

function* makeAlbumFeaturedSaga(action) {
  try {
    const {albumId, page, limit, featured} = action;
    yield call(makeAlbumFeaturedAPI, albumId, featured)
    yield put(fetchAlbumAction(page - 1, limit));
  } catch (e) {
    toast.error('Failed in album transition')
  }
}


function* fetchUsersSaga(action) {
  try {
    const {page, limit} = action;
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
    const {userId, page, limit, block} = action;
    yield call(blockUserApi, userId, block);
    toast.success('User blocked');
    const response = yield call(fetchUsersApi, page - 1, limit);
    if (response) {
      yield put(saveUsersAction(response.data.users));
      yield put(saveUsersCountAction(response.data.usersCount));
    }
  } catch (e) {
    toast.error('Failed to block user');
  }
}

function* addCreditsSaga(action) {
  try {
    const {userId, credits, page, limit} = action;
    yield call(addCreditsApi, {userId, amount: credits})
    toast.success('Credits added successfully')
    const response = yield call(fetchUsersApi, page - 1, limit);
    if (response) {
      yield put(saveUsersAction(response.data.users));
      yield put(saveUsersCountAction(response.data.usersCount));
    }
  } catch (e) {
    toast.error("Failed to add credits")
  }
}

function* fetchDisputedCampaignsSaga(action) {

  try {
    const {page, limit} = action;
    const response = yield call(fetchDisputedCampaignAPI, page, limit);
    if (response) {
      yield put(saveDisputedCampaignAction(response.data));
    }
  } catch (e) {

    yield put(onErrorDisputedCampaignsAction())
    toast.error(e);
  }
}

function* postCreateWallet(action) {
  try {
    const {email} = action;
    const response = yield call(createWalletApi, email);
    toast.success('Wallet created successfully')
    if (response.data) {
      location.reload()
    }
  } catch (e) {
    toast.error("Create wallet operation failed")
  }
}

function* getInfluencerDetails(action) {
  try {
    const {id} = action;
    const response = yield call(fetchInfluencerDetails, id);
    if (response) {
      yield put(saveInfluencerDataAction(response.data));
    }
  } catch (e) {
    console.log(e)
    toast.error("Get influencer details operation failed")
  }
}

export default function* adminSaga() {
  yield takeLatest(FETCH_ALBUMS, fetchAlbumSaga)
  yield takeLatest(MAKE_ALBUM_FEATURED, makeAlbumFeaturedSaga)
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(BLOCK_USER, blockUserSaga);
  yield takeLatest(ADD_CREDITS, addCreditsSaga);
  yield takeLatest(FETCH_DISPUTED_CAMPAIGNS, fetchDisputedCampaignsSaga)
  yield takeLatest(CREATE_WALLET, postCreateWallet)
  yield takeLatest(USER_DETAILS, getInfluencerDetails)
}
