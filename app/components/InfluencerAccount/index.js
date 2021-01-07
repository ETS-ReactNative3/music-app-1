import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { makeSelectInfluencerDetails } from '../../containers/App/selectors';
import { makeSelectActivities, makeSelectRatingCount, makeSelectRatings, makeSelectReviews } from '../../containers/MyAccount/selectors';
import MyActivity from '../MyActivity/MyActivity';
import { RatingView } from '../Rating/RatingView';
import Reviews from '../Reviews/Reviews';
import { createDifferenenceTimeString } from '../../utils/index';
import { Link } from 'react-router-dom';

const InfluencerAccount = ({
  navigation,
  influencerProfile,
  ratings,
  ratingCount,
  reviews,
  activities,
}) => (
    <>
      <div>
        <div style={{ marginLeft: 10 }}>Service Information</div>
        <div style={{ marginLeft: 10, fontSize: 12, color: 'grey' }}>{influencerProfile.description}</div>
      </div>

      <div
        style={{
          margin: 20,
          marginLeft: 10,
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
        }}>
        <div style={{ borderWidth: 0, borderRightWidth: 2, borderColor: 'green', borderStyle: 'solid', flex: 1 }}>
          <div><>Activites</><a href="/myaccount/activites" style={{ marginLeft: '50%' }}>View more<FontAwesomeIcon icon={faShare} size="x" color="green" /></a></div>
          {activities && activities.map(activity => <MyActivity imagePath={activity.campaigns.song.artwork} name={activity.campaigns.song.title} rate={activity.campaigns.song.duration || '3.53'} role={activity.campaigns.user.name} />)}
          {activities && activities.length === 0 && <div style={{ fontSize: 10, color: 'grey' }}>No Activities to show</div>}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ marginLeft: 10 }}>Rating and Reviews<Link to="/myaccount/reviews" style={{ marginLeft: '50%' }}>View more<FontAwesomeIcon icon={faShare} size="x" color="green" /></Link></div>
          <RatingView ratingScore={ratings} totalCount={ratingCount} totalRating={5} />
          {reviews && reviews.map(review =>
            <Reviews name={review.campaignInfluencersId} time={createDifferenenceTimeString(review.createdDate, new Date().toString())} message={review.review} />

          )}
        </div>
      </div>
    </>
  )

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
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(InfluencerAccount);
