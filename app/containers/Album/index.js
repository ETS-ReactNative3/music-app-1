import React, {memo, useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {faPlayCircle, faPauseCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PaperCard from '../../components/PaperCard';
import {Col, Image, Row, Tooltip, OverlayTrigger} from 'react-bootstrap';
import moment from 'moment';
import {
  makeSelectRecommended,
  makeSelectWeeklyTop,
  makeSelectPlaylist,
  makeSelectCurrentSong,
  makeSelectRole,
} from '../App/selectors';
import {handleSongPlaying, handleSingleSong} from '../App/actions';
import {
  createPlaylistandAddSong,
  getMyPlaylist,
  addSongIntoPlaylist,
} from '../Playlist/actions';
import {makeSelectPlaylists} from '../Playlist/selectors';
import reducer from './reducer';
import saga from './saga';
import reducerPlaylist from '../Playlist/reducer';
import sagaPlaylist from '../Playlist/saga';
import globalReducer from '../HomePage/reducer';
import globalSaga from '../HomePage/saga';
import {useInjectReducer} from '../../utils/injectReducer';
import {useInjectSaga} from '../../utils/injectSaga';
import {PLAY_ICON_BG_COLOR} from '../../utils/constants';
import './index.scss';
import ShareBox from '../../components/ShareBox';
import SongsOptionsBox from '../../components/SongsOptionsBox';
import CarouselFront from '../../components/CarouselFront';
import {useLocation, useParams} from 'react-router-dom';
import {loadAlbum} from './actions';
import {makeSelectAlbum, makeSelectAlbumLoader} from './selectors';
import LoadingIndicator from '../../components/LoadingIndicator';
import {getNewReleases} from "../HomePage/actions";
import {makeSelectNewReleaseLoading, makeSelectNewReleases} from "../HomePage/selectors";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const key = 'album';

const Album = props => {
  useInjectReducer({key, reducer});
  useInjectSaga({key, saga});
  useInjectReducer({key: 'playlist', reducer: reducerPlaylist});
  useInjectSaga({key: 'playlist', saga: sagaPlaylist});
  useInjectReducer({key: 'home', reducer: globalReducer});
  useInjectSaga({key: 'home', saga: globalSaga});

  const {slug} = useParams();
  const query = useQuery();

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
    newReleasesLoading
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
    onHandleSingleSong(playlist[0].songId, !currentSong.playing);
    onHandleSongPlaying(!currentSong.playing);
  };

  const singleSongHandler = songId => {
    const status = currentSong.songData.id === songId ? !currentSong.playing : true;
    onHandleSingleSong(songId, status);
  };

  return (
    <>
      {loader || !albumInfo ? (
        <LoadingIndicator/>
      ) : (
        <>
          <PaperCard title={albumInfo.title}>
            <Row>
              <Col md={7} lg={8} xl={9}>
                <div className="d-flex align-items-center">
                  <Image
                    width={150}
                    height={150}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = defaultImage;
                    }}
                    src={albumInfo.artwork}
                    alt=""
                    roundedCircle
                  />
                  <div className="ml-3">
                    <div className="d-flex align-items-center">
                      {albumInfo.caption}
                      <span className="ml-2">
                        <ShareBox/>
                      </span>
                    </div>
                    <small className="text-muted d-block">
                      {moment(albumInfo.releaseDate).format('YYYY-MM-DD')}
                    </small>
                    <small className="text-muted d-block">
                      Songs: {albumInfo.albumSongs.length}
                    </small>
                    <span
                      onClick={playAllSongsHandler}
                      className="mt-2 btn btn-warning btn-sm rounded-pill cursor-pointer"
                    >
                      {currentSong.playing ? 'Pause' : 'Play All'}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <section className="py-5">
                  {albumInfo.albumSongs.map((ele, index) => (
                    <div
                      className="row border-bottom blick-border border-top-0 border-right-0 border-left-0 align-items-center songs-ul py-2"
                      id={`songNumber${ele.song.id}`}
                      key={index}
                    >
                      <div className="song-number pr-3 col-md-1">
                        {`0${index + 1}`.slice(-2)}
                      </div>
                      <div className="song-title px-2 col-md-5">
                        <OverlayTrigger
                          placement="top"
                          delay={{show: 250, hide: 400}}
                          overlay={<Tooltip id={`button-tooltip-${index}`}>{ele.song.title}</Tooltip>}
                        >
                          <h5>{ele.song.title}</h5>
                        </OverlayTrigger>
                      </div>
                      <div className="song-duration px-2">4:25</div>
                      <div className="song-action px-2">
                        <span
                          onClick={() => singleSongHandler(ele.song.id)}
                          className="cursor-pointer"
                        >
                          <FontAwesomeIcon
                            size="3x"
                            color={PLAY_ICON_BG_COLOR}
                            icon={
                              currentSong.songData.id === ele.song.id &&
                              currentSong.playing
                                ? faPauseCircle
                                : faPlayCircle
                            }
                          />
                        </span>
                      </div>
                      {role && (
                        <div className="dot-box ml-auto">
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
                        </div>
                      )}
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
