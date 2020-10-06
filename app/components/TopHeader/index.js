import React from 'react';
import { Link } from 'react-router-dom';

import LeftNav from '../LeftNav';
import './index.scss';

const TopHeader = () => {
  return (
    <>
      <LeftNav />
      <div className="d-flex bg-header px-5 py-4">
        <div className="align-self-center">
          <Link to="/">
            <img src={require(`./../../images/logo.png`)} alt="" />
          </Link>
        </div>
        <div className="ml-auto user-name">
          {/* <img
            src={require(`./../../images/user-img.jpg`)}
            alt=""
            className="rounded-circle px-3"
          />
          Jenny Thomas */}
        </div>
      </div>
    </>
  );
};

export default TopHeader;
