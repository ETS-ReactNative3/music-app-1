/**
 *
 * Asynchronously loads the component for Playlist
 *
 */

import loadable from 'utils/loadable';
import React from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';

export const Plan = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});

export const PlanDetails = loadable(() => import('./detail'), {
  fallback: <LoadingIndicator />,
});
