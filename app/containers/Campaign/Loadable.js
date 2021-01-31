/**
 *
 * Asynchronously loads the component for Song
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export const InfluencerVerify = loadable(() => import('./influencerVerify.js'), {
  fallback: <LoadingIndicator />,
});
