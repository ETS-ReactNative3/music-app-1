import React, { useRef, useState, useEffect } from 'react';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
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
  const headerRef = useRef('');
  const SEARCH_URI = 'https://bliiink.ga/albums/search/album/';

  const listenScrollEvent = e => {
    if (window.scrollY > 50) {
      headerRef.current.classList.add('bg-nav-bar');
    } else {
      headerRef.current.classList.remove('bg-nav-bar');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  }, []);

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

  const handleSideBar = () => {
    document.body.classList.toggle('sidebar-collapse');
  };

  return (

    <nav className="main-header navbar navbar-expand  navbar-dark" ref={headerRef} role="navigation">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="javascript:void(0)" onClick={handleSideBar} role="button"><FontAwesomeIcon icon={faBars} /></a>
          </li>
        </ul>
        <div className="input-group ml-5">
          <div className="input-group-prepend">
              <button className="btn btn-navbar bg-transparent text-white" type="button">
                <FontAwesomeIcon icon={faSearch} />
              </button>
          </div>
          <AsyncTypeahead
            id="async-example"
            className="autocomplete-box border-bottom blick-border flex-grow-1"
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
      </nav>
         
  );
};

export default TopNavBar;
