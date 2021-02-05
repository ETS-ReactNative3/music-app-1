import PropTypes from 'prop-types';
import React, {memo, useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShare} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import {makeSelectInfluencerDetails} from '../../containers/App/selectors';
import {
  makeSelectActivities,
  makeSelectRatingCount,
  makeSelectRatings,
  makeSelectRecentReviews,
} from '../../containers/MyAccount/selectors';
import {RatingView} from '../Rating/RatingView';
import Reviews from '../Reviews/Reviews';
import {createDifferenenceTimeString} from '../../utils/index';
import {fetchUserActivities} from '../../containers/MyAccount/actions';
import accountReducer from '../../containers/MyAccount/reducer';
import accountSaga from '../../containers/MyAccount/saga';
import {useInjectSaga} from '../../utils/injectSaga';
import {useInjectReducer} from '../../utils/injectReducer';

const InfluencerAccount = (
  {
    influencerProfile,
    ratings,
    ratingCount,
    reviews,
    getUserActivities,
    userId,
    showActivites
  }) => {
  useInjectSaga({key: 'account', saga: accountSaga});
  useInjectReducer({key: 'account', reducer: accountReducer});
  useEffect(() => {
    if (userId) {
      getUserActivities(userId);
    }
  }, [userId]);

  return (
    <>

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
          .map((review, index) => (
            <Reviews
              key={index}
              name={review.campaignInfluencers.campaigns.song.user.name}
              time={createDifferenenceTimeString(
                review.createdDate,
                new Date().toString(),
              )}
              message={review.review}
            />
          ))}
      </div>

      {showActivites && <div className="text-right">
        <small>
          <Link className="text-success" to="/myaccount/reviews">
            View more{' '}
            <FontAwesomeIcon icon={faShare} className="text-success"/>
          </Link>
        </small>
      </div>}
    </>
  );
};

InfluencerAccount.propTypes = {
  navigation: PropTypes.any,
  influencerProfile: PropTypes.any,
  ratings: PropTypes.any,
  reviews: PropTypes.any,
  activities: PropTypes.array,
  showActivites: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  influencerProfile: makeSelectInfluencerDetails(),
  ratings: makeSelectRatings(),
  ratingCount: makeSelectRatingCount(),
  reviews: makeSelectRecentReviews(),
  activities: makeSelectActivities(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserActivities: influencerId => dispatch(fetchUserActivities(influencerId)),
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
