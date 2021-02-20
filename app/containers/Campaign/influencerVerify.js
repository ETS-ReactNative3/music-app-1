/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import LoadingIndicator from 'components/LoadingIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormControl, Image, Spinner, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import PaperCard from '../../components/PaperCard';
import { toast } from 'react-toastify';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import defaultImage from '../../images/album-3.jpg';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import albumReducer from '../Album/reducer';
import { CampaignStatus } from '../Requests/constants';
import requestReducer from '../Requests/reducer';
import requestSaga from '../Requests/saga';
import {
  declineCampaignAction,
  fetchCampaignAction,
  getSelectedCampaignAction,
  verifyCampaignAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCampaign,
  makeSelectDeclineSubmitting,
  makeSelectRatingSubmitting,
  makeSelectReviewSubmitting,
  makeSelectVerifySubmitting,
} from './selectors';
import './index.scss';

const Details = (
  {
    match,
    selectedCampaign,
    verifyCampaign,
    declineCampaign,
    fetchCampaigns,
    reviewSubmitting,
    ratingSubmitting,
    getSelectedCampaign,
    verifySubmitting,
    declineSubmitting
  }) => {
  useInjectReducer({ key: 'campaign', reducer });
  useInjectReducer({ key: 'request', reducer: requestReducer });
  useInjectSaga({ key: 'campaign', saga });
  useInjectSaga({ key: 'request', saga: requestSaga });
  useInjectReducer({ key: 'album', reducer: albumReducer });

  const [rating, setRating] = React.useState(0);
  const [feedback, setFeedback] = React.useState('');
  const [selectedInfluencer, setSelectedInfluencer] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (
      match.params.influencerId &&
      selectedCampaign &&
      selectedCampaign.campaignInfluencers
    ) {
      setSelectedInfluencer(
        selectedCampaign.campaignInfluencers.find(
          influencer => influencer.id === Number(match.params.influencerId),
        ),
      );
      setLoading(false);
    }
  }, [match.params.influencerId && selectedCampaign]);


  console.log(selectedInfluencer)
  React.useEffect(() => {
    fetchCampaigns();
    getSelectedCampaign(match.params.id);
  }, []);

  const renderAcceptButton = () => {
    if (selectedInfluencer.campaignStatusId === CampaignStatus.DECLINED) {
      return (
        <>
          <hr className="my-4 blick-border__danger" />
          <div className="text-danger">You Already declined this request!!</div>
        </>
      );
    }
    if (selectedInfluencer.campaignStatusId === CampaignStatus.APPROVED) {
      return (
        <>
          <hr className="my-4 blick-border" />
          <div className="text-success">
            You already verified this request!!
          </div>
        </>
      );
    }
    if (selectedInfluencer.campaignStatusId !== CampaignStatus.APPROVED && selectedInfluencer.campaignStatusId !== CampaignStatus.DECLINED) return (
      <div className="mt-3">
        <Button
          className="mr-3"
          variant="warning"
          disabled={verifySubmitting}
          onClick={() => {
            if (rating > 0) {
              if (feedback !== '') {
                verifyCampaign(
                  selectedCampaign.id,
                  selectedInfluencer.influencerId,
                  rating,
                  feedback,
                );
              } else {
                toast.error('Please enter review');
              }
            } else {
              toast.error('Please enter rating');
            }
          }}
        >
          Accept
          {verifySubmitting && <Spinner animation="border" />}
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            declineCampaign(selectedCampaign.id,
              selectedInfluencer.influencerId,
              selectedInfluencer.id,
              rating,
              feedback)
          }}
        >
          Decline
          {declineSubmitting && <Spinner animation="border" />}

        </Button>
      </div>
    );
  };

  return (
    <>
      {loading ? <LoadingIndicator /> : <PaperCard title="Campaign Influencer Verification">
        <small className="d-flex align-items-center">
          <Link className="mr-1 text-warning" to="/campaigns">Campaigns</Link> {'>'} <Link className="mx-1 text-warning"
            to={`/campaigns/${selectedCampaign.id}`}>Campaigns
          Details</Link> {'>'} <Link className="ml-1" style={{ pointerEvents: 'none', opacity: 0.6, color: '#fff' }}
            to={''}>Campaign Influencer Verification</Link>
        </small>
        <Row className="mt-5">
          <Col md={12}>
            {(reviewSubmitting || ratingSubmitting) && (
              <div
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Spinner animation="border" />
              </div>
            )}
            {selectedInfluencer && selectedInfluencer.influencer && (
              <div className="d-flex align-items-center">
                <Image
                  width={100}
                  height={100}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                  src={
                    (selectedInfluencer.influencer.user &&
                      selectedInfluencer.influencer.user.avatar) ||
                    ''
                  }
                  alt=""
                  roundedCircle
                />
                <div className="ml-3">
                  {(selectedInfluencer.influencer.user &&
                    selectedInfluencer.influencer.user.name) ||
                    ''}
                  <small className="text-muted d-block">
                    {selectedInfluencer.influencer.description}
                  </small>
                  <small className="text-muted d-block">
                    {selectedInfluencer.influencer.helpArtistDescription}
                  </small>
                  <small className="d-flex align-items-center">
                    {/* {selectedInfluencer.campaignInfluencerServices &&
                    selectedInfluencer.campaignInfluencerServices.map(
                      service => {
                        if (service.response)
                        switch (service.socialChannelsId) {
                          case 1:
                            return (
                              <a target={'_blank'} href={(service.response.includes('https')  || service.response.includes('http') )? service.response : `https://${service.response}`}>
                                <FontAwesomeIcon
                                  size="1x"
                                  icon={faFacebook}
                                  style={{marginLeft: 5}}
                                />
                              </a>
                            );
                          case 2:
                            return (
                              <a target={'_blank'} href={(service.response.includes('https')  || service.response.includes('http') )? service.response : `https://${service.response}`}>
                                <FontAwesomeIcon
                                  size="1x"
                                  icon={faTwitter}
                                  style={{marginLeft: 5}}
                                />
                              </a>
                            );
                          case 3:
                            return (
                              <a target={'_blank'} href={(service.response.includes('https')  || service.response.includes('http') )? service.response : `https://${service.response}`}>
                                <FontAwesomeIcon
                                  size="1x"
                                  icon={faInstagram}
                                  style={{marginLeft: 5}}
                                />
                              </a>
                            );
                          case 4:
                            return (
                              <a target={'_blank'} href={(service.response.includes('https')  || service.response.includes('http') )? service.response : `https://${service.response}`}>
                                <FontAwesomeIcon
                                  size="1x"
                                  icon={faYoutube}
                                  style={{marginLeft: 5}}
                                />
                              </a>
                            );
                          case 5:
                            return (
                              <a target={'_blank'} href={(service.response.includes('https')  || service.response.includes('http') )? service.response : `https://${service.response}`}>
                                <FontAwesomeIcon
                                  size="1x"
                                  icon={faBlog}
                                  style={{marginLeft: 5}}
                                />
                              </a>
                            );
                          default:
                            return <></>;
                        }
                      },
                    )} */}
                  </small>
                </div>
              </div>
            )}
          </Col>
        </Row>
        <hr className="my-4 blick-border" />
        <Row>
          <Col>
            Links Submitted:
            <div style={{ flexDirection: 'column' }}>
              {selectedInfluencer.campaignInfluencerServices &&
                selectedInfluencer.campaignInfluencerServices.map(
                  service => {
                    if (service.response)
                      switch (service.socialChannelsId) {
                        case 1:
                          return (
                            <div className="service_response_parent">
                              <FontAwesomeIcon
                                size="1x"
                                icon={faFacebook}
                                style={{ marginLeft: 5 }}
                              />
                          &nbsp;
                          Facebook:
                          &nbsp;
                              <a target={'_blank'} href={(service.response.includes('https') || service.response.includes('http')) ? service.response : `https://${service.response}`}>
                                {service.response}
                              </a>
                            </div>
                          );
                        case 2:
                          return (
                            <div className="service_response_parent">
                              <FontAwesomeIcon
                                size="1x"
                                icon={faTwitter}
                                style={{ marginLeft: 5 }}
                              />
                            &nbsp;
                            Twitter:
                            &nbsp;
                              <a target={'_blank'} href={(service.response.includes('https') || service.response.includes('http')) ? service.response : `https://${service.response}`}>
                                {service.response}
                              </a>
                            </div>
                          );
                        case 3:
                          return (
                            <div className="service_response_parent">
                              <FontAwesomeIcon
                                size="1x"
                                icon={faInstagram}
                                style={{ marginLeft: 5 }}
                              />
                            &nbsp;
                            Instagram:
                            &nbsp;
                              <a target={'_blank'} href={(service.response.includes('https') || service.response.includes('http')) ? service.response : `https://${service.response}`}>
                                {service.response}
                              </a>
                            </div>
                          );
                        case 4:
                          return (
                            <div className="service_response_parent">
                              <FontAwesomeIcon
                                size="1x"
                                icon={faYoutube}
                                style={{ marginLeft: 5 }}
                              />
                            &nbsp;
                            Youtube:
                            &nbsp;
                              <a target={'_blank'} href={(service.response.includes('https') || service.response.includes('http')) ? service.response : `https://${service.response}`}>
                                {service.response}
                              </a>
                            </div>
                          );
                        case 5:
                          return (
                            <div className="service_response_parent">
                              <FontAwesomeIcon
                                size="1x"
                                icon={faBlog}
                                style={{ marginLeft: 5 }}
                              />
                            &nbsp;
                            Blog:
                            &nbsp;
                              <a target={'_blank'} href={(service.response.includes('https') || service.response.includes('http')) ? service.response : `https://${service.response}`}>
                                {service.response}
                              </a>
                            </div>
                          );
                        default:
                          return <></>;
                      }
                  },
                )}
            </div>
          </Col>
        </Row>
        <hr className="my-4 blick-border" />
        <Row>
          <Col>
            Feedback
            <small className="text-muted d-block">
              {(selectedInfluencer && selectedInfluencer.feedback) || ''}
            </small>
          </Col>
        </Row>
        <hr className="my-4 blick-border" />
        <Row>
          <Col>
            {((selectedInfluencer.ratings &&
              selectedInfluencer.ratings.length > 0) || (selectedInfluencer.campaignStatusId !== CampaignStatus.DECLINED)) &&
              <div>Review</div>}
            <small className="mb-2 d-block">
              {selectedInfluencer.ratings &&
                selectedInfluencer.ratings.length > 0 ? (
                  <StarRatings
                    rating={selectedInfluencer.ratings[0].rating}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    starDimension="15px"
                    name="rating"
                  />
                ) : selectedInfluencer.campaignStatusId !== CampaignStatus.DECLINED && (
                  <StarRatings
                    rating={rating}
                    starRatedColor="blue"
                    changeRating={value => {
                      setRating(value);
                    }}
                    numberOfStars={5}
                    starDimension="30px"
                    name="rating"
                  />
                )}
            </small>
            {selectedInfluencer.reviews &&
              selectedInfluencer.reviews.length > 0 ? (
                <small className="text-muted d-block">
                  {selectedInfluencer.reviews[0].review}
                </small>
              ) : selectedInfluencer.campaignStatusId !== CampaignStatus.DECLINED && (
                <FormControl
                  as="textarea"
                  className="bg-transparent text-white"
                  aria-label="With textarea"
                  placeholder="Enter feedback here"
                  onChange={value => setFeedback(value.target.value)}
                />
              )}
          </Col>
        </Row>
        <Row>
          <Col>{renderAcceptButton()}</Col>
        </Row>
      </PaperCard>}
    </>
  );
};

