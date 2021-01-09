/**
 *
 * Asynchronously loads the component for Influencer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
