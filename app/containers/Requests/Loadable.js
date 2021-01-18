/**
 *
 * Asynchronously loads the component for Playlist
 *
 */

import loadable from 'utils/loadable';
import React from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';

export const MyAccount = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
