/**
 *
 * Asynchronously loads the component for ArtistList
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
