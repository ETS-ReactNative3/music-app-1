import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the album state domain
 */

const selectAccountDomain = state => state.account || initialState;

/**
 * Default selector used by Album
 */

const makeSelectActivities = () =>
  createSelector(
    selectAccountDomain,
    substate => substate.activities,
  );

  const makeSelectReviews = () =>
  createSelector(
    selectAccountDomain,
    substate => {
      console.log(substate);
      return substate.reviews
    });

  const makeSelectRatings = () =>
  createSelector(
    selectAccountDomain,
    substate => substate.ratings,
  );

  const makeSelectRatingCount = () =>
  createSelector(
    selectAccountDomain,
    substate => substate.ratingCount,
  );


export {
  makeSelectActivities,
  makeSelectReviews,
  makeSelectRatings,
  makeSelectRatingCount
};

