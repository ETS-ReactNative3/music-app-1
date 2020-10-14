import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './index.scss';

const TopNavBar = () => {
  return (
    <div className="d-flex top-header-box w-100 px-5">
      <div className="border-bottom blick-border border-light">
        <div className="input-box">
          <FontAwesomeIcon icon={faSearch} size="1x" className="search-icon" />
          <FormattedMessage {...messages.searchPlaceholder}>
            {formattedValue => (
              <input
                type="text"
                name="search"
                id="search"
                className="px-3 py-2 text-white"
                placeholder={formattedValue}
              />
            )}
          </FormattedMessage>
        </div>
      </div>
      <div className="user-name flex-grow-1 text-right" />
    </div>
  );
};

export default TopNavBar;
