import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Collapse } from 'react-bootstrap';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './index.scss';

function LeftNav() {
  const [open, setOpen] = useState(false);
  console.log(open);

  return (
    <>
      <Collapse in={!open}>
        <div className="sidebar-menu">
          <a
            href="javascript:void(0);"
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <FontAwesomeIcon icon={faBars} color="#ffffff" />
          </a>
        </div>
      </Collapse>
      <Collapse in={open}>
        <div id="mySidebar" className="sidebar">
          <a
            href="javascript:void(0)"
            className=""
            onClick={() => setOpen(!open)}
          >
            ×
          </a>

          <a href="#" className="logo-icon">
            <img src={require(`./../../images/logo-icon.png`)} alt="" />
          </a>

          <a href="#">
            <img src={require(`./../../images/nav-icon1.png`)} />
          </a>

          <a href="#">
            <img src={require(`./../../images/nav-icon2.png`)} />
          </a>

          <a href="#">
            <img src={require(`./../../images/nav-icon3.png`)} />
          </a>

          <a href="#">
            <img src={require(`./../../images/nav-icon4.png`)} />
          </a>

          <a href="#">
            <img src={require(`./../../images/nav-icon5.png`)} />
          </a>

          <a href="#">
            <img src={require(`./../../images/nav-icon6.png`)} />
          </a>

          <a href="#">
            <img src={require(`./../../images/nav-icon7.png`)} />
          </a>
        </div>
      </Collapse>
    </>
  );
}

export default LeftNav;
