import {connect} from 'react-redux';
import {compose} from 'redux';
import React, {memo, useEffect} from 'react';
import {createStructuredSelector} from 'reselect';
import {useParams} from 'react-router-dom';
import moment from 'moment';
import PaperCard from '../../components/PaperCard';
import {Col, Image, Row} from 'react-bootstrap';
import defaultImage from '../../images/default-image.png';
import ShareBox from '../../components/ShareBox';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle, faPause, faPlay} from '@fortawesome/free-solid-svg-icons';
import {useInjectReducer} from '../../utils/injectReducer';
import {useInjectSaga} from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {deleteSong, getPlaylist} from './actions';
import {makeSelectLoader, makeSelectPlaylist} from './selectors';
import {handleSingleSong, handleSongPlaying, setSongs} from '../App/actions';
import {makeSelectCurrentSong} from '../App/selectors';
import PlaylistOptions from '../../components/PlaylistOptions';

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
        <PaperCard>
          <div className="row d-flex align-items-end">
            <div className="col-3">
              {playlist.playlistSongs.length > 0 ? <Image
                  width={230}
                  height={230}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  src={playlist.playlistSongs[0].song.artwork ? playlist.playlistSongs[0].song.artwork : defaultImage}
                  alt=""
                /> :
                <Image
                  width={230}
                  height={230}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  src={defaultImage}
                  alt=""
                />
              }
            </div>
            <div className="col-9 px-0">
              <div className="py-2">
                <h6 className="py-2">PLAYLIST</h6>
                <h1>{playlist.title}</h1>
              </div>
              <div className="text-muted d-flex align-items-center">
                <small className="px-1">{moment(playlist.createdDate).format('MMM YYYY')}</small>
                <FontAwesomeIcon icon={faCircle} style={{fontSize: "5px"}}/>
                <small className="px-1">{playlist.playlistSongs.length} songs</small>
              </div>
            </div>
          </div>
          <div className="row py-4">
            <div className="col-12 d-flex align-items-center">
                <span
                  onClick={playAllSongsHandler}
                  className="btn btn-success rounded-pill cursor-pointer"
                >
                  {currentSong.playing ? 'Pause' : 'Play All'}
                </span>
              <ShareBox/>
            </div>
          </div>
          <Row>
            <Col md={12}>
              <section className="py-5">
                {playlist.playlistSongs.map((ele, index) => (
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
