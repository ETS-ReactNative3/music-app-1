import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {compose} from "redux";
import {getTopSongs} from "./actions";
import {makeSelectTopSongs, makeSelectTopSongsLoading} from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import {useInjectReducer} from 'utils/injectReducer';
import {useInjectSaga} from 'utils/injectSaga';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay} from "@fortawesome/free-solid-svg-icons";
import {makeSelectCurrentSong, makeSelectRole} from "../App/selectors";
import PaperCard from "../../components/PaperCard";
import {convertSecondsToTime} from "../../utils";
import SongsOptionsBox from "../../components/SongsOptionsBox";
import {addSongIntoPlaylist, createPlaylistandAddSong, getMyPlaylist} from "../Playlist/actions";
import {makeSelectPlaylists} from "../Playlist/selectors";
import {handleSingleSong, setPlaylist} from "../App/actions";
import reducerPlaylist from "../Playlist/reducer";
import sagaPlaylist from "../Playlist/saga";

const WeeklyList = (
  {
    getTopSongsAction,
    topSongsLoading,
    topSongs,
    currentSong,
    getMyPlaylistAction,
    createPlaylistAndAddSongAction,
    addSongIntoPlaylistAction,
    playlists,
    role,
    setPlaylistAction,
    onHandleSingleSong
  }) => {
  useInjectReducer({key: 'home', reducer});
  useInjectSaga({key: 'home', saga});

  useInjectReducer({key: 'playlist', reducer: reducerPlaylist});
  useInjectSaga({key: 'playlist', saga: sagaPlaylist});

  useEffect(() => {
    getTopSongsAction()
  }, []);

  const singleSongHandler = songId => {
    const weeklySongs = topSongs.map(item => {
      return {song: item, album: item.albumSongs[0].album}
    })
    setPlaylistAction(weeklySongs)
    const status = currentSong.songData.id === songId ? !currentSong.playing : true;
    onHandleSingleSong(songId, status);
  };

  return (
    <PaperCard title="Top of the week">
      <div className="row">
        <div className="col-md-12">
          {topSongs.map((item, index) =>
            <div
              className="row song-row align-content-center py-3"
              id={`songNumber${item.id}`}
              key={item.id}
            >
              <div className="col-10">
                <div className="d-inline-block">
                  <span className="song-number pr-3">{index + 1}</span>
                  <span
                    onClick={() => singleSongHandler(item.id)}
                    className="cursor-pointer px-3"
                  >
                  <FontAwesomeIcon
                    icon={
                      currentSong.songData.id === item.id &&
                      currentSong.playing
                        ? faPause
                        : faPlay
                    }
                  />
                </span>
                  <img width="50" src={item.albumSongs[0].album.artwork} alt={item.title} className="rounded mr-3"/>
                </div>
                <div className="d-inline-block align-middle">
                  <h5 className="song-title">{item.title}</h5>
                  <h6>{item.user.name}</h6>
                </div>
              </div>
              <div className="col-2 d-flex justify-content-center align-items-center">
                <span
                  className="song-duration px-4">{item.duration ? convertSecondsToTime(item.duration) : '00:00'}</span>
                {role && (
                  <SongsOptionsBox
                    songId={item.id}
                    playlists={playlists}
                    getMyPlaylistAction={getMyPlaylistAction}
                    createPlaylistandAddSongAction={createPlaylistAndAddSongAction}
                    addSongIntoPlaylistAction={addSongIntoPlaylistAction}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PaperCard>
  )
}

WeeklyList.propTypes = {
  getTopSongsAction: PropTypes.func,
  getMyPlaylistAction: PropTypes.func,
  createPlaylistAndAddSongAction: PropTypes.func,
  addSongIntoPlaylistAction: PropTypes.func,
  setPlaylistAction: PropTypes.func,
  onHandleSingleSong: PropTypes.func
}
const mapStateToProps = createStructuredSelector({
  topSongsLoading: makeSelectTopSongsLoading(),
  topSongs: makeSelectTopSongs(),
  playlists: makeSelectPlaylists(),
  currentSong: makeSelectCurrentSong(),
  role: makeSelectRole(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTopSongsAction: () => dispatch(getTopSongs()),
    getMyPlaylistAction: () => dispatch(getMyPlaylist()),
    createPlaylistAndAddSongAction: data => dispatch(createPlaylistandAddSong(data)),
    addSongIntoPlaylistAction: data => dispatch(addSongIntoPlaylist(data)),
    setPlaylistAction: (songs) => dispatch(setPlaylist(songs)),
    onHandleSingleSong: (index, status) => dispatch(handleSingleSong(index, status)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
  withConnect
)(WeeklyList);
