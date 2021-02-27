/**
 *
 * Artist
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import Background from '../../images/banner-bg.jpg'
import './index.scss'
import { fetchArtistAction, followArtistAction } from './actions';
import { makeSelectArtist, makeSelectArtistFetching } from './selectors';
import CarouselFront from '../../components/CarouselFront';
import { FormattedMessage } from 'react-intl';
import messages from '../HomePage/messages';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useHistory, useParams } from 'react-router-dom';
import { makeSelectUserDetails } from '../App/selectors';

export function Artist({ artist, fetchArtist, artistFetching, followArtist, userDetails }) {
  useInjectReducer({ key: 'artist', reducer });
  useInjectSaga({ key: 'artist', saga });
  const {id} = useParams();

  const history = useHistory();
  React.useEffect(() => {
    fetchArtist(id)
  }, [id])
  return (
    <div>
      {!(artistFetching || Object.keys(artist).length === 0) ? <><section className="banner" style={{ backgroundImage: `url(${artist.coverPhoto})` }}>
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center">
            <div className="col-12">
              <h1 className="display-4">{artist.name}</h1>
              <hr className="my-4" />
              <a onClick={() =>  (userDetails) ? followArtist(artist): history.push('/login')} className="btn btn-primary btn-lg" href="#" role="button">Follow</a>
            </div>
          </div>
        </div>
      </section>
        <section className="artist-data">
          <CarouselFront
            loading={artistFetching}
            list={artist.albums}
            heading={<FormattedMessage {...messages.featuredAlbumHeading} />}
            clasess="carousel-front py-5"
          />
        </section></>: <LoadingIndicator/>}
    </div>
  );
}

Artist.propTypes = {
  fetchArtist: PropTypes.func,
  artist: PropTypes.any,
  artistFetching: PropTypes.bool,
  followArtist: PropTypes.func,
  userDetails: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  artist: makeSelectArtist(),
  artistFetching: makeSelectArtistFetching(),
  userDetails: makeSelectUserDetails()
});

function mapDispatchToProps(dispatch) {
  return {
    fetchArtist: (id) => dispatch(fetchArtistAction(id)),
    followArtist: (artist) => dispatch(followArtistAction(artist)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Artist);