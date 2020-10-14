/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.HomePageHeader';

export default defineMessages({
  searchPlaceholder: {
    id: `${scope}.search.placeholder`,
    defaultMessage: 'Search for an album',
  },
});
