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
      dataField: 'influencerWithdrawalMethods.beneficiaryName',
      text: 'Beneficiary Name',
    },
    {
      dataField: 'amount',
      text: 'Amount',
    },
    {
      dataField: 'influencerWithdrawalStatus.name',
      text: 'Status',
    },
    {
      dataField: 'createdDate',
      text: 'Created Date',
      formatter: dateFormatter,
    },
  ];

  function dateFormatter(cell, row, rowIndex, formatExtraData) {
    return format(new Date(row.createdDate), 'MM/dd/yyyy HH:mm');
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
