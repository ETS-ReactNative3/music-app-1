import React, { useRef, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import { Typeahead, withAsync } from 'react-bootstrap-typeahead';
import history from '../../utils/history';

import messages from './messages';
import request from '../../utils/request';
import './index.scss';

const AsyncTypeahead = withAsync(Typeahead);

const TopNavBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const searchRef = useRef(null);
  const SEARCH_URI = 'https://bliiink.ga/albums/search/album/';

  const handleSearch = query => {
    setIsLoading(true);
    request(`${SEARCH_URI}${query}`).then(response => {
      const options = response.map(i => ({
        avatar_url: i.artwork,
        id: i.id,
        login: i.title,
        slug: i.slug,
      }));

      setOptions(options);
      setIsLoading(false);
    });
  };

  const redirect = ele => {
    setOptions([]);
    history.replace(`/album/${ele.slug}`);
  };

  return (
          
    <div class="input-group">
  <div class="input-group-prepend">
    <span class="input-group-text search-icon-prepend" id="basic-addon1"><FontAwesomeIcon icon={faSearch} color="#ffffff" /></span>
  </div>
  <AsyncTypeahead
            id="async-example"
            className="autocomplete-box border-bottom blick-border"
            useCache={true}
            isLoading={isLoading}
            labelKey="login"
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder="Search for an album"
            renderMenuItemChildren={option => (
              <div onClick={() => redirect(option)}>
                <img
                  alt={option.login}
                  src={option.avatar_url}
                  style={{
                    height: '24px',
                    marginRight: '10px',
                    width: '24px',
                  }}
                />
                <span>{option.login}</span>
              </div>
            )}
          />
</div>
         
  );
};

export default TopNavBar;
