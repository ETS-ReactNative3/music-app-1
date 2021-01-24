import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { makeSelectInfluencerDetails } from '../../containers/App/selectors';
import {
  makeSelectActivities,
  makeSelectRatingCount,
  makeSelectRatings,
  makeSelectReviews,
} from '../../containers/MyAccount/selectors';
import MyActivity from '../MyActivity/MyActivity';
import { RatingView } from '../Rating/RatingView';
import Reviews from '../Reviews/Reviews';
import { createDifferenenceTimeString } from '../../utils/index';
import { fetchUserActivities } from '../../containers/MyAccount/actions';
import accountReducer from '../../containers/MyAccount/reducer';
import accountSaga from '../../containers/MyAccount/saga';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';
import styles from './index.styles';

const InfluencerAccount = ({
  navigation,
  influencerProfile,
  ratings,
  ratingCount,
  reviews,
  activities,
  getUserActivities,
  userId,
}) => {
  useInjectSaga({ key: 'account', saga: accountSaga });
  useInjectReducer({ key: 'account', reducer: accountReducer });
  React.useEffect(() => {
    if (userId) {
      getUserActivities(userId);
    }
  }, [userId]);

  return (
    <>
      <h5>Service Information</h5>
      <div className="mb-3">{influencerProfile.description}</div>
      <div>
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <div>Rating and Reviews</div>
        </div>
        <div>
          <RatingView
            ratingScore={ratings}
            totalCount={ratingCount}
            totalRating={5}
          />
          {reviews &&
            reviews
              .slice(0, 3)
              .map((review, index) => (
                <Reviews
                  key={index}
                  name={review.campaignInfluencersId}
                  time={createDifferenenceTimeString(
                    review.createdDate,
                    new Date().toString(),
                  )}
                  message={review.review}
                />
              ))}
        </div>

        <div className="text-right">
          <small>
            <Link className="text-success" to="/myaccount/reviews">
              View more{' '}
              <FontAwesomeIcon icon={faShare} className="text-success" />
            </Link>
          </small>
        </div>
      </div>
      <hr className="blick-border" />
      <div>
        <div className="mb-3 d-flex align-items-center justify-content-between">
          <div>Activites</div>
          <div>
            <small>
              <Link className="text-success" to="/myaccount/activites">
                View more{' '}
                <FontAwesomeIcon icon={faShare} className="text-success" />
              </Link>
            </small>
          </div>
        </div>
        {activities &&
          activities.slice(0, 3).map((activity, index) => (
            <>
              <MyActivity
                key={index}
                imagePath={activity.campaigns.song.artwork}
                name={activity.campaigns.song.title}
                rate={activity.campaigns.song.duration || '3.53'}
                role={activity.campaigns.user.name}
              />
              <Container fluid>
                <Row className="justify-content-center">
                  <Col md={6}>
                    <hr className="blick-border" />
                  </Col>
                </Row>
              </Container>
            </>
          ))}
        {activities && activities.length === 0 && (
          <small className="text-muted">No Activities to show</small>
        )}
      </div>

      {/* <div>
        <div style={{ marginLeft: 10 }}>Service Information</div>
        <div style={styles.descriptionTextStyle}>
          {influencerProfile.description}
        </div>
      </div>

      <div style={styles.ratingReviewParent}>
        <div style={styles.activitesParent}>
          <div style={styles.activitesTextStyle}>
            <>Activites</>
            <a href="/myaccount/activites" style={{}}>
              View more
              <FontAwesomeIcon icon={faShare} size="1x" color="green" />
            </a>
          </div>
          {activities &&
            activities
              .slice(0, 3)
              .map((activity, index) => (
                <MyActivity
                  key={index}
                  imagePath={activity.campaigns.song.artwork}
                  name={activity.campaigns.song.title}
                  rate={activity.campaigns.song.duration || '3.53'}
                  role={activity.campaigns.user.name}
                />
              ))}
          {activities && activities.length === 0 && (
            <div style={{ fontSize: 10, color: 'grey' }}>
              No Activities to show
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <div style={styles.ratingTextStyle}>
            Rating and Reviews
            <Link to="/myaccount/reviews" style={{}}>
              View more
              <FontAwesomeIcon icon={faShare} size="1x" color="green" />
            </Link>
          </div>
          <RatingView
            ratingScore={ratings}
            totalCount={ratingCount}
            totalRating={5}
          />
          {reviews &&
            reviews
              .slice(0, 3)
              .map((review, index) => (
                <Reviews
                  key={index}
                  name={review.campaignInfluencersId}
                  time={createDifferenenceTimeString(
                    review.createdDate,
                    new Date().toString(),
                  )}
                  message={review.review}
                />
              ))}
        </div>
      </div>
     */}
    </>
  );
};

InfluencerAccount.propTypes = {
  navigation: PropTypes.any,
  influencerProfile: PropTypes.any,
  ratings: PropTypes.any,
  reviews: PropTypes.any,
  activities: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  influencerProfile: makeSelectInfluencerDetails(),
  ratings: makeSelectRatings(),
  ratingCount: makeSelectRatingCount(),
  reviews: makeSelectReviews(),
  activities: makeSelectActivities(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserActivities: userId => dispatch(fetchUserActivities(userId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InfluencerAccount);
