import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectLatestPosts,
  makeSelectFeaturedAlbums,
  makeSelectWeeklyTop,
  makeSelectNewReleases,
  makeSelectRecommended,
  makeSelectPlaylist,
  makeSelectCurrentSong,
} from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../../components/Header';
import CarouselCustom from '../../components/CarouselCustom';
import CarouselFront from '../../components/CarouselFront';
import SongList from '../../components/SongList';
import LatestPosts from '../../components/LatestPosts';
import messages from './messages';
import { setPlaylist, handleSingleSong } from '../App/actions';
import { redirectOnAlbum } from '../../utils/redirect';

const key = 'home';

export function HomePage(props) {
  const {
    posts,
    albums,
    newReleases,
    recommended,
    weeklyTop,
    onHandleSetPlaylist,
    onHandleSingleSong,
    currentPlaylist,
    currentSong,
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const handleWeeklySong = index => {
    const { playing, songIndex } = currentSong;
    let status = !playing;
    if (currentPlaylist.length === 0) {
      onHandleSetPlaylist(weeklyTop);
    }
    if (songIndex !== index) {
      status = true;
    }
    onHandleSingleSong(index, status);
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <CarouselFront
          list={albums}
          heading={<FormattedMessage {...messages.featuredAlbumHeading} />}
          clasess="carousel-front py-5"
        />
        <LatestPosts
          list={posts}
          heading={<FormattedMessage {...messages.latestPostsHeading} />}
          clasess="latest-posts py-5"
        />
        <SongList
          list={weeklyTop}
          heading={<FormattedMessage {...messages.songListHeading} />}
          singleSongHandler={handleWeeklySong}
          currentSong={currentSong}
          clasess="py-5"
        />
        <CarouselFront
          list={newReleases}
          heading={<FormattedMessage {...messages.newReleasesHeading} />}
          clasess="carousel-front py-5"
        />

        <CarouselFront
          list={recommended}
          heading={<FormattedMessage {...messages.recommendedAlbumHeading} />}
          clasess="carousel-front py-5"
        />
      </div>
    </>
  );
}

HomePage.propTypes = {
  posts: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  posts: makeSelectLatestPosts(),
  albums: makeSelectFeaturedAlbums(),
  weeklyTop: makeSelectWeeklyTop(),
  newReleases: makeSelectNewReleases(),
  recommended: makeSelectRecommended(),
  currentPlaylist: makeSelectPlaylist(),
  currentSong: makeSelectCurrentSong(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onHandleSetPlaylist: songs => dispatch(setPlaylist(songs)),
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
)(HomePage);
