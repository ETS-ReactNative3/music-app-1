/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.HomePage';
export const scopeGlobal = 'boilerplate.containers.App';

export default defineMessages({
  featuredAlbumHeading: {
    id: `${scopeGlobal}.FeaturedAlbum.heading`,
    defaultMessage: 'Featured Albums',
  },
  latestPostsHeading: {
    id: `${scopeGlobal}.LatestPosts.heading`,
    defaultMessage: 'Latest Posts',
  },
  songListHeading: {
    id: `${scopeGlobal}.SongList.heading`,
    defaultMessage: 'Weekly Top 12',
  },
  newReleasesHeading: {
    id: `${scopeGlobal}.NewReleases.heading`,
    defaultMessage: 'New Releases',
  },
  recommendedAlbumHeading: {
    id: `${scopeGlobal}.RecommendedAlbum.heading`,
    defaultMessage: 'Recommended For You',
  },
});
