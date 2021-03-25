/**
 *
 * Artist
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import './index.scss'
import { fetchArtistAction, followArtistAction } from './actions';
import { makeSelectArtist, makeSelectArtistFetching } from './selectors';
import CarouselFront from '../../components/CarouselFront';
import { FormattedMessage } from 'react-intl';
import messages from '../HomePage/messages';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useHistory, useParams } from 'react-router-dom';
import { makeSelectUserDetails } from '../App/selectors';
import PaperCard from "../../components/PaperCard";
import { Col, Container, Dropdown, Modal, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import ArtistPopup from '../../components/ArtistPopup/artistPopup';
import defaultImage from "../../images/user.svg";
import {Image} from "react-bootstrap";

export function Artist({ artist, fetchArtist, artistFetching, followArtist, userDetails }) {
  useInjectReducer({ key: 'artist', reducer });
  useInjectSaga({ key: 'artist', saga });
  const { id } = useParams();

  const [showMoreInfo, setShowMoreInfo] = React.useState(false);

  const history = useHistory();
  useEffect(() => {
    fetchArtist(id)
  }, [id])

  return (
    <div>
      {!(artistFetching || Object.keys(artist).length === 0) ? <>
        <section className="banner" style={{ backgroundImage: `url(${artist.artistInformation.coverPhoto})` }}>
          <div className="container h-100">
            <div className="row h-100 justify-content-center align-items-center">
              <div className="col-3">
                <Image
                  width={250}
                  height={250}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  src={artist.avatar}
                  alt="user avatar"
                  roundedCircle
                />
              </div>
              <div className="col-9">
                <h1 className="display-4 mt-4 mb-3">{artist.name}</h1>
                {artist.followerCount > 0 && <h5 className="mb-3">{artist.followerCount} followers</h5>}
                <button onClick={() => (userDetails) ? followArtist(artist.id, !artist.followedArtist, id) : history.push('/auth/login')}
                        className="btn btn-outline-success">{artist.followedArtist ? 'UnFollow' : 'Follow'}
                </button>

                <Dropdown className="social-album-share d-inline pl-4">
                  <Dropdown.Toggle id="dropdown-basic" as="span" s>
                    <FontAwesomeIcon
                      size="2x"
                      icon={faEllipsisH}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setShowMoreInfo(true)}>
                      View more Info
                    </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </section>
        <PaperCard>
          <section className="artist-data">
            <CarouselFront
              loading={artistFetching}
              list={artist.albums}
              heading={<FormattedMessage {...messages.featuredAlbumHeading} />}
              classes="carousel-front py-5"
            />
          </section>
        </PaperCard>
      </> : <LoadingIndicator />}

      {showMoreInfo && <ArtistPopup
      artist={artist}
        showMoreInfo={showMoreInfo}
        handleClose={() => setShowMoreInfo(false)}
      />}
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
    followArtist: (artistId, follow, id) => dispatch(followArtistAction(artistId, follow, id)),
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
