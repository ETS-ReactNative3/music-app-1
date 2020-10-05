import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './index.scss';

const HomePageHeader = () => {
  console.log(messages);
  return (
    <div className="d-flex position-absolute w-100 px-5 py-4 top-header-box">
      <div className="border-bottom border-light flex-grow-1">
        <div className="input-box">
          <FontAwesomeIcon icon={faSearch} size="1x" className="search-icon" />
          <FormattedMessage {...messages.searchPlaceholder}>
            {formattedValue => (
              <input
                type="text"
                name="search"
                id="search"
                className="px-3 py-2"
                placeholder={formattedValue}
              />
            )}
          </FormattedMessage>
        </div>
      </div>
      <div className="user-name flex-grow-1 text-right">
        <img
          src={require(`./../../images/user-img.jpg`)}
          alt=""
          className="rounded-circle px-3"
        />
        Jenny Thomas
      </div>
    </div>
  );
};

export default HomePageHeader;
