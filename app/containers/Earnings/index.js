/**
 *
 * Earnings
 *
 */

import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUsers, faCoins, faMusic, faMoneyBill} from '@fortawesome/free-solid-svg-icons';
import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';
import {
  makeSelectEarningsPerStreamCost,
  makeSelectEarningsSongs,
  makeSelectEarningsSupportedUserCount, makeSelectEarningsUserCentricCost
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {getMySupportedArtists, getPerStreamCost, getSongsStats, getUserCentricCost} from "./actions";
import PaperCard from "../../components/PaperCard";
import "./index.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export function Earnings(
  {
    fetchSongStats,
    songs,
    fetchSupportedCount,
    supportedCount,
    fetchStreamCost,
    perStreamCost,
    fetchUserCentricCost,
    userCentricCost
  }) {
  useInjectReducer({key: 'earnings', reducer});
  useInjectSaga({key: 'earnings', saga});

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    fetchSongStats()
    fetchSupportedCount()
    fetchStreamCost()
    fetchUserCentricCost()
  }, []);

  return <PaperCard title="Earnings">
    <div className="float-right">
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        dateFormat="MM/yyyy"
        className="form-control"
        showMonthYearPicker
        showFullMonthYearPicker
      />
    </div>
    <section className="streaming pt-4 mb-4">
      <div className="row">
        {songs.map(item =>
          <div className="col-md-4 mt-3">
            <div className="card bg-dark overflow-hidden">
              <div className="card-body profile-user-box">
                <div className="row">
                  <div className="col-8">
                    <h4>{item.title}</h4>
                    <h2 className="font-weight-bolder">{item.count}</h2>
                    <h4 className="text-success">${(item.count * perStreamCost).toFixed(2)}</h4>
                  </div>
                  <div className="col-4">
                    <div className="card-body-icon">
                      <FontAwesomeIcon icon={faMusic} size="lg" className="mr-2 earningIcon"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
    <section className="supporter pt-4">
      <div className="row">
        <div className="col">
          <div className="card bg-dark overflow-hidden">
            <div className="card-body profile-user-box">
              <div className="row">
                <div className="col">
                  <h2>Support Earnings</h2>
                </div>
                <div className="col">
                  <div className="card-body-icon">
                    <FontAwesomeIcon icon={faMoneyBill} size="lg" className="mr-2 earningIcon rotate-icon"/>
                  </div>
                </div>
              </div>
              <div className="row py-4">
                <div className="col-md-4">
                  <FontAwesomeIcon icon={faUsers} size="lg" className="mr-2 earningIcon"/>
                  <span className="font-weight-bold pl-3">Total Supporters <span
                    className="px-4">=</span> <span className="text-success">{supportedCount}</span></span>
                </div>
                <div className="col-4">
                  <FontAwesomeIcon icon={faCoins} size="lg" className="mr-2"/>
                  <span className="font-weight-bold pl-3">
                        <span>Total Earning</span><span className="px-4">=</span><span
                    className="text-success">{userCentricCost}</span>
                      </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </PaperCard>;
}

Earnings.propTypes = {
  fetchSongStats: PropTypes.func.isRequired,
  fetchStreamCost: PropTypes.func.isRequired,
  fetchSupportedCount: PropTypes.func.isRequired,
  fetchUserCentricCost: PropTypes.func.isRequired,
  songs: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  songs: makeSelectEarningsSongs(),
  supportedCount: makeSelectEarningsSupportedUserCount(),
  perStreamCost: makeSelectEarningsPerStreamCost(),
  userCentricCost: makeSelectEarningsUserCentricCost()
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSongStats: () => dispatch(getSongsStats()),
    fetchSupportedCount: () => dispatch(getMySupportedArtists()),
    fetchStreamCost: () => dispatch(getPerStreamCost()),
    fetchUserCentricCost: () => dispatch(getUserCentricCost())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Earnings);
