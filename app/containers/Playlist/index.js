import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { faGratipay } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CarouselCustom from '../../components/CarouselCustom';
import {
  makeSelectRecommended,
  makeSelectWeeklyTop,
  makeSelectAlbumInfo,
  makeSelectPlaylist,
  makeSelectCurrentSong,
} from '../App/selectors';
import { handleSongPlaying, loadAlbum, handleSingleSong } from '../App/actions';
import reducer from '../App/reducer';
import saga from '../App/saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import MainWrapper from '../../components/MainWrapper';
import TopHeader from '../../components/TopHeader';
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';
import './index.scss';

const key = 'global';

const Playlist = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const {
    recommended,
    onLoadAlbum,
    albumInfo,
    playlist,
    currentSong,
    onHandleSongPlaying,
    onHandleSingleSong,
  } = props;
  const handleAlbumClick = slug => {
    props.history.replace(`/playlist/${slug}`);
  };
  useEffect(() => {
    onLoadAlbum('album-1');
  }, [currentSong]);

  const playAllSongsHandler = () => {
    const { playing } = currentSong;
    onHandleSongPlaying(!playing);
  };

  const singleSongHandler = index => {
    const { playing, songIndex } = currentSong;
    const status = songIndex === index ? !playing : true;
    onHandleSingleSong(index, status);
  };

  const { playing, songIndex } = currentSong;
  return (
    <>
      <TopHeader />
      <MainWrapper role="main" className="jumbotron-bg-inner">
        <div className="d-flex flex-row album-detail py-5">
          <div>
            <img
              src={require(`./../../images/selena.jpg`)}
              className="rounded-lg"
              alt=""
            />
          </div>
          <div className="px-5">
            <h5>{albumInfo.artistName}</h5>
            <h1>{albumInfo.albumType}</h1>
            <div>
              {albumInfo.type} | {albumInfo.albumYear} | {albumInfo.totalSongs}
            </div>
            <div className="d-flex align-items-center py-2">
              <a
                href="javascript:void(0);"
                onClick={playAllSongsHandler}
                className="play-btn"
              >
                {playing ? 'Pause' : 'Play All'}
              </a>
              <a href="javascript:void(0)" className="">
                <FontAwesomeIcon
                  icon={faGratipay}
                  size="3x"
                  color={PLAY_ICON_BG_COLOR}
                />
              </a>
            </div>
          </div>
          <div className="dot-box ml-auto">...</div>
        </div>

        <section>
          <h3>{albumInfo.artistName} songs </h3>

          {playlist.map((ele, index) => {
            return (
              <div
                className="d-flex border-bottom align-items-center songs-ul py-4"
                key={index}
              >
                <div className="song-number px-2">0{index + 1}</div>
                <div className="song-profile px-2">
                  <div className="song-img">
                    <img src={require(`./../../images/${ele.img}`)} alt="" />
                  </div>
                </div>
                <div className="song-title px-2 w-25">
                  <h5>{ele.title}</h5>
                  <h6>{ele.artist}</h6>
                </div>
                <div className="song-duration px-2">{ele.duration}</div>
                <div className="song-action px-2">
                  <a
                    href="javascript:void(0);"
                    onClick={() => singleSongHandler(index)}
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
                  </a>
                </div>
                <div className="dot-box px-2 ml-auto">...</div>
              </div>
            );
          })}
        </section>
        <CarouselCustom
          list={recommended}
          heading="Recommended For You"
          onClickHandler={handleAlbumClick}
        />
      </MainWrapper>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  recommended: makeSelectRecommended(),
  weeklyTop: makeSelectWeeklyTop(),
  albumInfo: makeSelectAlbumInfo(),
  playlist: makeSelectPlaylist(),
  currentSong: makeSelectCurrentSong(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadAlbum: slug => dispatch(loadAlbum(slug)),
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
)(Playlist);
