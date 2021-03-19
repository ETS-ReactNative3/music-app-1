/**
 *
 * Asynchronously loads the component for Song
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export const UserList = loadable(() => import('./index'), {
  fallback: <LoadingIndicator/>,
});
