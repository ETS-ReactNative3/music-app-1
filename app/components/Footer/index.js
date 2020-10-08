import React, { memo, useEffect, useRef, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
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
  const { songIndex } = currentSong;
  let songDetail = {
    src: '',
    title: 'Title',
    artist: 'Artist',
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

  const footerText = (
    <hgroup>
      <h5>{songDetail.title}</h5>
      <h6>{songDetail.artist}</h6>
    </hgroup>
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
          <AudioPlayer
            autoPlayAfterSrcChange={true}
            showSkipControls={true}
            showJumpControls={false}
            footer={footerText}
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
