import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

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
import CarouselFront from '../../components/CarouselFront';
import { useParams } from 'react-router-dom';

const key = 'global';

const Album = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const { slug } = useParams();
  const {
    recommended,
    onLoadAlbum,
    albumInfo,
    playlist,
    currentSong,
    onHandleSongPlaying,
    onHandleSingleSong,
  } = props;
  useEffect(() => {
    onLoadAlbum(slug);
  }, [slug]);

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
      <div className="container-fluid jumbotron-bg-inner">
        <div className="row album-detail">
          <div className="col-auto">
            <div className="profile-img-box">
              <img
                src={albumInfo.artwork}
                className="rounded-lg img-fluid"
                alt=""
              />
            </div>
          </div>
          <div className="col pt-3 pt-md-0">
            <div className="row">
              <div className="col">
                <h5>{albumInfo.caption}</h5>
                <h1>{albumInfo.title}</h1>
              </div>
              <div className="col text-right">
                <ShareBox />
              </div>
            </div>
            <div className="row flex-column">
              <div className="col">
                Album | {moment(albumInfo.releaseDate).format('YYYY-MM-DD')} |{' '}
                {albumSongs.length}
              </div>
              <div className="col mt-3">
                <span
                  onClick={playAllSongsHandler}
                  className="text-decoration-none bg-white text-dark px-4 py-2 rounded-pill text-center cursor-pointer"
                >
                  {playing ? 'Pause' : 'Play All'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <section className="py-5">
          {playlist.map((ele, index) => (
            <div
              className="d-flex border-bottom blick-border border-top-0 border-right-0 border-left-0 align-items-center songs-ul py-3"
              key={index}
            >
              <div className="song-number">{`0${index + 1}`.slice(-2)}</div>
              <div className="song-title px-2 min-w15">
                <h5>{ele.title}</h5>
                <h6>{ele.description}</h6>
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
                <ShareBox />
              </div>
            </div>
          ))}
        </section>

        <CarouselFront
          list={recommended}
          heading="Recommended For You"
          clasess="carousel-front py-5"
        />
      </div>
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
