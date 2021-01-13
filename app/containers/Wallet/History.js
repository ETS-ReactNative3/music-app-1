import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { fetchPaymentHistoryAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import {makeSelectPaymentHistory} from './selectors';
import format from "date-fns/format";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const WalletHistory = ({
  paymentHistory,
  fetchPaymentHistory
}) => {
  useInjectReducer({ key: 'wallet', reducer });
  useInjectSaga({ key: 'wallet', saga });

  React.useEffect(() => {
    fetchPaymentHistory();
  }, []);
  
  function dateFormatter(cell, row, rowIndex, formatExtraData) {
    console.log(row.updatedAt);
    return format(new Date(row.updatedAt), 'MM/dd/yyyy');
  }

  const columns = [{
    dataField: 'amount',
    text: 'Amount'
  }, {
    dataField: 'currency',
    text: 'Currency'
  }, {
    dataField: 'orderStatus.title',
    text: 'Status'
  }, {
    dataField: 'updatedAt',
    text: 'Release Date',
    formatter: dateFormatter,
  }];

  return (
    <div className="container-fluid" style={{ marginTop: '100px' }}>
      <div className="row album-detail">
        <div className="col pt-3 pt-md-0">
          <div className="row">
            <div className="col">
              <h1>Request to be an influencer</h1>
            </div>
          </div>
        </div>
      </div>
      <div>
      <BootstrapTable
            striped
            bordered={false}
            bootstrap4
            pagination={paginationFactory()}
            keyField='id'
            data={paymentHistory}
            columns={columns}/>
      </div>
    </div>
  )
}


WalletHistory.propTypes = {
  paymentHistory: PropTypes.any,
  fetchPaymentHistory: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  paymentHistory: makeSelectPaymentHistory()
});

function mapDispatchToProps(dispatch) {
  return {
    fetchPaymentHistory: () => dispatch(fetchPaymentHistoryAction())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WalletHistory);
