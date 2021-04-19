/**
 *
 * Playlist
 *
 */

import { isArray } from 'lodash';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { Badge, Button, Col, Image, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PaperCard from '../../components/PaperCard';
import defaultImage from '../../images/user.svg';
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
import PlanSvg from "../../images/svg/plan_icon_color.svg";
import styles from './index.styles';
import { getValue, renderSocialMediaIcons } from '../../utils';
import TasteMakerStats from "../../components/TasteMakerStats/Loadable";
import influencerReducer from "../Influencer/reducer";
import influencerSaga from "../Influencer/saga";
import { fetchInfluencerStatsAction } from "../Influencer/actions";
import { makeSelectInfluencerStats, makeSelectInfluencerStatsLoader } from "../Influencer/selectors";
import LoadingIndicator from "../../components/LoadingIndicator";
import PatronInfo from '../../components/PatronInfo';

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
    navigation,
  }) {
  useInjectSaga({ key: 'album', saga });
  useInjectReducer({ key: 'album', reducer });
  useInjectSaga({ key: 'account', saga: accountSaga });
  useInjectReducer({ key: 'account', reducer: accountReducer });
  useInjectSaga({ key: 'influencer', saga: influencerSaga });
  useInjectReducer({ key: 'influencer', reducer: influencerReducer });

  // useEffect(() => {
  //   getGenreList();
  // }, []);

  // useEffect(() => {
  //   if (userDetails && userDetails.influencerId !== null) {
  //     getInfluencerStats(userDetails.influencerId)
  //   }
  // }, [userDetails]);

  const renderSocialMedias = (artistInfo, title) => {
    return <div>{(artistInfo[title] && <a href={artistInfo[title]} target="_blank" className="pr-2">
      {renderSocialMediaIcons(title, '2x', { marginLeft: 5 }, PLAY_ICON_BG_COLOR)}
    </a>)}
    </div>

  }
  const isInfluencer =
    (userDetails && userDetails.influencerId !== null) || false;
  return (
    <>
      <PaperCard title="My Account">
        <div className="row">
          <div className="col-sm-12">
            <div className="card bg-dark">
              <div className="card-body profile-user-box">
                <div className="row">
                  <div className="col-sm-6">
                    {/* <div className="media">
                      <span className="float-left m-2 mr-4">
                        <Image
                          width={120}
                          height={120}
                          onError={e => {
                            e.target.onerror = null;
                            e.target.src = defaultImage;
                          }}
                          src={userDetails.avatar}
                          alt=""
                          roundedCircle
                        />
                      </span>
                      <div className="media-body">
                        <h4 className="mt-1 mb-1 text-white">{userDetails.name}</h4>
                        <p className="font-13 text-white-50">
                          {userDetails.roleId !== 1 && userDetails.role.title}
                        </p>
                        <p className="font-13 text-white-50">
                          {userDetails.roleId === 1 && userDetails.influencerId && 'Tastemaker'}
                          {userDetails.roleId === 1 && !userDetails.influencerId && userDetails.role.title}
                        </p>
                        {userDetails.biography &&
                          <p>
                            <strong>Bio:</strong> {userDetails.biography}
                          </p>
                        }
                        <ul className="mb-0 list-inline text-light">
                          <li className="list-inline-item">
                            <h5 className="mb-1">
                              <img
                                src={PlanSvg}
                                alt="wallet Logo"
                                width={20}
                                height={20}
                              /> {userDetails.credit}
                            </h5>
                            <p className="mb-0 font-13 text-white-50">Bliiink Credits</p>
                          </li>
                        </ul>
                        {(userDetails && userDetails.subscription) && <>
                          <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0 mt-2">Subscription Info:- </h3>
                          <div className="mb-3">
                            {userDetails.subscription.title} ({userDetails.subscription.duration} days)
                        </div>
                        </>}
                      </div>
                    </div> */}
                  </div>
                  <div className="col-sm-6">
                    <div className="text-center mt-sm-0 mt-3 text-sm-right">
                    <button type="button" className="btn btn-success" onClick={() => {}}>
                        Advanced Section
                      </button>
                      <button type="button" className="btn btn-success" onClick={() => history.push('/myaccount/edit')}>
                        Edit Profile
                      </button>
                      {userDetails.roleId === 1 && <button type="button" className="btn btn-success" onClick={() => history.push('/user/supportedArtist')}>
                        Supported Artist
                      </button>}
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PatronInfo userDetails={userDetails} />
        {userDetails.roleId === 1 && userDetails.influencerId === null && (
          <div className="row mt-3">
            <div className="col-sm-12">
              <div className="card bg-dark">
                <div className="card-body profile-user-box">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="text-center">
                        <h2>
                          Join our selection
                          of music tastemakers
                        </h2>
                        <p className="mt-3">
                          Join the team of Bliiink tastemakers and find the musical gems of tomorrow.
                        </p>

                        <Link to="/tasteMaker/request/form">
                          <Button className="mt-2" variant="success">
                            Become a tastemaker
                          </Button>
                        </Link>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isInfluencer && (
          <Row className="mt-5">
            <Col md={7} lg={8} xl={9}>
              <div className="card bg-dark">
                <div className="card-body profile-user-box">
                  <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">Name</h3>
                  <div className="mb-3">
                    {influencerProfile.name}
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
                              {renderSocialMediaIcons(service.socialChannels.title, '1x', { marginLeft: 5 }, PLAY_ICON_BG_COLOR)}
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
            </Col>
            <>
              <Col md={5} lg={4} xl={3}>
                {influencerStatsLoader ? <LoadingIndicator /> : <TasteMakerStats stats={influencerStats} />}
              </Col>
            </>
          </Row>
        ) || <Row className="mt-5">
            <Col md={7} lg={8} xl={9}>
              <div className="card bg-dark">
                <div className="card-body profile-user-box">


                  <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">
                    Social Media
              </h3>
                  <div className="mb-3">
                    <div style={styles.linkContainer}>
                      {getValue(userDetails, ['artistInformation', 'facebook']) && renderSocialMedias(userDetails.artistInformation, 'facebook')}
                      {getValue(userDetails, ['artistInformation', 'twitter']) && renderSocialMedias(userDetails.artistInformation, 'twitter')}
                      {getValue(userDetails, ['artistInformation', 'instagram']) && renderSocialMedias(userDetails.artistInformation, 'instagram')}
                      {getValue(userDetails, ['artistInformation', 'youtube']) && renderSocialMedias(userDetails.artistInformation, 'youtube')}



                    </div>
                    {getValue(userDetails, ['artistInformation', 'location']) && <><h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">
                      Location
                  </h3>
                    <div className="mb-3">
                      {getValue(userDetails, ['artistInformation', 'location'])}
                    </div>
                    </>}
                  </div>
                </div>
              </div>
            </Col></Row>}
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
