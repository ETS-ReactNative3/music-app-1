import React, { memo, useEffect, useRef, useState } from 'react';
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

let songsList = [
  {
    name: '枝芽',
    src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/zhiya.mp3',
  },
  {
    name: '自由女神',
    src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/ziyounvshen.mp3',
  },
  {
    name: '无雨无晴',
    src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3',
  },
  {
    name: '碎片',
    src: 'https://hanzluo.s3-us-west-1.amazonaws.com/music/suipian.mp3',
  },
  {
    name: '永恒的港湾',
    src:
      'https://hanzluo.s3-us-west-1.amazonaws.com/music/yonghengdegangwan.mp3',
  },
];

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
          src: playlist[songIndex].src,
          title: playlist[songIndex].title,
          artist: playlist[songIndex].title,
        }
      : songDetail;

  useEffect(() => {
    const { playing: status } = currentSong;
    status
      ? audioRef.current.audio.current.play()
      : audioRef.current.audio.current.pause();
  }, [currentSong]);

  const handleClickPrevious = () => {
    const previousIndex = songIndex - 1;
    onHandleSingleSong(previousIndex, true);
  };

  const handleClickNext = () => {
    const previousIndex = songIndex + 1;
    onHandleSingleSong(previousIndex, true);
  };

  const handleVolumeChange = e => {
    volumeRef.current.value = e.target.volume;
  };

  const handleRangVolume = e => {
    audioRef.current.audio.current.volume = e.target.value;
  };

  const footerText = (
    <div className="d-flex w-25">
      <div className="d-flex mr-2">
        <img
          src={require('./../../images/album-1.jpg')}
          alt=""
          width="40"
          height="40"
          className="rounded"
        />
      </div>
      <div className="d-flex flex-column">
        <h5>{songDetail.title}</h5>
        <h6>{songDetail.artist}</h6>
      </div>
    </div>
  );

  return (
    <footer className="main-footer">
      <div className="d-flex footer-fix-bottom">
        {/* <div className="d-inline-flex align-items-center justify-content-center footer-menu">
          <a href="#">
            <img src={require('./../../images/footer-nav-icon.png')} alt="" />
          </a>
        </div> */}
        <div className="d-inline-flex flex-grow-1">
          <H5AudioPlayer
            layout="horizontal-reverse"
            autoPlayAfterSrcChange={true}
            showSkipControls={true}
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
            customControlsSection={[
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.ADDITIONAL_CONTROLS,
            ]}
            customProgressBarSection={[
              RHAP_UI.CURRENT_TIME,
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.DURATION,
              RHAP_UI.VOLUME,
              <div className="volume-progress-bar">
                <input
                  ref={volumeRef}
                  type="range"
                  min="0"
                  max="1"
                  orient="vertical"
                  step="any"
                  onChange={handleRangVolume}
                />
              </div>,
              footerText,
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
