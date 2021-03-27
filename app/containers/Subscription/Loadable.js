/**
 *
 * Asynchronously loads the component for Subscription
 *
 */

import loadable from 'utils/loadable';
import LoadingIndicator from "../../components/LoadingIndicator";
import React from "react";

export const SubscriptionPlans = loadable(() => import('./index'), {
  fallback: <LoadingIndicator/>,
});

export const SubscriptionSuccess = loadable(() => import('./success'), {
  fallback: <LoadingIndicator/>,
});
