/**
 *
 * Asynchronously loads the component for Song
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export const AlbumList = loadable(() => import('./AlbumList'), {
  fallback: <LoadingIndicator />,
});

export const AlbumForm = loadable(() => import('./Form'), {
  fallback: <LoadingIndicator />,
});

export const Album = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
