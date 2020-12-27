import {connect} from "react-redux";
import {compose} from "redux";
import React, {memo, useEffect} from "react";
import {createStructuredSelector} from "reselect";
import {useInjectReducer} from "../../utils/injectReducer";
import {useInjectSaga} from "../../utils/injectSaga";
import reducer from './reducer';
import saga from './saga';
import {useParams} from "react-router-dom";
import {getPlaylist} from "./actions";
import moment from "moment";
import {makeSelectLoader, makeSelectPlaylist} from "./selectors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PLAY_ICON_BG_COLOR} from "../../utils/constants";
import {faPauseCircle, faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import ShareBox from "../../components/ShareBox";
import {handleSingleSong, handleSongPlaying, setSongs} from "../App/actions";
import {makeSelectCurrentSong} from "../App/selectors";

function Detail(
  {
    getPlaylistAction,
    playlist,
    loader,
    onHandleSongPlaying,
    onHandleSingleSong,
    currentSong,
    setSongsAction
  }) {
  useInjectReducer({key: 'playlist', reducer});
  useInjectSaga({key: 'playlist', saga});
  const {id} = useParams();

  useEffect(() => {
    getPlaylistAction(id);
  }, [id]);

  const playAllSongsHandler = () => {
    const { playing } = currentSong;
    onHandleSongPlaying(!playing);
  };

  const singleSongHandler = index => {
    const songs = playlist.playlistSongs.map(item => item.song);
    setSongsAction(songs)
    const { playing, songIndex } = currentSong;
    const status = songIndex === index ? !playing : true;
    onHandleSingleSong(index, status);
  };

  const { playing, songIndex } = currentSong;

  return (
    <>
      <div className="container-fluid jumbotron-bg-inner">
        {playlist &&
        <>
          <div className="row album-detail">
            <div className="col-auto">
              {/*<div className="profile-img-box">*/}
              {/*  <img*/}
              {/*    src={albumInfo.artwork}*/}
              {/*    className="rounded-lg img-fluid"*/}
              {/*    alt=""*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
            <div className="col pt-3 pt-md-0">
              <div className="row">
                <div className="col">
                  <h1>{playlist.title}</h1>
                </div>
                <div className="col text-right">
                  {/*<ShareBox />*/}
                </div>
              </div>
              <div className="row flex-column">
                <div className="col">
                  Playlist | {moment(playlist.createdDate).format('YYYY-MM-DD')} |{' '}
                  {playlist.playlistSongs.length}
                </div>
                <div className="col mt-3">
                  {/*<span*/}
                  {/*  onClick={playAllSongsHandler}*/}
                  {/*  className="text-decoration-none bg-white text-dark px-4 py-2 rounded-pill text-center cursor-pointer"*/}
                  {/*>*/}
                  {/*  {playing ? 'Pause' : 'Play All'}*/}
                  {/*</span>*/}
                </div>
              </div>
            </div>
          </div>
          <section className="py-5">
            {playlist.playlistSongs.map((ele, index) => (
              <div
                className="d-flex border-bottom blick-border border-top-0 border-right-0 border-left-0 align-items-center songs-ul py-3"
                key={index}
              >
                <div className="song-number">{`0${index + 1}`.slice(-2)}</div>
                <div className="song-title px-2 min-w15">
                  <h5>{ele.song.title}</h5>
                  <h6>{ele.song.description}</h6>
                </div>
                <div className="song-duration px-2">4:25</div>
                <div className="song-action px-2">
                <span
                  onClick={() => singleSongHandler(index)}
                  className="cursor-pointer"
                >
                  <FontAwesomeIcon
                    size="3x"
                    color={PLAY_ICON_BG_COLOR}
                    icon={
                      songIndex === index && playing
                        ? faPauseCircle
                        : faPlayCircle
                    }
                  />
                </span>
                </div>
                <div className="dot-box ml-auto">
                  <ShareBox/>
                </div>
              </div>
            ))}
          </section>
        </>
        }
      </div>
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
    getPlaylistAction: (id) => dispatch(getPlaylist(id)),
    onHandleSongPlaying: status => dispatch(handleSongPlaying(status)),
    setSongsAction: (songs) => dispatch(setSongs(songs)),
    onHandleSingleSong: (index, status) =>
      dispatch(handleSingleSong(index, status)),
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
