/**
 *
 * Playlist
 *
 */

import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faBlog, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isArray } from 'lodash';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import InfluencerAccount from '../../components/InfluencerAccount';
import defaultImage from '../../images/album-3.jpg';
import { combineFollowers, formatFollowers } from '../../utils';
import { PLAY_ICON_BG_COLOR } from '../../utils/constants';
import history from '../../utils/history';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { getGenres } from '../Album/actions';
import reducer from '../Album/reducer';
import saga from '../Album/saga';
import { makeSelectGenres } from '../Album/selectors';
import {
  makeSelectInfluencerDetails,
  makeSelectUserDetails,
} from '../App/selectors';
import accountReducer from './reducer';
import accountSaga from './saga';

const renderGenres = (genersToRender, genres) => {
  return (
    <div style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {genersToRender &&
        isArray(genersToRender) &&
        (genersToRender || []).map(internalGener => (
          <div
            style={{
              backgroundColor: '#1E64D7',
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              margin: 10,
              width: 'fit-content',
            }}
          >
            <div
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: 'Roboto-Regular',
                color: 'white',
              }}
            >
              {
                (genres.find(gener => gener.id === internalGener.genreId) || {})
                  .title
              }
            </div>
          </div>
        ))}
    </div>
  );
};

function MyAccount({
  userDetails,
  influencerProfile,
  genres,
  getGenreList,
  navigation,
}) {
  useInjectSaga({ key: 'album', saga });
  useInjectReducer({ key: 'album', reducer });
  useInjectSaga({ key: 'account', saga: accountSaga });
  useInjectReducer({ key: 'account', reducer: accountReducer });
  const [followers, setFollowers] = React.useState(0);
  React.useEffect(() => {
    setFollowers(combineFollowers(influencerProfile));
  }, [influencerProfile]);

  React.useEffect(() => {
    getGenreList();
  }, []);

  return (
    <div className="container-fluid" style={{ marginTop: '100px' }}>
      <div className="row album-detail">
        <div className="col pt-3 pt-md-0">
          <div className="row">
            <div className="col">
              <h1>My Account</h1>
              <Button
                variant="success"
                onClick={() => history.push('/myaccount/edit')}
              >
                Edit my profile
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          flexDirection: 'row',
          flex: 1,
          width: '20%',
          justifyContent: 'space-between',
          alignItems: 'normal',
        }}
      >
        <div style={{ float: 'left' }}>Current Account: </div>
        <div style={{ float: 'right' }}>
          {userDetails.influencerId ? 'Influencer' : 'Regular'}{' '}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 40,
          justifyContent: 'start',
          width: '100%',
          marginLeft: 10,
        }}
      >
        <Image
          width={50}
          height={50}
          onError={e => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
          src={userDetails.avatar}
          alt=""
          roundedCircle
        />
        <div style={{ marginLeft: 20, textAlign: 'left' }}>
          <div>{userDetails.name}</div>
          {
            <div style={{ color: 'grey' }}>
              {`${
                followers > 1000
                  ? `${formatFollowers(followers / 1000)}k`
                  : followers
              } followers`}
            </div>
          }
        </div>
      </div>

      <div
        style={{
          margin: 20,
          marginLeft: 10,
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <div
          style={{
            borderWidth: 0,
            borderRightWidth: 2,
            borderColor: 'green',
            borderStyle: 'solid',
            flex: 1,
          }}
        >
          <div>
            <>Social medias</>
            <Link
              to={{
                pathname: '/requestInfluencer',
                param: influencerProfile,
                fromEdit: true,
              }}
            >
              <FontAwesomeIcon
                size="1x"
                color={PLAY_ICON_BG_COLOR}
                icon={faEdit}
                style={{ marginLeft: 5 }}
              />
            </Link>
          </div>
          {influencerProfile &&
            influencerProfile.influencerServices.map(service => {
              if (service.socialChannels.title === 'facebook')
                return (
                  <FontAwesomeIcon
                    size="1x"
                    color={PLAY_ICON_BG_COLOR}
                    icon={faFacebook}
                    style={{ marginLeft: 5 }}
                  />
                );
              if (service.socialChannels.title === 'instagram')
                return (
                  <FontAwesomeIcon
                    size="1x"
                    color={PLAY_ICON_BG_COLOR}
                    icon={faInstagram}
                    style={{ marginLeft: 5 }}
                  />
                );
              if (service.socialChannels.title === 'twitter')
                return (
                  <FontAwesomeIcon
                    size="1x"
                    color={PLAY_ICON_BG_COLOR}
                    icon={faTwitter}
                    style={{ marginLeft: 5 }}
                  />
                );
              if (service.socialChannels.title === 'blog')
                return (
                  <FontAwesomeIcon
                    size="1x"
                    color={PLAY_ICON_BG_COLOR}
                    icon={faBlog}
                    style={{ marginLeft: 5 }}
                  />
                );
              if (service.socialChannels.title === 'youtube')
                return (
                  <FontAwesomeIcon
                    size="1x"
                    color={PLAY_ICON_BG_COLOR}
                    icon={faYoutube}
                    style={{ marginLeft: 5 }}
                  />
                );
              return <></>;
            })}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginLeft: 10 }}>
            Genres
            <FontAwesomeIcon
              size="1x"
              color={PLAY_ICON_BG_COLOR}
              icon={faEdit}
              style={{ marginLeft: 5 }}
            />
          </div>
          {renderGenres(influencerProfile.influencerGenres, genres)}
        </div>
      </div>

      <InfluencerAccount navigation={navigation} userId={userDetails.id} />
    </div>
  );
}

MyAccount.propTypes = {
  userDetails: PropTypes.any,
  influencerProfile: PropTypes.any,
  genres: PropTypes.array,
  getGenreList: PropTypes.func,
  navigation: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userDetails: makeSelectUserDetails(),
  influencerProfile: makeSelectInfluencerDetails(),
  genres: makeSelectGenres(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyAccount);
