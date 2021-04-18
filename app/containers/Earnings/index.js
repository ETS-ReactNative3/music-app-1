/**
 *
 * Earnings
 *
 */

import React, {memo, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

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
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from "react-bootstrap-table-next";

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

  useEffect(() => {
    fetchSongStats()
    fetchSupportedCount()
    fetchStreamCost()
    fetchUserCentricCost()
  }, []);

  const columns = [
    {
      dataField: 'title',
      text: 'Title',
      style: {
        width: '25%',
      },
      headerStyle: {
        width: '25%',
      },
    },
    {
      dataField: 'count',
      text: 'Count',
      style: {
        width: '25%',
      },
      headerStyle: {
        width: '25%',
      },
    },
    {
      dataField: 'id',
      text: 'Cost',
      formatter: costFormatter,
      style: {
        width: '25%',
      },
      headerStyle: {
        width: '25%',
      },
    },
  ]

  function costFormatter(cell, row, rowIndex, formatExtraData) {
    return `$${row.count * perStreamCost}`
  }

  return <PaperCard title="Earnings">
    <div className="row">
      <div className="col">
        <BootstrapTable
          striped
          bordered={false}
          bootstrap4
          pagination={paginationFactory()}
          keyField="id"
          data={songs}
          columns={columns}
        />
      </div>
    </div>
    <div className="row">
      <div className="col">
        <div className="card bg-dark">
          <div className="card-body profile-user-box">
            <div className="row">
              <div className="col-sm-8">
                <h3>Support Earnings</h3>
                <p>Total Supporters = {supportedCount}</p>
                <p>Total Earning = {userCentricCost}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
