import React, {useRef, useState} from 'react';
import {faSearch, faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Typeahead, withAsync} from 'react-bootstrap-typeahead';
import {redirectOnAlbum} from '../../utils/redirect';

import request from '../../utils/request';
import './index.scss';
import {Link, useHistory} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import PlanSvg from '../../images/svg/plan_icon.svg';
import Button from 'react-bootstrap/Button';

const AsyncTypeahead = withAsync(Typeahead);

const TopNavBar = ({userDetails, putUserDetails}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const searchRef = useRef(null);
  const headerRef = useRef('');
  const SEARCH_URI = 'https://bliiink.ga/albums/search/album/';
  const history = useHistory();

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

  const handleSideBar = () => {
    document.body.classList.toggle('sidebar-collapse');
  };

  const onInputChangeSelection = value => {
    redirectOnAlbum(value[0].slug);
    searchRef.current.clear();
  };

  const logout = () => {
    putUserDetails(null);

    localStorage.removeItem('token');
    history.push('/auth/login');
  };

  return (
    <header>
      <div
        className="main-header fixed-top navbar navbar-expand navbar-dark p-sm-1"
        ref={headerRef}
        role="navigation"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <span
              className="nav-link cursor-pointer"
              data-widget="pushmenu"
              onClick={handleSideBar}
              role="button"
            >
              <FontAwesomeIcon icon={faBars}/>
            </span>
          </li>
        </ul>
        <div className="input-group ml-md-5">
          <div className="input-group-prepend">
            <button
              className="btn btn-navbar bg-transparent text-white"
              type="button"
            >
              <FontAwesomeIcon icon={faSearch}/>
            </button>
          </div>
          <AsyncTypeahead
            id="async-example"
            className="autocomplete-box border-bottom blick-border border-top-0 border-right-0 border-left-0 flex-grow-1"
            useCache
            isLoading={isLoading}
            labelKey="login"
            minLength={3}
            onSearch={handleSearch}
            options={options}
            placeholder="Search for an album"
            ref={searchRef}
            onChange={onInputChangeSelection}
            renderMenuItemChildren={option => (
              <div>
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
        <div className="pl-5">
          {userDetails ? (
            <Dropdown>
              <Dropdown.Toggle as="a" id="dropdown-basic">
                <span className="badge badge-pill badge-dark p-2">
                  {userDetails.name}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/myaccount">
                  My profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/wallet">
                  Wallet -{' '}
                  <img
                    src={PlanSvg}
                    alt="wallet Logo"
                    width={17}
                    height={17}
                  />{' '}
                  {userDetails.credit}
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item className="cursor-pointer" onClick={logout}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Link to="/auth/login">
              <Button variant="success">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
