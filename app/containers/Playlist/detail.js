import { connect } from 'react-redux';
import { compose } from 'redux';
import React, { memo, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import PaperCard from '../../components/PaperCard';
import { Col, Image, Row } from 'react-bootstrap';
import defaultImage from '../../images/default-image.png';
import ShareBox from '../../components/ShareBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { deleteSong, followPlayListAction, getPlaylist, getPopularPlaylistAction } from './actions';
import { makeSelectLoader, makeSelectPlaylist, makeSelectPopularPlaylist, makeSelectPopularPlaylistLoading } from './selectors';
import { handleSingleSong, handleSongPlaying, setSongs } from '../App/actions';
import { makeSelectCurrentSong } from '../App/selectors';
import PlaylistOptions from '../../components/PlaylistOptions';
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFilled } from '@fortawesome/free-solid-svg-icons';
import CarouselFront from '../../components/CarouselFront';
import './index.scss';
import { convertSecondsToTime } from '../../utils';

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
    followPlaylist,
    popularPlaylistLoading,
    popularPlaylist,
    getPopularPlaylist
  }) {
  useInjectReducer({ key: 'playlist', reducer });
  useInjectSaga({ key: 'playlist', saga });
  const { id } = useParams();

  useEffect(() => {
    getPlaylistAction(id);
    getPopularPlaylist();
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
                src={playlist.playlistSongs[0].song.albumSongs[0].album.artwork ? playlist.playlistSongs[0].song.albumSongs[0].album.artwork : defaultImage}
                alt="playlist image"
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
                <FontAwesomeIcon icon={faCircle} style={{ fontSize: "5px" }} />
                <small className="px-1">{playlist.playlistSongs.length} songs</small>
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
              {!playlist.myPlaylist &&
              <div onClick={() => followPlaylist(playlist.id, !playlist.likedPlaylist)}>
                {playlist.likedPlaylist ?
                  <FontAwesomeIcon className="followed_heart_icon" icon={faHeartFilled} color={PLAY_ICON_BG_COLOR}
                                   size='lg'/>
                  :
                  <div className="heart_icon">
                    <FontAwesomeIcon icon={faHeart} size='lg'/>
                  </div>}
              </div>
              }
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
                      <span className="song-duration px-4">{ele.song.duration ? convertSecondsToTime(ele.song.duration) : '00:00'}</span>
                      <PlaylistOptions remove={() => removeSong(ele.song.id)} />
                    </div>
                  </div>
                ))}
              </section>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <CarouselFront
              type={'playlist'}
                list={popularPlaylist}
                loading={popularPlaylistLoading}
                heading="Recommended For You"
                classes="carousel-front py-5"
              />
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

  popularPlaylist: makeSelectPopularPlaylist(),
  popularPlaylistLoading: makeSelectPopularPlaylistLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    getPlaylistAction: id => dispatch(getPlaylist(id)),
    onHandleSongPlaying: status => dispatch(handleSongPlaying(status)),
    setSongsAction: songs => dispatch(setSongs(songs)),
    onHandleSingleSong: (index, status) => dispatch(handleSingleSong(index, status)),
    deleteSongAction: (id, songId) => dispatch(deleteSong(id, songId)),
    followPlaylist: (id, like) => dispatch(followPlayListAction(id, like)),
    getPopularPlaylist: () => dispatch(getPopularPlaylistAction()),

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
