import React, { memo } from 'react';
import { Button, FormControl, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import defaultImage from '../../images/album-3.jpg';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { updateCampaignStatusAction } from '../Requests/actions';
import { CampaignStatus } from '../Requests/constants';
import requestReducer from '../Requests/reducer';
import requestSaga from '../Requests/saga';
import {
  addInfluencerRatingAction,
  addInfluencerReviewAction,
  getSelectedCampaignAction,
  verifyCampaignAction,
} from './actions';
import styles from './index.styles';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCampaign } from './selectors';
import { toast } from 'react-toastify';

const Details = ({
  match,
  selectedCampaign,
  verifyCampaign,
  updateCampaignStatus,
  addRating,
  addReview,
}) => {
  useInjectReducer({ key: 'tastemaker', reducer });
  useInjectReducer({ key: 'request', reducer: requestReducer });
  useInjectSaga({ key: 'tastemaker', saga });
  useInjectSaga({ key: 'request', saga: requestSaga });

  const [rating, setRating] = React.useState(0);
  const [feedback, setFeedback] = React.useState('');
  const [selectedInfluencer, setSelectedInfluencer] = React.useState({});
  React.useEffect(() => {
    if (match.params.influencerId) {
      setSelectedInfluencer(
        selectedCampaign.campaignInfluencers.find(
          influencer => influencer.id === Number(match.params.influencerId),
        ),
      );
    }
  }, [match.params.influencerId]);

  return (
    <div className="container-fluid" style={{ marginTop: '100px' }}>
      <div className="row album-detail">
        <div className="col pt-3 pt-md-0">
          <div className="row">
            <div className="col">
              <h1>Campaign Influencer Verification</h1>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={styles.selectedDataParent}>
          <h3>Influencer:</h3>
          {selectedInfluencer && selectedInfluencer.influencer && (
            <div style={{ marginLeft: 10 }}>
              <div style={styles.selectedSongParent}>
                <Image
                  width={100}
                  height={100}
                  src={selectedInfluencer.influencer.user.avatar || ''}
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = defaultImage;
                  }}
                />
                <div style={styles.songInfo}>
                  <div>{selectedInfluencer.influencer.user.name}</div>
                  <div style={{ color: 'grey' }}>
                    {selectedInfluencer.influencer.description}
                  </div>
                  <div style={{ color: 'grey' }}>
                    {selectedInfluencer.influencer.helpArtistDescription}
                  </div>
                </div>
              </div>
            </div>
          )}

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
                          <Link to={service.response}>{service.response}</Link>
                        </div>
                      );
                    case 2:
                      return (
                        <div>
                          {' '}
                          Twitter:{' '}
                          <Link to={service.response}>{service.response}</Link>
                        </div>
                      );
                    case 3:
                      return (
                        <div>
                          {' '}
                          Instagram:{' '}
                          <Link to={service.response}>{service.response}</Link>
                        </div>
                      );
                    case 4:
                      return (
                        <div>
                          {' '}
                          Youtube:{' '}
                          <Link to={service.response}>{service.response}</Link>
                        </div>
                      );
                    case 5:
                      return (
                        <div>
                          {' '}
                          Blog:{' '}
                          <Link to={service.response}>{service.response}</Link>
                        </div>
                      );
                    default: return <></>
                  }
                })}
            </div>
          </div>

          {selectedInfluencer.campaignStatusId !== CampaignStatus.DECLINED ? (
            <div style={styles.buttonParent}>
              <Button
                variant="success"
                onClick={() =>
                  verifyCampaign(selectedCampaign.id, selectedInfluencer.id)
                }
              >
                Verify this influencer
              </Button>
              <Button
                variant="danger"
                onClick={() =>
                  updateCampaignStatus(
                    selectedCampaign.id,
                    CampaignStatus.DECLINED,
                  )
                }
              >
                Decline
              </Button>
            </div>
          ) : (
              <div style={styles.alreadyDeclinedStyle}>
                You Already declined this request!!
              </div>
            )}
          <div style={styles.provideFeedbackParentStyle}>
            You can provide rating and feedback for influencer here:
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
              <Button
                style={styles.submitRatingButtonStyle}
                variant="success"
                onClick={() => {
                  if (rating > 0) {
                    addRating(
                      selectedCampaign.id,
                      selectedInfluencer.id,
                      rating,
                    );
                  } else {
                    toast.error('Please enter rating');
                  }
                }}
              >
                Submit Rating
              </Button>
            </div>
            <div style={styles.horizontalLineStyle} />
            <div style={styles.feedbackParentStyle}>
              <FormControl
                as="textarea"
                aria-label="With textarea"
                placeholder="Enter feedback here"
                onChange={value => setFeedback(value.target.value)}
              />
              <Button
                style={styles.submitFeedbackButtonStyle}
                variant="success"
                onClick={() => {
                  if (feedback !== '') {
                    addReview(
                      selectedCampaign.id,
                      selectedInfluencer.id,
                      feedback,
                    );
                  } else {
                    toast.error('Please enter review');
                  }
                }}
              >
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Details.propTypes = {
  match: PropTypes.any,
  selectedCampaign: PropTypes.any,
  verifyCampaign: PropTypes.func,
  updateCampaignStatus: PropTypes.func,
  addRating: PropTypes.func,
  addReview: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  selectedCampaign: makeSelectCampaign(),
});

function mapDispatchToProps(dispatch) {
  return {
    getSelectedCampaign: id => dispatch(getSelectedCampaignAction(id)),
    verifyCampaign: (campaignId, influencerId) =>
      dispatch(verifyCampaignAction({ campaignId, influencerId })),
    updateCampaignStatus: (campaignId, statusId) =>
      dispatch(updateCampaignStatusAction(campaignId, statusId)),
    addReview: (campaignsId, influencerId, review) =>
      dispatch(
        addInfluencerReviewAction({ campaignsId, influencerId, review }),
      ),
    addRating: (campaignsId, influencerId, rating) =>
      dispatch(
        addInfluencerRatingAction({ campaignsId, influencerId, rating }),
      ),
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
