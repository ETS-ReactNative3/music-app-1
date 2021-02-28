import React, {memo, useEffect, useRef} from 'react';
import H5AudioPlayer, {RHAP_UI} from 'react-h5-audio-player';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {
  handleSongPlaying,
  handleSingleSong,
} from '../../containers/App/actions';
import 'react-h5-audio-player/lib/styles.css';
import {
  makeSelectPlaylist,
  makeSelectCurrentSong,
} from '../../containers/App/selectors';
import './index.scss';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

const Footer = props => {
  const {
    playlist = [],
    currentSong,
    onHandleSongPlaying,
    onHandleSingleSong,
  } = props;
  const audioRef = useRef(null);
  const volumeRef = useRef(null);

  useEffect(() => {
    currentSong.playing
      ? audioRef.current.audio.current.play()
      : audioRef.current.audio.current.pause();

  }, [currentSong]);

  const handleClickPrevious = () => {
    const songIndex = playlist.findIndex(item => item.song.id === currentSong.songData.id)
    if (songIndex !== 0) {
      onHandleSingleSong(playlist[songIndex - 1].song.id, true);
    }
  };

  const handleClickNext = () => {
    const songIndex = playlist.findIndex(item => item.song.id === currentSong.songData.id)
    if (songIndex < (playlist.length - 1)) {
      onHandleSingleSong(playlist[songIndex + 1].song.id, true);
    }
  };

  const handleVolumeChange = e => {
    volumeRef.current.value = e.target.volume;
  };

  const footerText = (
    <div className="row mr-2">
      <div className="col-auto">
        <img
          src={currentSong.songData.artwork}
          alt=""
          width="40"
          height="40"
          className="rounded"
        />
      </div>
      <div className="col-auto song-title">
        <OverlayTrigger
          placement="top"
          delay={{show: 250, hide: 400}}
          overlay={<Tooltip id={`song-title-tooltip`}>{currentSong.songData.title}</Tooltip>}
        >
          <h4>{currentSong.songData.title}</h4>
        </OverlayTrigger>
        <h6>{currentSong.songData.artist}</h6>
      </div>
    </div>
  );

  return (
    <footer
      className={`main-footer fixed-bottom ${
        currentSong.songData.id === '' ? 'd-none' : ''
      }`}
    >
      <H5AudioPlayer
        layout="horizontal"
        autoPlayAfterSrcChange={false}
        showSkipControls
        showJumpControls={false}
        ref={audioRef}
        src={currentSong.songData.src}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        onEnded={handleClickNext}
        onPlay={() => {
          onHandleSongPlaying(true);
        }}
        onPause={() => {
          onHandleSongPlaying(false);
        }}
        onVolumeChange={handleVolumeChange}
        customProgressBarSection={[
          footerText,
          RHAP_UI.CURRENT_TIME,
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.DURATION,
        ]}
      />
    </footer>
  );
};

const mapStateToProps = createStructuredSelector({
  playlist: makeSelectPlaylist(),
  currentSong: makeSelectCurrentSong(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onHandleSongPlaying: status => dispatch(handleSongPlaying(status)),
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
)(Footer);
