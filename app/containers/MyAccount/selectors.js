import {createSelector} from 'reselect';
import {initialState} from './reducer';

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
    substate => substate.reviews,
  );

const makeSelectRecentReviews = () =>
  createSelector(
    selectAccountDomain,
    substate => substate.reviews.slice(0, 3),
  );

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

const makeSelectUpdateProcessing = () =>
  createSelector(
    selectAccountDomain,
    substate => substate.updateProcessing,
  );

const makeSelectInfluencerUpdateProcessing = () =>
  createSelector(
    selectAccountDomain,
    substate => substate.updateInfluencerProcessing,
  );


const makeSelectUserCountries = () =>
createSelector(
  selectAccountDomain,
  substate => substate.countries,
);

export {
  makeSelectActivities,
  makeSelectReviews,
  makeSelectRatings,
  makeSelectRatingCount,
  makeSelectUpdateProcessing,
  makeSelectInfluencerUpdateProcessing,
  makeSelectRecentReviews,
  makeSelectUserCountries
};
