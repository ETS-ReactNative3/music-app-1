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
  return <div className="tasteMakerStatsContainer">
    <h3 className="mb-3">Activity on Bliiink</h3>
    <div className="d-flex">
      <div className="float-left mr-3"><FontAwesomeIcon icon={faComment}/></div>
      <div className="float-left">
        <h6>{stats.answeredTotal} answers given</h6>
        <h6 className="text-muted">Since signing up</h6>
      </div>
    </div>
    <div className="d-flex">
      <div className="float-left mr-3"><FontAwesomeIcon icon={faChartBar}/></div>
      <div>
        <h6>{stats.answerRate}% answer rate</h6>
        <h6 className="text-muted">Last 30 days</h6>
      </div>
    </div>
    <div className="d-flex">
      <div className="float-left mr-3"><FontAwesomeIcon icon={faChartPie}/></div>
      <div>
        <h6>{stats.acceptedRate}% acceptation rate</h6>
        <h6 className="text-muted">Since signing up</h6>
      </div>
    </div>
  </div>;
}

TasteMakerStats.propTypes = {
  stats: PropTypes.any
};

export default memo(TasteMakerStats);
