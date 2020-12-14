import React from 'react';
import {Link} from "react-router-dom";

function Outer({children}) {
  return (
    <main className="outer-container" role="main">
      <div className="container py-5">
        <div className="d-flex justify-content-center mb-5">
          <Link to="/">
            <img
              src={require(`./../../images/logo.png`)}
              alt="Bliiink Logo"
              className="logo-size"
            />
          </Link>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="card card-lg bg-dark mb-5">
              <div className="card-body">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Outer;
