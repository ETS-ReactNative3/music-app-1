/**
 *
 * Asynchronously loads the component for Wallet
 *
 */

import loadable from 'utils/loadable';
import React from 'react';
import LoadingIndicator from '../../components/LoadingIndicator';

export const Wallet = loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});

export const OrderSuccess = loadable(() => import('./success'), {
  fallback: <LoadingIndicator />,
});
