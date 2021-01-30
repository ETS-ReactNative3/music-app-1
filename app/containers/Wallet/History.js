import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import format from 'date-fns/format';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import PaperCard from '../../components/PaperCard';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { fetchPaymentHistoryAction } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectPaymentHistory } from './selectors';
import { Button } from 'react-bootstrap';
import history from '../../utils/history';

const WalletHistory = ({ paymentHistory, fetchPaymentHistory }) => {
  useInjectReducer({ key: 'wallet', reducer });
  useInjectSaga({ key: 'wallet', saga });

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  // eslint-disable-next-line no-unused-vars
  function dateFormatter(cell, row, rowIndex, formatExtraData) {
    return format(new Date(row.updatedAt), 'MM/dd/yyyy');
  }

  const columns = [
    {
      dataField: 'amount',
      text: 'Amount',
    },
    {
      dataField: 'currency',
      text: 'Currency',
    },
    {
      dataField: 'orderStatus.title',
      text: 'Status',
    },
    {
      dataField: 'updatedAt',
      text: 'Purchased Date',
      formatter: dateFormatter,
    },
  ];

  return (
    <PaperCard title="Credit Purchase History">
      <Button variant="success" onClick={() => history.push('/wallet/withdrawal')}>Withdrawal Request</Button>
      <Button style={{margin: 10}} variant="outline-success">
                    Make a transfer
                  </Button>
      <div className="mt-4">
        <BootstrapTable
          striped
          bordered={false}
          bootstrap4
          pagination={paginationFactory()}
          keyField="id"
          data={paymentHistory}
          columns={columns}
        />
      </div>
    </PaperCard>
  );
};

WalletHistory.propTypes = {
  paymentHistory: PropTypes.any,
  fetchPaymentHistory: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  paymentHistory: makeSelectPaymentHistory(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchPaymentHistory: () => dispatch(fetchPaymentHistoryAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WalletHistory);
