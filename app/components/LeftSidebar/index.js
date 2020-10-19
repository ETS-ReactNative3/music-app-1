import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadphonesAlt,
  faMusic,
  faCog,
  faWindowClose,
  faMicrophone,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import routes from '../../utils/routes.json';
import './index.scss';

function LeftSideBar() {
  const handleSideBar = () => {
    document.body.classList.toggle('sidebar-collapse');
  };
  return (
    <aside className="main-sidebar bg-sidebar elevation-4 fixed-top h-100 shadow-lg">
      <a href="javascript:void(0);" className="ipad-close fixed-top" onClick={handleSideBar}><FontAwesomeIcon icon={faWindowClose} size="3x" color="#ffffff" /></a>
    
    <div className="d-flex pl-3 py-3">
    <Link to="/" >
      <img src={require(`./../../images/logo.png`)} alt="AdminLTE Logo" className="logo-size" />
      </Link>
    </div>    
    <div className="sidebar px-2">
      
      <nav className="mt-3 navbar-dark">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          
          <li className="nav-item">
            <Link to="/" className="nav-link mb-1">
              <FontAwesomeIcon icon={faMusic} className="mr-2" />
              <p className="d-inline-block m-0">
              Music
              </p>
            </Link>
          </li>
          <li className="nav-item rounded-lg">
            <Link to="/" className="nav-link mb-1">
            <FontAwesomeIcon icon={faHeadphonesAlt} className="mr-2" />
              <p className="d-inline-block m-0">
              Headphone
              </p>
            </Link>
          </li>
          <li className="nav-item rounded-lg">
            <Link to="/" className="nav-link mb-1">
            <FontAwesomeIcon icon={faMicrophone} className="mr-2" />
              <p className="d-inline-block m-0">
              Microphone
              </p>
            </Link>
          </li>
          <li className="nav-item rounded-lg">
            <Link to="/" className="nav-link mb-1">
            <FontAwesomeIcon icon={faCog} className="mr-2" />
              <p className="d-inline-block m-0">
              Settings
              </p>
            </Link>
          </li>
          </ul>
      </nav>
      
    </div>
    
  </aside>
  
    
  );
}

export default LeftSideBar;
