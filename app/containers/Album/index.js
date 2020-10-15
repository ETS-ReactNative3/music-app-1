import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
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
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';
import './index.scss';
import ShareBox from '../../components/ShareBox';

const key = 'global';

const Album = props => {
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
    props.history.replace(`/album/${slug}`);
  };
  useEffect(() => {
    onLoadAlbum(props.match.params.slug);
  }, [props.match.params.slug]);

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
  const { albumSongs = [] } = albumInfo;
  return (
    <>
      <main role="main" className="px-5 jumbotron-bg-inner">
        <div className="row album-detail">
          <div className="col-md-3 album-thumb">
            <img src={albumInfo.artwork} className="rounded-lg" alt="" />
          </div>
          <div className="col-md-9">
            <div className="row">
              <div className="col-md-9">
                <h5>{albumInfo.title}</h5>
                <h1>{albumInfo.caption}</h1>
              </div>
              <div className="col-md-3 dot-box text-right">
                <ShareBox />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                Album | {albumInfo.releaseDate} | {albumSongs.length}
              </div>
              <div className="col-md-12 mt-3">
                <a
                  href="javascript:void(0);"
                  onClick={playAllSongsHandler}
                  className="text-decoration-none bg-white text-dark px-4 py-2 rounded-pill text-center"
                >
                  {playing ? 'Pause' : 'Play All'}
                </a>
              </div>
            </div>
          </div>
        </div>

        <section className="pt-5">
          {playlist.map((ele, index) => {
            return (
              <div
                className="d-flex border-bottom blick-border align-items-center songs-ul py-4"
                key={index}
              >
                <div className="song-number px-2">
                  {('0' + (index + 1)).slice(-2)}
                </div>
                <div className="song-title px-2 min-w15">
                  <h5>{ele.title}</h5>
                  <h6>{ele.description}</h6>
                </div>
                <div className="song-duration px-2">4:25</div>
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
                <div className="dot-box px-2 ml-auto">
                  <ShareBox />
                </div>
              </div>
            );
          })}
        </section>
        <CarouselCustom
          list={recommended}
          heading="Recommended For You"
          onClickHandler={handleAlbumClick}
          clasess="recommended-box"
        />
      </main>
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
)(Album);
