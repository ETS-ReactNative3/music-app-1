/**
 *
 * Asynchronously loads the component for BankForm
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
