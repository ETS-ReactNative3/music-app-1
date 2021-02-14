import {faFulcrum, faGetPocket} from '@fortawesome/free-brands-svg-icons';
import {
  faHeadphonesAlt,
  faMusic,
  faPlusSquare,
  faWallet,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoPng from '../../images/logo.png';
import './index.scss';

function LeftSideBar({role, isInfluencer}) {
  const handleSideBar = () => {
    document.body.classList.toggle('sidebar-collapse');
  };

  return (
    <aside className="main-sidebar bg-sidebar elevation-4 fixed-top h-100 shadow-lg">
      <span
        className="ipad-close fixed-top cursor-pointer"
        onClick={handleSideBar}
      >
        <FontAwesomeIcon icon={faWindowClose} size="3x" color="#ffffff"/>
      </span>

      <div className="d-flex pl-3 py-3">
        <Link to="/">
          <img src={LogoPng} alt="AdminLTE Logo" className="logo-size"/>
        </Link>
      </div>
      <div className="sidebar px-2">
        <nav className="mt-3 navbar-dark">
          {role ? (
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {role === 'artist' ? (
                <>
                  <li className="nav-item">
                    <Link to="/songList" className="nav-link mb-1">
                      <FontAwesomeIcon icon={faMusic} className="mr-2"/>
                      <p className="d-inline-block m-0">My Songs</p>
                    </Link>
                  </li>
                  <li className="nav-item rounded-lg">
                    <Link to="/albumList" className="nav-link mb-1">
                      <FontAwesomeIcon
                        icon={faHeadphonesAlt}
                        className="mr-2"
                      />
                      <p className="d-inline-block m-0">My Albums</p>
                    </Link>
                  </li>
                  <li className="nav-item rounded-lg">
                    <Link to="/playlists" className="nav-link mb-1">
                      <FontAwesomeIcon icon={faPlusSquare} className="mr-2"/>
                      <p className="d-inline-block m-0">My Playlists</p>
                    </Link>
                  </li>

                  <li className="nav-item rounded-lg">
                    <Link to="/campaigns" className="nav-link mb-1">
                      <FontAwesomeIcon icon={faWallet} className="mr-2"/>
                      <p className="d-inline-block m-0">Campaigns</p>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item rounded-lg">
                    <Link to="/playlists" className="nav-link mb-1">
                      <FontAwesomeIcon icon={faPlusSquare} className="mr-2"/>
                      <p className="d-inline-block m-0">My Playlists</p>
                    </Link>
                  </li>

                  {isInfluencer ? (
                    <li className="nav-item rounded-lg">
                      <Link to="/requests" className="nav-link mb-1">
                        <FontAwesomeIcon icon={faGetPocket} className="mr-2"/>
                        <p className="d-inline-block m-0">Requests</p>
                      </Link>
                    </li>
                  ) : (
                    <></>
                  )}
                </>
              )}
              {role === 'administrator' && (
                <>
                  <li className="nav-item rounded-lg">
                    <Link
                      to="/admin/tastemakers/requests"
                      className="nav-link mb-1"
                    >
                      <FontAwesomeIcon icon={faGetPocket} className="mr-2"/>
                      <p className="d-inline-block m-0">Tastemaker Requests</p>
                    </Link>
                  </li>
                  <li className="nav-item rounded-lg">
                    <Link
                      to="/admin/tastemakers/withdrawal/requests"
                      className="nav-link mb-1"
                    >
                      <FontAwesomeIcon icon={faFulcrum} className="mr-2"/>
                      <p className="d-inline-block m-0">Withdrawal Requests</p>
                    </Link>
                  </li>
                </>
              )}
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
                  <FontAwesomeIcon icon={faPlusSquare} className="mr-2"/>
                  <p className="d-inline-block m-0">My Playlists</p>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </aside>
  );
}

LeftSideBar.propTypes = {
  role: PropTypes.any,
  isInfluencer: PropTypes.any,
};
export default LeftSideBar;
