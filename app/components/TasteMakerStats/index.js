/**
 *
 * TasteMakerStats
 *
 */

import React, {memo} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartBar, faComment} from '@fortawesome/free-regular-svg-icons';
import {faChartPie} from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

function TasteMakerStats({stats}) {
  return stats ? <div className="card bg-dark mb-3">
    <div className="card-header">
      <h5 className="card-title mb-0">Activity on Bliiink</h5>
    </div>
    <div className="card-body">
      <ul className="list-unstyled mb-0">
        <li className="mb-2">
          <div className="d-inline-block mr-2">
            <FontAwesomeIcon icon={faComment} size={'lg'}/>
          </div>
          <div className="d-inline-block align-middle">
            <h5>{stats.answeredTotal} answers given</h5>
            <h5 className="text-muted">Since signing up</h5>
          </div>
        </li>
        <li className="mb-2">
          <div className="d-inline-block mr-2">
            <FontAwesomeIcon icon={faChartBar} size={'lg'}/>
          </div>
          <div className="d-inline-block align-middle">
            <h5>{stats.answerRate}% answer rate</h5>
            <h5 className="text-muted">Last 30 days</h5>
          </div>
        </li>
        <li className="mb-2">
          <div className="d-inline-block mr-2">
            <FontAwesomeIcon icon={faChartPie} size={'lg'}/>
          </div>
          <div className="d-inline-block align-middle">
            <h5>{stats.acceptedRate}% acceptation rate</h5>
            <h5 className="text-muted">Since signing up</h5>
          </div>
        </li>
      </ul>
    </div>
  </div> : <></>;
}

TasteMakerStats.propTypes = {
  stats: PropTypes.any
};

export default memo(TasteMakerStats);
