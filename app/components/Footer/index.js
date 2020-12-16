import React, { memo, useEffect, useRef } from 'react';
import H5AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

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

const Footer = props => {
  const {
    playlist = [],
    currentSong,
    onHandleSongPlaying,
    onHandleSingleSong,
  } = props;
  const audioRef = useRef(null);
  const volumeRef = useRef(null);
  const { songIndex } = currentSong;
  let songDetail = {
    src: '',
    title: 'Song Title',
    artist: 'Artist Name',
  };

  songDetail =
    playlist.length > 0
      ? {
        ...songDetail,
        src: playlist[songIndex].url,
        title: playlist[songIndex].title,
        artist: playlist[songIndex].user.name,
        artwork: playlist[songIndex].artwork,
      }
      : songDetail;

  useEffect(() => {
    const { playing: status } = currentSong;
    status
      ? audioRef.current.audio.current.play()
      : audioRef.current.audio.current.pause();
  }, [currentSong]);

  const handleClickPrevious = () => {
    if (songIndex !== 0) {
      const previousIndex = songIndex - 1;
      onHandleSingleSong(previousIndex, true);
    }
  };

  const handleClickNext = () => {
    const nextIndex = songIndex + 1;
    if (nextIndex < playlist.length) {
      onHandleSingleSong(nextIndex, true);
    }
  };

  const handleVolumeChange = e => {
    volumeRef.current.value = e.target.volume;
  };

  const footerText = (
    <div className="row mr-3">
      <div className="col-auto">
        <img
          src={songDetail.artwork}
          alt=""
          width="40"
          height="40"
          className="rounded"
        />
      </div>
      <div className="col">
        <h4>{songDetail.title}</h4>
        <h6>{songDetail.artist}</h6>
      </div>
    </div>
  );

  return (
    <footer
      className={`main-footer fixed-bottom ${
        playlist.length === 0 ? 'd-none' : ''
      }`}
    >
      <div className="d-flex">
        <div className="d-inline-flex flex-grow-1">
          <H5AudioPlayer
            layout="horizontal"
            autoPlayAfterSrcChange={false}
            showSkipControls
            showJumpControls={false}
            ref={audioRef}
            src={songDetail.src}
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
        </div>
      </div>
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
