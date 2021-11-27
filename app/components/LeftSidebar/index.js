import {faFulcrum, faGetPocket} from '@fortawesome/free-brands-svg-icons';
import {
  faFolderOpen,
  faGlobe,
  faHeadphonesAlt,
  faQuestionCircle,
  faMusic,
  faPlusSquare,
  faUser,
  faWallet,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import LogoPng from '../../images/logo.png';
import './index.scss';
import Button from "react-bootstrap/Button";

function LeftSideBar({role, isInfluencer, userDetails}) {
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
          <span className="d-flex justify-content-center beta-tag">Beta Version</span>
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
                      <p className="d-inline-block m-0">Publish/Manage Songs</p>
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
                  <li className="nav-item rounded-lg">
                    <Link to="/library" className="nav-link mb-1">
                      <FontAwesomeIcon icon={faFolderOpen} className="mr-2"/>
                      <p className="d-inline-block m-0">Your library</p>
                    </Link>
                  </li>
                  <li className="nav-item rounded-lg">
                    <Link to="/browse" className="nav-link mb-1">
                      <FontAwesomeIcon icon={faGlobe} className="mr-2"/>
                      <p className="d-inline-block m-0">Browse music</p>
                    </Link>
                  </li>
                  <li className="nav-item rounded-lg">
                    <Link to="/faq" className="nav-link mb-1">
                      <FontAwesomeIcon icon={faQuestionCircle} className="mr-2"/>
                      <p className="d-inline-block m-0">FAQ</p>
                    </Link>
                  </li>
                  {/*<li className="nav-item rounded-lg">*/}
                  {/*  <Link to="/patron" className="nav-link mb-1">*/}
                  {/*    <FontAwesomeIcon icon={faMoneyBill} className="mr-2"/>*/}
                  {/*    <p className="d-inline-block m-0">My Patronage</p>*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
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
                  <li className="nav-item rounded-lg">
                    <Link to="/library" className="nav-link mb-1">
                      <FontAwesomeIcon icon={faFolderOpen} className="mr-2"/>
                      <p className="d-inline-block m-0">Your library</p>
                    </Link>
                  </li>
                  <li className="nav-item rounded-lg">
                    <Link to="/browse" className="nav-link mb-1">
                      <FontAwesomeIcon icon={faGlobe} className="mr-2"/>
                      <p className="d-inline-block m-0">Browse music</p>
                    </Link>
                  </li>
                  <li className="nav-item rounded-lg">
                    <Link to="/faq" className="nav-link mb-1">
                      <FontAwesomeIcon icon={faQuestionCircle} className="mr-2"/>
                      <p className="d-inline-block m-0">FAQ</p>
                    </Link>
                  </li>
                  {/*<li className="nav-item rounded-lg">*/}
                  {/*  <Link to="/patron" className="nav-link mb-1">*/}
                  {/*    <FontAwesomeIcon icon={faMoneyBill} className="mr-2"/>*/}
                  {/*    <p className="d-inline-block m-0">My Patronage</p>*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
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
                  <li className="nav-item rounded-lg">
                    <Link
                      to="/admin/users"
                      className="nav-link mb-1"
                    >
                      <FontAwesomeIcon icon={faUser} className="mr-2"/>
                      <p className="d-inline-block m-0">Users</p>
                    </Link>
                  </li>
                  <li className="nav-item rounded-lg">
                    <Link
                      to="/admin/albums"
                      className="nav-link mb-1"
                    >
                      <FontAwesomeIcon icon={faHeadphonesAlt} className="mr-2"/>
                      <p className="d-inline-block m-0">Albums</p>
                    </Link>
                  </li>
                  <li className="nav-item rounded-lg">
                    <Link
                      to="/admin/campaigns/disputed"
                      className="nav-link mb-1"
                    >
                      <FontAwesomeIcon icon={faWallet} className="mr-2"/>
                      <p className="d-inline-block m-0">Disputed campaigns</p>
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
              <li className="nav-item rounded-lg">
                <Link to="/faq" className="nav-link mb-1">
                  <FontAwesomeIcon icon={faQuestionCircle} className="mr-2"/>
                  <p className="d-inline-block m-0">FAQ</p>
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
      {userDetails ? (<Link to="/subscription-plans" className="d-md-none">
          <Button variant="success" className="badge-button mx-2">Subscribe</Button>
        </Link>) :
        <div className="mt-2">
          <Link to="/auth/login" className="d-md-none">
            <Button variant="outline-success" className="badge-button mr-2">Sign in</Button>
          </Link>
          <Link to="/auth/register" className="d-md-none">
            <Button variant="success" className="badge-button">Create Account</Button>
          </Link>
        </div>}
    </aside>
  );
}

LeftSideBar.propTypes = {
  role: PropTypes.any,
  isInfluencer: PropTypes.any,
};
export default LeftSideBar;
