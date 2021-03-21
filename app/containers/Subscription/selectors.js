import {createSelector} from 'reselect';
import {initialState} from './reducer';

/**
 * Direct selector to the subscription state domain
 */

const selectSubscriptionDomain = state => state.subscription || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Subscription
 */

const makeSelectSubscriptionLoader = () =>
  createSelector(
    selectSubscriptionDomain,
    substate => substate.loader,
  );

const makeSelectSubscriptionPlans = () =>
  createSelector(
    selectSubscriptionDomain,
    substate => substate.plans,
  );

export {selectSubscriptionDomain, makeSelectSubscriptionLoader, makeSelectSubscriptionPlans};
