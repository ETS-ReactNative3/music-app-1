import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadphonesAlt,
  faMusic,
  faCog,
  faMicrophone,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import './index.scss';

function LeftSideBar() {
  return (
    <aside className="main-sidebar fixed-top min-vh-100">
      <div className="d-flex justify-content-center py-3 border-bottom blick-border">
        <Link to="/">
          <img src={require(`./../../images/logo.png`)} alt="" />
        </Link>
      </div>
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
          <li class="nav-item">
            <a href="pages/widgets.html" class="nav-link">
              <FontAwesomeIcon icon={faMusic} color="#ffffff" />
              <div className="d-inline-block mx-2 text-white li-label">
                Music
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a href="pages/widgets.html" class="nav-link">
              <FontAwesomeIcon icon={faHeadphonesAlt} color="#ffffff" />
              <div className="d-inline-block mx-2 text-white li-label">
                Headphone
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a href="pages/widgets.html" class="nav-link">
              <FontAwesomeIcon icon={faMicrophone} color="#ffffff" />
              <div className="d-inline-block mx-2 text-white li-label">
                Microphone
              </div>
            </a>
          </li>
          <li class="nav-item">
            <a href="pages/widgets.html" class="nav-link">
              <FontAwesomeIcon icon={faCog} color="#ffffff" />
              <div className="d-inline-block mx-2 text-white li-label">
                Settings
              </div>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default LeftSideBar;
