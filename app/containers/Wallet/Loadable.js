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

export const History = loadable(() => import('./History'), {
  fallback: <LoadingIndicator />,
});

export const WalletWithdrawal = loadable(() => import('./WithdrawalRequest'), {
  fallback: <LoadingIndicator />,
});
