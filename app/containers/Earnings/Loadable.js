/**
 *
 * Asynchronously loads the component for Earnings
 *
 */

import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';
import React from "react";

export const Earnings = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
