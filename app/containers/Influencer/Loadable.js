/**
 *
 * Asynchronously loads the component for Influencer
 *
 */

import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';
import React from "react";

export const InfluencerRequestForm = loadable(() => import('./requestForm'), {
  fallback: <LoadingIndicator/>,
});

export const Influencer = loadable(() => import('./index'), {
  fallback: <LoadingIndicator/>,
});
