/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

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
} from '../../containers/App/selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../../components/Header';
import CarouselCustom from '../../components/CarouselCustom';
import SongList from '../../components/SongList';
import MainWrapper from '../../components/MainWrapper';
import LatestPosts from '../../components/LatestPosts';
import messages from './messages';
import { setPlaylist } from '../App/actions';
import Playlist from '../../utils/json/playlist';

const key = 'home';

export function HomePage(props) {
  const {
    posts,
    albums,
    newReleases,
    recommended,
    weeklyTop,
    currentPlaylist,
    onHandleSetPlaylist,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const redirect = () => {
    props.history.push('/playlist');
  };

  const handleAlbumClick = slug => {
    props.history.push(`playlist/${slug}`);
  };

  const handleWeeklySong = index => {
    const { songs } = Playlist;
    onHandleSetPlaylist(songs);
  };

  return (
    <>
      <Header />
      <main role="main" className="px-5">
        <CarouselCustom
          list={albums}
          heading={<FormattedMessage {...messages.featuredAlbumHeading} />}
          onClickHandler={handleAlbumClick}
          itemsToShow={6}
        />

        <section className="post-area">
          <LatestPosts
            list={posts}
            heading={<FormattedMessage {...messages.latestPostsHeading} />}
          />
        </section>

        <SongList
          list={weeklyTop}
          heading={<FormattedMessage {...messages.songListHeading} />}
          singleSongHandler={handleWeeklySong}
        />

        <CarouselCustom
          list={newReleases}
          heading={<FormattedMessage {...messages.newReleasesHeading} />}
          onClickHandler={handleAlbumClick}
          itemsToShow={6}
        />

        <CarouselCustom
          list={recommended}
          heading={<FormattedMessage {...messages.recommendedAlbumHeading} />}
          onClickHandler={handleAlbumClick}
          itemsToShow={3}
        />
      </main>
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
});

export function mapDispatchToProps(dispatch) {
  return {
    onHandleSetPlaylist: songs => dispatch(setPlaylist(songs)),
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
