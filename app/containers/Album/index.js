import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { faPlay, faPause, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PaperCard from '../../components/PaperCard';
import { Col, Image, Row } from 'react-bootstrap';
import moment from 'moment';
import {
  makeSelectRecommended,
  makeSelectWeeklyTop,
  makeSelectPlaylist,
  makeSelectCurrentSong,
  makeSelectRole,
  makeSelectUserDetails,
} from '../App/selectors';
import { handleSongPlaying, handleSingleSong, setPlaylist } from '../App/actions';
import {
  createPlaylistandAddSong,
  getMyPlaylist,
  addSongIntoPlaylist,
} from '../Playlist/actions';
import { makeSelectPlaylists } from '../Playlist/selectors';
import reducer from './reducer';
import saga from './saga';
import reducerPlaylist from '../Playlist/reducer';
import sagaPlaylist from '../Playlist/saga';
import globalReducer from '../HomePage/reducer';
import globalSaga from '../HomePage/saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import ShareBox from '../../components/ShareBox';
import SongsOptionsBox from '../../components/SongsOptionsBox';
import CarouselFront from '../../components/CarouselFront';
import { useLocation, useParams } from 'react-router-dom';
import { followAlbumAction, loadAlbum } from './actions';
import { makeSelectAlbum, makeSelectAlbumLoader } from './selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getNewReleases } from "../HomePage/actions";
import { makeSelectNewReleaseLoading, makeSelectNewReleases } from "../HomePage/selectors";
import defaultImage from '../../images/default-image.png'
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';
import {useHistory} from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const key = 'album';

const Album = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useInjectReducer({ key: 'playlist', reducer: reducerPlaylist });
  useInjectSaga({ key: 'playlist', saga: sagaPlaylist });
  useInjectReducer({ key: 'home', reducer: globalReducer });
  useInjectSaga({ key: 'home', saga: globalSaga });

  const { slug } = useParams();
  const query = useQuery();
const history = useHistory();
  const {
    newReleases,
    onLoadAlbum,
    albumInfo,
    currentSong,
    onHandleSongPlaying,
    onHandleSingleSong,
    createPlaylistandAddSongAction,
    getMyPlaylistAction,
    addSongIntoPlaylistAction,
    playlists,
    playlist,
    loader,
    role,
    getNewReleasesAction,
    newReleasesLoading,
    setPlaylistAction,
    followAlbum,
    userDetails
  } = props;

  useEffect(() => {
    onLoadAlbum(slug);
    getNewReleasesAction();
  }, [slug]);

  useEffect(() => {
    if (query.get("songId") && playlist.length > 0) {
      document.getElementById(`songNumber${query.get("songId")}`).classList.add('highLightSong')
    }
  }, [query]);

  const playAllSongsHandler = () => {
    setPlaylistAction(albumInfo.albumSongs)
    onHandleSingleSong(playlist[0].song.id, !currentSong.playing);
    onHandleSongPlaying(!currentSong.playing);
  };

  const singleSongHandler = songId => {
    setPlaylistAction(albumInfo.albumSongs)
    const status = currentSong.songData.id === songId ? !currentSong.playing : true;
    onHandleSingleSong(songId, status);
  };

  return (
    <>
      {loader || !albumInfo ? (
        <LoadingIndicator />
      ) : (
          <>
            <PaperCard>
              <div className="row d-flex align-items-end">
                <div className="col-3">
                  <Image
                    width={230}
                    height={230}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = defaultImage;
                    }}
                    src={albumInfo.artwork}
                    alt="album-image"
                  />
                </div>
                <div className="col-9 px-0">
                  <div className="py-2">
                    <h6 className="py-2">ALBUM</h6>
                    <h1>{albumInfo.title}</h1>
                    <h6>{albumInfo.caption}</h6>
                  </div>
                  <div className="text-muted d-flex align-items-center">
                    <Image
                      width={24}
                      height={24}
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
                      src={albumInfo.user.avatar}
                      alt="album-image"
                      roundedCircle
                    />
                    <small className="px-1">{albumInfo.user.name}</small>
                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: "5px" }} />
                    <small className="px-1">{moment(albumInfo.releaseDate).format('MMM YYYY')}</small>
                    <FontAwesomeIcon icon={faCircle} style={{ fontSize: "5px" }} />
                    <small className="px-1">{albumInfo.albumSongs.length} songs</small>
                  </div>
                </div>
              </div>

              <div className="row py-4">
                <div className="col-12 d-flex align-items-center">
                  <span
                    onClick={playAllSongsHandler}
                    className="btn btn-success rounded-pill cursor-pointer px-4"
                  >
                    {currentSong.playing ? 'Pause' : 'Play All'}
                  </span>
                  <ShareBox />
                  <div onClick={() => (userDetails && Object.keys(userDetails).length > 0) ? followAlbum(albumInfo.id, !albumInfo.albumLiked, slug) : history.push('/auth/login')}>
                    {albumInfo.albumLiked ?
                      <FontAwesomeIcon className="followed_heart_icon" icon={faHeartFilled} color={PLAY_ICON_BG_COLOR} size='2x' />
                      :
                      <div className="heart_icon">
                        <FontAwesomeIcon icon={faHeart} size='2x' />
                      </div>}
                  </div>
                </div>
              </div>
              <Row>
                <Col md={12}>
                  <section>
                    {albumInfo.albumSongs.map((ele, index) => (
                      <div
                        className="row song-row align-content-center py-3"
                        id={`songNumber${ele.song.id}`}
                        key={index}
                      >
                        <div className="col-10">
                          <span className="song-number pr-3">{index + 1}</span>
                          <span
                            onClick={() => singleSongHandler(ele.song.id)}
                            className="cursor-pointer px-3"
                          >
                            <FontAwesomeIcon
                              icon={
                                currentSong.songData.id === ele.song.id &&
                                  currentSong.playing
                                  ? faPause
                                  : faPlay
                              }
                            />
                          </span>
                          <h5 className="song-title d-inline">{ele.song.title}</h5>
                        </div>
                        <div className="col-2 d-flex justify-content-center align-items-center">
                          <span className="song-duration px-4">4:25</span>
                          {role && (
                            <SongsOptionsBox
                              songId={ele.song.id}
                              playlists={playlists}
                              getMyPlaylistAction={getMyPlaylistAction}
                              createPlaylistandAddSongAction={
                                createPlaylistandAddSongAction
                              }
                              addSongIntoPlaylistAction={
                                addSongIntoPlaylistAction
                              }
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </section>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <CarouselFront
                    list={newReleases}
                    loading={newReleasesLoading}
                    heading="Recommended For You"
                    clasess="carousel-front py-5"
                  />
                </Col>
              </Row>
            </PaperCard>
          </>
        )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  recommended: makeSelectRecommended(),
  weeklyTop: makeSelectWeeklyTop(),
  albumInfo: makeSelectAlbum(),
  loader: makeSelectAlbumLoader(),
  playlist: makeSelectPlaylist(),
  currentSong: makeSelectCurrentSong(),
  playlists: makeSelectPlaylists(),
  role: makeSelectRole(),
  newReleasesLoading: makeSelectNewReleaseLoading(),
  newReleases: makeSelectNewReleases(),
  userDetails: makeSelectUserDetails()
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadAlbum: slug => dispatch(loadAlbum(slug)),
    onHandleSongPlaying: status => dispatch(handleSongPlaying(status)),
    createPlaylistandAddSongAction: data =>
      dispatch(createPlaylistandAddSong(data)),
    getMyPlaylistAction: () => dispatch(getMyPlaylist()),
    addSongIntoPlaylistAction: data => dispatch(addSongIntoPlaylist(data)),
    onHandleSingleSong: (index, status) =>
      dispatch(handleSingleSong(index, status)),
    getNewReleasesAction: () => dispatch(getNewReleases()),
    setPlaylistAction: (songs) => dispatch(setPlaylist(songs)),
    followAlbum: (albumId, like, albumSlug) => dispatch(followAlbumAction(albumId, like, albumSlug))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Album);
