import {connect} from 'react-redux';
import {compose} from 'redux';
import React, {memo, useEffect} from 'react';
import {createStructuredSelector} from 'reselect';
import {useParams} from 'react-router-dom';
import moment from 'moment';
import PaperCard from '../../components/PaperCard';
import {Col, Image, Row} from 'react-bootstrap';
import defaultImage from '../../images/album-3.jpg';
import ShareBox from '../../components/ShareBox';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPauseCircle, faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import {useInjectReducer} from '../../utils/injectReducer';
import {useInjectSaga} from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {deleteSong, getPlaylist} from './actions';
import {makeSelectLoader, makeSelectPlaylist} from './selectors';
import {PLAY_ICON_BG_COLOR} from '../../utils/constants';
import {handleSingleSong, handleSongPlaying, setSongs} from '../App/actions';
import {makeSelectCurrentSong} from '../App/selectors';
import PlaylistOptions from '../../components/PlaylistOptions';
import LoadingIndicator from '../../components/LoadingIndicator';

function Detail(
  {
    getPlaylistAction,
    playlist,
    loader,
    onHandleSongPlaying,
    onHandleSingleSong,
    currentSong,
    setSongsAction,
    deleteSongAction,
  }) {
  useInjectReducer({key: 'playlist', reducer});
  useInjectSaga({key: 'playlist', saga});
  const {id} = useParams();

  useEffect(() => {
    getPlaylistAction(id);
  }, [id]);

  const playAllSongsHandler = () => {
    setSongsAction(playlist.playlistSongs);
    onHandleSingleSong(playlist.playlistSongs[0].songId, !currentSong.playing);
  };

  const singleSongHandler = songId => {
    setSongsAction(playlist.playlistSongs);
    const status = currentSong.songData.id === songId ? !currentSong.playing : true;
    onHandleSingleSong(songId, status);
  };

  const removeSong = songId => {
    deleteSongAction(id, songId);
  };

  return (
    <>
      {playlist && (
        <PaperCard title="PlayList">
          <Row className="mt-4">
            <Col md={7} lg={8} xl={9}>
              <div className="d-flex align-items-center">
                {playlist.playlistSongs.length > 0 ? <Image
                    width={150}
                    height={150}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = defaultImage;
                    }}
                    src={playlist.playlistSongs[0].song.artwork ? playlist.playlistSongs[0].song.artwork : defaultImage}
                    alt=""
                    roundedCircle
                  /> :
                  <Image
                    width={150}
                    height={150}
                    onError={e => {
                      e.target.onerror = null;
                      e.target.src = defaultImage;
                    }}
                    src={defaultImage}
                    alt=""
                    roundedCircle
                  />
                }
                <div className="ml-3">
                  <div className="d-flex align-items-center">
                    {playlist.title}
                    <span className="ml-2">
                      <ShareBox/>
                    </span>
                  </div>
                  <small className="text-muted d-block">
                    {moment(playlist.createdDate).format('YYYY-MM-DD')}
                  </small>
                  <small className="text-muted d-block">
                    Songs: {playlist.playlistSongs.length}
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
                {playlist.playlistSongs.map((ele, index) => (
                  <div
                    className="row border-bottom blick-border border-top-0 border-right-0 border-left-0 align-items-center songs-ul py-2"
                    key={index}
                  >
                    <div className="song-number pr-3 col-md-1">
                      {`0${index + 1}`.slice(-2)}
                    </div>
                    <div className="song-title px-2 col-md-5">
                      <h5>{ele.song.title}</h5>
                      <h6>{ele.song.description}</h6>
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
                    <div className="dot-box ml-auto">
                      <PlaylistOptions remove={() => removeSong(ele.song.id)}/>
                    </div>
                  </div>
                ))}
              </section>
            </Col>
          </Row>
        </PaperCard>
      )}
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  playlist: makeSelectPlaylist(),
  loader: makeSelectLoader(),
  currentSong: makeSelectCurrentSong(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPlaylistAction: id => dispatch(getPlaylist(id)),
    onHandleSongPlaying: status => dispatch(handleSongPlaying(status)),
    setSongsAction: songs => dispatch(setSongs(songs)),
    onHandleSingleSong: (index, status) =>
      dispatch(handleSingleSong(index, status)),
    deleteSongAction: (id, songId) => dispatch(deleteSong(id, songId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Detail);
