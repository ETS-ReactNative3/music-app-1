import React, {useRef, useState} from 'react';
import {
  faSearch,
  faBars,
  faUsers,
  faWallet,
  faUserAlt,
  faMoneyBillWave,
  faLandmark
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Typeahead, withAsync} from 'react-bootstrap-typeahead';
import {redirectOnAlbum} from '../../utils/redirect';
import request from '../../utils/request';
import './index.scss';
import {Link, useHistory} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import PlanSvg from '../../images/svg/plan_icon.svg';
import AvatarSvg from '../../images/user.svg';
import Button from 'react-bootstrap/Button';
import {Image} from 'react-bootstrap';
import {server} from '../../../config';
import {debounce} from 'lodash';

const AsyncTypeahead = withAsync(Typeahead);

const TopNavBar = ({userDetails, putUserDetails}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const searchRef = useRef(null);
  const headerRef = useRef('');
  const SEARCH_URI = `${server.apiURL}albums/search/album/`;
  const history = useHistory();

  const handleSearch = query => {
    setIsLoading(true);
    request(`${SEARCH_URI}${query}`).then(response => {
      let options = response.albums.map(i => ({
        avatar_url: i.artwork,
        id: i.id,
        login: i.title,
        slug: i.slug,
        type: 'album'
      }));

      options = options.concat(
        response.artists.map(i => ({
          avatar_url: i.avatar,
          id: i.id,
          login: i.name,
          slug: i.id,
          type: 'artist'
        })),
      );

      setOptions(options);
      setIsLoading(false);
    });
  };

  const handleSideBar = () => {
    document.body.classList.toggle('sidebar-collapse');
  };

  const onInputChangeSelection = value => {
    if (value[0].type === 'album') redirectOnAlbum(value[0].slug);
    else history.push(`/artist/${value[0].slug}`)
    searchRef.current.clear();
  };

  const logout = () => {
    putUserDetails(null);

    localStorage.removeItem('token');
    history.push('/auth/login');
    location.reload();
  };

  const searchEnhancer = debounce(searchValue => {
    handleSearch(searchValue);
  }, 500);

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
        <div className="search ml-md-5">
          <span className="searchIcon">
            <FontAwesomeIcon icon={faSearch}/>
          </span>
          <AsyncTypeahead
            id="async-example"
            useCache
            isLoading={isLoading}
            labelKey="login"
            minLength={3}
            onSearch={searchEnhancer}
            options={options}
            placeholder="Search for albums, artists, genres"
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
        <div className="right">
          {userDetails ? (
            <>
              <Link to="/subscription-plans" className="d-none d-md-inline-block">
                <Button variant="success" className="badge-button mr-2">Subscribe</Button>
              </Link>
              <Dropdown className="d-inline">
                <Dropdown.Toggle as="button" id="dropdown-basic"
                                 className="badge-button btn btn-outline-success text-white">
                  <div>
                  <span className="avatar rounded-circle">
                    <Image
                      width={24}
                      height={24}
                      roundedCircle
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = AvatarSvg;
                      }}
                      src={userDetails.avatar}
                      alt="avatar-image"
                    />
                  </span>
                    <span className="p-2">{userDetails.name}</span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/myaccount">
                    <FontAwesomeIcon icon={faUserAlt} className="mr-2"/>
                    My profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/wallet">
                    <FontAwesomeIcon icon={faWallet} className="mr-2"/>
                    Wallet -{' '}
                    <img src={PlanSvg} alt="wallet Logo" width={17} height={17}/>{' '}
                    {userDetails.credit}
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/wallet/history">
                    <FontAwesomeIcon icon={faLandmark} className="mr-2"/>
                    Transactions
                  </Dropdown.Item>
                  {userDetails.roleId === 1 &&
                    <Dropdown.Item as={Link} to="/user/supportedArtist">
                      <FontAwesomeIcon icon={faUsers} className="mr-2"/>
                      Supported Artists
                    </Dropdown.Item>
                  }
                  {userDetails.roleId === 2 &&
                  <>
                    <Dropdown.Item as={Link} to="/team">
                      <FontAwesomeIcon icon={faUsers} className="mr-2"/>
                      My Teams
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/earnings">
                      <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2"/>
                      My Earnings
                    </Dropdown.Item>
                  </>
                  }
                  <Dropdown.Divider/>
                  <Dropdown.Item className="cursor-pointer" onClick={logout}>
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="d-none d-md-inline-block">
                <Button variant="outline-success" className="badge-button mr-2">Sign in</Button>
              </Link>
              <Link to="/auth/register" className="d-none d-md-inline-block">
                <Button variant="success" className="badge-button">Create Account</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
