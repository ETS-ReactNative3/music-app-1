/**
 *
 * Playlist
 *
 */

import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import MyActivity from '../../components/MyActivity/MyActivity';
import Reviews from '../../components/Reviews/Reviews';
import { createDifferenenceTimeString } from '../../utils/index';
import { makeSelectReviews } from '../MyAccount/selectors';

function AllReviews({ reviewsToShow }) {
  return (
    <div className="container-fluid" style={{ marginTop: '100px' }}>
      <div className="row album-detail">
        <div className="col pt-3 pt-md-0">
          <div className="row">
            <div className="col">
              <h1>Reviews:</h1>
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: '50%' }}>
        {reviewsToShow &&
          reviewsToShow.map(review => (
            <Reviews name={review.campaignInfluencersId} time={createDifferenenceTimeString(review.createdDate, new Date().toString())} message={review.review} />
          )
          )}
      </div>
    </div>
  );
}

AllReviews.propTypes = {
  reviewsToShow: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  reviewsToShow: makeSelectReviews(),
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
)(AllReviews);
