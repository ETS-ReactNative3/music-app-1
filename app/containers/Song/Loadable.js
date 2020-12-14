/**
 *
 * Asynchronously loads the component for Song
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export const SongList = loadable(() => import('./SongList'), {
  fallback: <LoadingIndicator />,
});

export const SongForm = loadable(() => import('./Form'), {
  fallback: <LoadingIndicator />,
});
