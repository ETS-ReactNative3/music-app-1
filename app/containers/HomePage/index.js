import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {FormattedMessage} from 'react-intl';

import {useInjectReducer} from 'utils/injectReducer';
import {useInjectSaga} from 'utils/injectSaga';
import {
  makeSelectLatestPosts,
  makeSelectFeaturedAlbums,
  makeSelectRecommended,
  makeSelectPlaylist,
  makeSelectCurrentSong,
} from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import Header from '../../components/Header';
import CarouselFront from '../../components/CarouselFront';
import SongList from '../../components/SongList';
import messages from './messages';
import {setPlaylist, handleSingleSong} from '../App/actions';
import {getFeaturedAlbums, getNewReleases, getTopSongs} from "./actions";
import {
  makeSelectFeaturedAlbum,
  makeSelectFeaturedAlbumLoading,
  makeSelectNewReleaseLoading,
  makeSelectNewReleases,
  makeSelectTopSongs,
  makeSelectTopSongsLoading
} from "./selectors";

const key = 'home';

export function HomePage(props) {
  const {
    newReleasesLoading,
    newReleases,
    onHandleSetPlaylist,
    onHandleSingleSong,
    currentPlaylist,
    currentSong,
    getFeaturedAlbumsAction,
    getTopSongsAction,
    getNewReleasesAction,
    topSongsLoading,
    topSongs,
    featuredAlbumLoading,
    featuredAlbum
  } = props;

  useInjectReducer({key, reducer});
  useInjectSaga({key, saga});

  useEffect(() => {
    getFeaturedAlbumsAction();
    getTopSongsAction();
    getNewReleasesAction();
  }, []);

  const handleWeeklySong = songId => {
    const {playing, songData} = currentSong;
    let status = !playing;
    const weeklySongs = topSongs.map(item => {
      return {song: item, album: item.albumSongs[0].album}
    })
    if (songData.id !== songId) {
      status = true
    }
    onHandleSetPlaylist(weeklySongs);
    onHandleSingleSong(songId, status);
  };

  return (
    <>
      <Header/>
      <div className="container-fluid">
        <CarouselFront
          loading={featuredAlbumLoading}
          list={featuredAlbum}
          heading={<FormattedMessage {...messages.featuredAlbumHeading} />}
          clasess="carousel-front py-5"
        />
        {/*<LatestPosts*/}
        {/*  list={posts}*/}
        {/*  heading={<FormattedMessage {...messages.latestPostsHeading} />}*/}
        {/*  clasess="latest-posts py-5"*/}
        {/*/>*/}
        <SongList
          list={topSongs}
          heading={<FormattedMessage {...messages.songListHeading} />}
          singleSongHandler={handleWeeklySong}
          currentSong={currentSong}
          loading={topSongsLoading}
          clasess="py-5"
        />
        <CarouselFront
          list={newReleases}
          loading={newReleasesLoading}
          viewAll="/newReleases"
          heading={<FormattedMessage {...messages.newReleasesHeading} />}
          clasess="carousel-front py-5"
        />
        {/*<CarouselFront*/}
        {/*  list={recommended}*/}
        {/*  heading={<FormattedMessage {...messages.recommendedAlbumHeading} />}*/}
        {/*  clasess="carousel-front py-5"*/}
        {/*/>*/}
      </div>
    </>
  );
}

HomePage.propTypes = {
  posts: PropTypes.array,
  getFeaturedAlbumsAction: PropTypes.func,
  getTopSongsAction: PropTypes.func,
  getNewReleasesAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  posts: makeSelectLatestPosts(),
  albums: makeSelectFeaturedAlbums(),
  newReleasesLoading: makeSelectNewReleaseLoading(),
  newReleases: makeSelectNewReleases(),
  topSongsLoading: makeSelectTopSongsLoading(),
  topSongs: makeSelectTopSongs(),
  recommended: makeSelectRecommended(),
  currentPlaylist: makeSelectPlaylist(),
  currentSong: makeSelectCurrentSong(),
  featuredAlbumLoading: makeSelectFeaturedAlbumLoading(),
  featuredAlbum: makeSelectFeaturedAlbum()
});

export function mapDispatchToProps(dispatch) {
  return {
    onHandleSetPlaylist: songs => dispatch(setPlaylist(songs)),
    onHandleSingleSong: (index, status) => dispatch(handleSingleSong(index, status)),
    getFeaturedAlbumsAction: () => dispatch(getFeaturedAlbums()),
    getTopSongsAction: () => dispatch(getTopSongs()),
    getNewReleasesAction: () => dispatch(getNewReleases()),
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
