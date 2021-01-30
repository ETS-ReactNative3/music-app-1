/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
  faBlog,
} from '@fortawesome/free-brands-svg-icons';
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
import { updateCampaignStatusAction } from '../Requests/actions';
import { CampaignStatus } from '../Requests/constants';
import requestReducer from '../Requests/reducer';
import requestSaga from '../Requests/saga';
import {
  fetchCampaignAction,
  getSelectedCampaignAction,
  verifyCampaignAction,
} from './actions';
import styles from './index.styles';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCampaign,
  makeSelectRatingSubmitting,
  makeSelectReviewSubmitting,
  makeSelectVerifySubmitting,
} from './selectors';

const Details = ({
  match,
  selectedCampaign,
  verifyCampaign,
  updateCampaignStatus,
  fetchCampaigns,
  reviewSubmitting,
  ratingSubmitting,
  getSelectedCampaign,
  verifySubmitting,
}) => {
  useInjectReducer({ key: 'campaign', reducer });
  useInjectReducer({ key: 'request', reducer: requestReducer });
  useInjectSaga({ key: 'campaign', saga });
  useInjectSaga({ key: 'request', saga: requestSaga });
  useInjectReducer({ key: 'album', reducer: albumReducer });

  const [rating, setRating] = React.useState(0);
  const [feedback, setFeedback] = React.useState('');
  const [selectedInfluencer, setSelectedInfluencer] = React.useState({});
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
    }
  }, [match.params.influencerId && selectedCampaign]);

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
    return (
      <>
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
          Verify this influencer
          {verifySubmitting && <Spinner animation="border" />}
        </Button>
        {/* {!verifySubmitting ? (
          <Button
            variant="warning"
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
            Verify this influencer
          </Button>
        ) : (
          <Spinner animation="border" />
        )} */}
        <Button
          variant="danger"
          onClick={() =>
            updateCampaignStatus(selectedCampaign.id, CampaignStatus.DECLINED)
          }
        >
          Decline
        </Button>
      </>
    );
  };

  return (
    <>
      <PaperCard title="Campaign Influencer Verification">
        <div style={{ color: 'white' }}>
          <Link to="/campaigns">Campaigns</Link> {'>>'} <Link to={`/campaigns/${selectedCampaign.id}`}>Campaigns Details</Link> {'>>'} <Link style={{ pointerEvents: 'none', opacity: 0.7, color: 'grey' }} to={''}>Campaign Influencer Verification</Link>
        </div>
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
                    {selectedInfluencer.campaignInfluencerServices &&
                      selectedInfluencer.campaignInfluencerServices.map(
                        service => {
                          switch (service.socialChannelsId) {
                            case 1:
                              return (
                                <Link to={service.response}>
                                  <FontAwesomeIcon
                                    size="1x"
                                    icon={faFacebook}
                                    style={{ marginLeft: 5 }}
                                  />
                                </Link>
                              );
                            case 2:
                              return (
                                <Link to={service.response}>
                                  <FontAwesomeIcon
                                    size="1x"
                                    icon={faTwitter}
                                    style={{ marginLeft: 5 }}
                                  />
                                </Link>
                              );
                            case 3:
                              return (
                                <Link to={service.response}>
                                  <FontAwesomeIcon
                                    size="1x"
                                    icon={faInstagram}
                                    style={{ marginLeft: 5 }}
                                  />
                                </Link>
                              );
                            case 4:
                              return (
                                <Link to={service.response}>
                                  <FontAwesomeIcon
                                    size="1x"
                                    icon={faYoutube}
                                    style={{ marginLeft: 5 }}
                                  />
                                </Link>
                              );
                            case 5:
                              return (
                                <Link to={service.response}>
                                  <FontAwesomeIcon
                                    size="1x"
                                    icon={faBlog}
                                    style={{ marginLeft: 5 }}
                                  />
                                </Link>
                              );
                            default:
                              return <></>;
                          }
                        },
                      )}
                  </small>
                </div>
              </div>
            )}
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
            Review
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
                ) : (
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
              ) : (
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
      </PaperCard>
      {/* <div className="container-fluid" style={{ marginTop: '100px' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
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
          <div style={styles.selectedDataParent}>
            <div style={{ marginTop: 20 }}>
              <h3>Feedback:</h3>
              <h5 style={{ color: 'grey' }}>
                {(selectedInfluencer && selectedInfluencer.feedback) || ''}
              </h5>
            </div>

            <div style={{ marginTop: 20 }}>
              <h3>Social Links:</h3>
              <div>
                {selectedInfluencer.campaignInfluencerServices &&
                  selectedInfluencer.campaignInfluencerServices.map(service => {
                    switch (service.socialChannelsId) {
                      case 1:
                        return (
                          <div>
                            {' '}
                            Facebook:{' '}
                            <Link to={service.response}>
                              {service.response}
                            </Link>
                          </div>
                        );
                      case 2:
                        return (
                          <div>
                            {' '}
                            Twitter:{' '}
                            <Link to={service.response}>
                              {service.response}
                            </Link>
                          </div>
                        );
                      case 3:
                        return (
                          <div>
                            {' '}
                            Instagram:{' '}
                            <Link to={service.response}>
                              {service.response}
                            </Link>
                          </div>
                        );
                      case 4:
                        return (
                          <div>
                            {' '}
                            Youtube:{' '}
                            <Link to={service.response}>
                              {service.response}
                            </Link>
                          </div>
                        );
                      case 5:
                        return (
                          <div>
                            {' '}
                            Blog:{' '}
                            <Link to={service.response}>
                              {service.response}
                            </Link>
                          </div>
                        );
                      default:
                        return <></>;
                    }
                  })}
              </div>
            </div>
            <div style={styles.provideFeedbackParentStyle}>
              Rating and Feedback:
              {selectedInfluencer.ratings &&
              selectedInfluencer.ratings.length > 0 ? (
                <div style={styles.starRatingStyle}>
                  <StarRatings
                    rating={selectedInfluencer.ratings[0].rating}
                    starRatedColor="blue"
                    changeRating={() => {
                      // setRating(value);
                    }}
                    numberOfStars={5}
                    starDimension="30px"
                    name="rating"
                  />
                </div>
              ) : (
                <div style={styles.starRatingStyle}>
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
                  {/* <Button
                    style={styles.submitRatingButtonStyle}
                    variant="success"
                    onClick={() => {
                      if (rating > 0) {
                        addRating(
                          selectedCampaign.id,
                          selectedInfluencer.influencerId,
                          rating,
                        );
                      } else {
                        toast.error('Please enter rating');
                      }
                    }}
                  >
                    Submit Rating
                  </Button> */}
      {/*
                </div>
              )}
              <div style={styles.horizontalLineStyle} />
              {selectedInfluencer.reviews &&
              selectedInfluencer.reviews.length > 0 ? (
                <div style={styles.feedbackTextStyle}>
                  Feedback: {selectedInfluencer.reviews[0].review}
                </div>
              ) : (
                <div style={styles.feedbackParentStyle}>
                  <FormControl
                    as="textarea"
                    aria-label="With textarea"
                    placeholder="Enter feedback here"
                    onChange={value => setFeedback(value.target.value)}
                  />
                  {/* <Button
                    style={styles.submitFeedbackButtonStyle}
                    variant="success"
                    onClick={() => {
                      if (feedback !== '') {
                        addReview(
                          selectedCampaign.id,
                          selectedInfluencer.influencerId,
                          feedback,
                        );
                      } else {
                        toast.error('Please enter review');
                      }
                    }}
                  >
                    Submit Feedback
                  </Button> */}
      {/*
                </div>
              )}
            </div>
            {renderAcceptButton()}
          </div>
        </div>
      </div>
     */}
    </>
  );
};

Details.propTypes = {
  match: PropTypes.any,
  selectedCampaign: PropTypes.any,
  verifyCampaign: PropTypes.func,
  updateCampaignStatus: PropTypes.func,
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
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCampaigns: () => dispatch(fetchCampaignAction()),
    getSelectedCampaign: id => dispatch(getSelectedCampaignAction(id)),
    verifyCampaign: (campaignsId, influencerId, rating, feedback) =>
      dispatch(
        verifyCampaignAction(campaignsId, influencerId, rating, feedback),
      ),
    updateCampaignStatus: (campaignId, statusId) =>
      dispatch(updateCampaignStatusAction(campaignId, statusId)),
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
