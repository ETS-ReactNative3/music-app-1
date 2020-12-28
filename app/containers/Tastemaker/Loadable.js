/**
 *
 * Asynchronously loads the component for Tastemaker
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
