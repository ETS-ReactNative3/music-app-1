import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadphonesAlt,
  faMusic,
  faWindowClose,
  faPlusSquare,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './index.scss';

function LeftSideBar({ role }) {
  const handleSideBar = () => {
    document.body.classList.toggle('sidebar-collapse');
  };

  return (
    <aside className="main-sidebar bg-sidebar elevation-4 fixed-top h-100 shadow-lg">
      <span
        className="ipad-close fixed-top cursor-pointer"
        onClick={handleSideBar}
      >
        <FontAwesomeIcon icon={faWindowClose} size="3x" color="#ffffff" />
      </span>

      <div className="d-flex pl-3 py-3">
        <Link to="/">
          <img
            src={require(`./../../images/logo.png`)}
            alt="AdminLTE Logo"
            className="logo-size"
          />
        </Link>
      </div>
      <div className="sidebar px-2">
        <nav className="mt-3 navbar-dark">
          {role === 'artist' ? (
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/songList" className="nav-link mb-1">
                  <FontAwesomeIcon icon={faMusic} className="mr-2" />
                  <p className="d-inline-block m-0">My Songs</p>
                </Link>
              </li>
              <li className="nav-item rounded-lg">
                <Link to="/albumList" className="nav-link mb-1">
                  <FontAwesomeIcon icon={faHeadphonesAlt} className="mr-2" />
                  <p className="d-inline-block m-0">My Albums</p>
                </Link>
              </li>
              <li className="nav-item rounded-lg">
                <Link to="/playlists" className="nav-link mb-1">
                  <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
                  <p className="d-inline-block m-0">My Playlists</p>
                </Link>
              </li>
            </ul>
          ) : (
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item rounded-lg">
                <Link to="/playlists" className="nav-link mb-1">
                  <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
                  <p className="d-inline-block m-0">My Playlists</p>
                </Link>
              </li>
              <li className="nav-item rounded-lg">
                <Link to="/become-an-influencer" className="nav-link mb-1">
                  <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
                  <p className="d-inline-block m-0">Become An Influencer</p>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </aside>
  );
}

export default LeftSideBar;