Details.propTypes = {
  match: PropTypes.any,
  selectedCampaign: PropTypes.any,
  verifyCampaign: PropTypes.func,
  declineCampaign: PropTypes.func,
  fetchCampaigns: PropTypes.func,
  reviewSubmitting: PropTypes.bool,
  ratingSubmitting: PropTypes.bool,
  verifySubmitting: PropTypes.bool,
  getSelectedCampaign: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectedCampaign: makeSelectCampaign(),
  reviewSubmitting: makeSelectReviewSubmitting(),
  ratingSubmitting: makeSelectRatingSubmitting(),
  verifySubmitting: makeSelectVerifySubmitting(),
  declineSubmitting: makeSelectDeclineSubmitting()
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCampaigns: () => dispatch(fetchCampaignAction()),
    getSelectedCampaign: id => dispatch(getSelectedCampaignAction(id)),
    verifyCampaign: (campaignsId, influencerId, rating, feedback) =>
      dispatch(
        verifyCampaignAction(campaignsId, influencerId, rating, feedback),
      ),
    declineCampaign: (campaignsId,
      influencerId,
      campaignInfluencerId,
      rating,
      feedback) =>
      dispatch(declineCampaignAction(campaignsId,
        influencerId,
        campaignInfluencerId,
        rating,
        feedback)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  withRouter,
)(Details);
