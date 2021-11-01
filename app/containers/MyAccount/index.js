import {isArray} from 'lodash';
import PropTypes from 'prop-types';
import React, {memo, useEffect} from 'react';
import {Badge, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import PaperCard from '../../components/PaperCard';
import {PLAY_ICON_BG_COLOR} from '../../utils/constants';
import {useInjectReducer} from '../../utils/injectReducer';
import {useInjectSaga} from '../../utils/injectSaga';
import {getGenres} from '../Album/actions';
import reducer from '../Album/reducer';
import saga from '../Album/saga';
import {makeSelectGenres} from '../Album/selectors';
import {
  makeSelectInfluencerDetails,
  makeSelectUserDetails,
} from '../App/selectors';
import accountReducer from './reducer';
import accountSaga from './saga';
import styles from './index.styles';
import {renderSocialMediaIcons} from '../../utils';
import TasteMakerStats from "../../components/TasteMakerStats/Loadable";
import influencerReducer from "../Influencer/reducer";
import influencerSaga from "../Influencer/saga";
import {fetchInfluencerStatsAction} from "../Influencer/actions";
import {makeSelectInfluencerStats, makeSelectInfluencerStatsLoader} from "../Influencer/selectors";
import LoadingIndicator from "../../components/LoadingIndicator";
import {InfoCard} from './InfoCard';
import ProfileSidebar from "../../components/ProfileSidebar/Loadable";
import {SupportedArtist} from "../Artist/Loadable";

const renderGenres = (genersToRender, genres) =>
  genersToRender &&
  isArray(genersToRender) &&
  (genersToRender || []).map(internalGener => (
    <Badge key={internalGener.id} variant="success" className="p-2 mr-3">
      {(genres.find(gener => gener.id === internalGener.genreId) || {}).title}
    </Badge>
  ));

function MyAccount(
  {
    userDetails,
    influencerProfile,
    genres,
    getGenreList,
    getInfluencerStats,
    influencerStatsLoader,
    influencerStats,
  }) {
  useInjectSaga({key: 'album', saga});
  useInjectReducer({key: 'album', reducer});
  useInjectSaga({key: 'account', saga: accountSaga});
  useInjectReducer({key: 'account', reducer: accountReducer});
  useInjectSaga({key: 'influencer', saga: influencerSaga});
  useInjectReducer({key: 'influencer', reducer: influencerReducer});

  useEffect(() => {
    getGenreList();
  }, []);

  useEffect(() => {
    if (userDetails && userDetails.influencerId !== null) {
      getInfluencerStats(userDetails.influencerId)
    }
  }, [userDetails]);

  const isInfluencer =
    (userDetails && userDetails.influencerId !== null) || false;
  return (
    <>
      <PaperCard title="My Account">
        <div className="row">
          <div className="col-md-4 col-xl-3">
            <ProfileSidebar userDetails={userDetails}/>
            {influencerStatsLoader ? <LoadingIndicator/> : <TasteMakerStats stats={influencerStats}/>}
          </div>
          <div className="col-md-8 col-xl-9">
            {isInfluencer && (
              influencerProfile === undefined ? <LoadingIndicator/>
                : influencerProfile.influencerStatusId === 3 ?
                <InfoCard title={'Music Tastemakers'} message={'Your request for tastemakers is in pending state...'}
                          buttonTitle={''} linkTo={''}/>
                : influencerProfile.influencerStatusId === 1 ? <InfoCard title={'Music Tastemakers'}
                                                                         message={'Your request for tastemakers is declined, you can request again by below button'}
                                                                         buttonTitle={'Become a tastemaker'}
                                                                         linkTo={'/tasteMaker/request/form'}/>
                  :
                  <div className="card bg-dark mb-3">
                    <div className="card-body profile-user-box">
                      <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">Name</h3>
                      <div className="mb-3">
                        {influencerProfile.businessName}
                      </div>

                      <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">
                        Social Channels
                      </h3>
                      <div className="mb-3">
                        <div style={styles.linkContainer}>
                          {influencerProfile && influencerProfile.influencerServices &&
                          influencerProfile.influencerServices.map(service => {

                              return (
                                <a key={service.id} href={service.link} target="_blank" className="pr-2">
                                  {renderSocialMediaIcons(service.socialChannels.title, '1x', {marginLeft: 5}, PLAY_ICON_BG_COLOR)}
                                  <span className="pl-2">{service.followers} followers</span>
                                </a>
                              );

                            }
                          )}
                        </div>
                      </div>
                      <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">
                        Services
                      </h3>
                      <div className="mb-3">
                        {influencerProfile.helpArtistDescription}
                      </div>
                      <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">
                        Genres
                      </h3>
                      <div className="mb-3">
                        {renderGenres(influencerProfile.influencerGenres, genres)}
                      </div>
                    </div>
                  </div>
            )}
            {userDetails.roleId === 1 && userDetails.influencerId === null && (
              <InfoCard title={'Join our selection of music tastemakers'}
                        message={'Join the team of Bliiink tastemakers and find the musical gems of tomorrow.'}
                        buttonTitle={'Become a tastemaker'} linkTo={'/tasteMaker/request/form'}/>
            )}
            <InfoCard
              title={''}
              message={'Coming Soon: Became a Bliiink patron Today, Get involved in decision making and EARN while you do so.'}
              buttonTitle={'Become a Patron'} linkTo={''}/>

          </div>
        </div>
      </PaperCard>
    </>
  );
}

MyAccount.propTypes = {
  userDetails: PropTypes.any,
  influencerProfile: PropTypes.any,
  genres: PropTypes.array,
  getGenreList: PropTypes.func,
  navigation: PropTypes.func,
  getInfluencerStats: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  userDetails: makeSelectUserDetails(),
  influencerProfile: makeSelectInfluencerDetails(),
  influencerStats: makeSelectInfluencerStats(),
  influencerStatsLoader: makeSelectInfluencerStatsLoader(),
  genres: makeSelectGenres(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGenreList: () => dispatch(getGenres()),
    getInfluencerStats: (id) => dispatch(fetchInfluencerStatsAction(id))
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
