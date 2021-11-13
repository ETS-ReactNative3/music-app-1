/**
 *
 * WithdrawalRequests
 *
 */

import React, {memo} from 'react';
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
import format from "date-fns/format";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function WithdrawalRequests({withdrawalRequests}) {
  const columns = [
    {
      dataField: 'withdrawalMethods.beneficiaryName',
      text: 'Beneficiary Name',
      style: {
        width: '30%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '30%',
        textAlign: 'left'
      }
    },
    {
      dataField: 'amount',
      text: 'Amount',
      style: {
        width: '20%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '20%',
        textAlign: 'left'
      }
    },
    {
      dataField: 'withdrawalStatus.name',
      text: 'Status',
      style: {
        width: '25%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '25%',
        textAlign: 'left'
      }
    },
    {
      dataField: 'createdDate',
      text: 'Created Date',
      formatter: dateFormatter,
      style: {
        width: '25%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '25%',
        textAlign: 'left'
      },
    },
  ];

  function dateFormatter(cell, row, rowIndex, formatExtraData) {
    return format(new Date(row.createdDate), 'do MMM yyyy HH:mm aaa');
  }

  return <BootstrapTable
    striped
    bordered={false}
    bootstrap4
    pagination={paginationFactory()}
    keyField="id"
    data={withdrawalRequests}
    columns={columns}
  />;
}

WithdrawalRequests.propTypes = {};

export default memo(WithdrawalRequests);
