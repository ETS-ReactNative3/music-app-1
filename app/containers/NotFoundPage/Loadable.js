/**
 * Asynchronously loads the component for NotFoundPage
 */

import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export const NotFoundPage = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});

export const UnAuthorized = loadable(() => import('./unAuthorized'), {
  fallback: <LoadingIndicator />,
});
