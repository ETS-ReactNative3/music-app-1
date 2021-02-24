/**
 *
 * Asynchronously loads the component for Artist
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
