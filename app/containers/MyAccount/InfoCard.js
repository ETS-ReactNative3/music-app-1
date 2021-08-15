import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

export const InfoCard = ({title, message, buttonTitle, linkTo}) => {
  return (
    <div className="row mb-3">
      <div className="col-sm-12">
        <div className="card bg-dark">
          <div className="card-body profile-user-box">
            <div className="row">
              <div className="col-sm-12">
                <div className="text-center">
                  <h2>
                    {title}
                  </h2>
                  <p className="mt-3">
                    {message}
                  </p>
                  {buttonTitle !== '' && <Link to={linkTo}>
                    <Button className="mt-2" variant="success">
                      {buttonTitle}
                    </Button>
                  </Link>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

InfoCard.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  buttonTitle: PropTypes.string,
  linkTo: PropTypes.string
}
