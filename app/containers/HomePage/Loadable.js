/**
 * Asynchronously loads the component for HomePage
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export const Homepage = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});

export const WeeklyPlaylist = loadable(() => import('./weeklyPlaylist'), {
  fallback: <LoadingIndicator />,
});
