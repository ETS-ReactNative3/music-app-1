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

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectLatestPosts,
  makeSelectFeaturedAlbums,
  makeSelectWeeklyTop,
  makeSelectNewReleases,
  makeSelectRecommended,
} from '../../containers/App/selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../../components/Header';
import CarouselCustom from '../../components/CarouselCustom';
import SongList from '../../components/SongList';
import MainWrapper from '../../components/MainWrapper';

const key = 'home';

export function HomePage(props) {
  const { posts, albums, newReleases, recommended, weeklyTop } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const redirect = () => {
    props.history.push('/playlist');
  };

  const handleAlbumClick = slug => {
    props.history.push(`playlist/${slug}`);
  };

  return (
    <>
      <Header />
      <MainWrapper role="main" className="container-fluid">
        <CarouselCustom
          list={albums}
          heading="Featured Album"
          onClickHandler={handleAlbumClick}
        />

        <section className="post-area">
          <CarouselCustom list={posts} heading="Latest Posts" />
        </section>

        <SongList
          list={weeklyTop}
          heading="Weekly Top 12"
          onClickHandler={handleAlbumClick}
        />

        <CarouselCustom
          list={newReleases}
          heading="New Releases"
          onClickHandler={handleAlbumClick}
        />

        <CarouselCustom
          list={recommended}
          heading="Recommended For You"
          onClickHandler={handleAlbumClick}
        />
      </MainWrapper>
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
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(HomePage);
