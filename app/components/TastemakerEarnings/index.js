/**
 *
 * TastemakerEarnings
 *
 */

import React, {memo} from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import format from "date-fns/format";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function TastemakerEarnings({earnings}) {
  const columns = [
    {
      dataField: 'campaigns.song.user.name',
      text: 'Artist Name',
      style: {
        width: '20%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '20%',
        textAlign: 'left'
      },
    },
    {
      dataField: 'campaigns.song.title',
      text: 'Song Name',
      style: {
        width: '35%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '35%',
        textAlign: 'left'
      },
    },
    {
      dataField: 'amount',
      text: 'Amount',
      style: {
        width: '25%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '25%',
        textAlign: 'left'
      },
    },
    {
      dataField: 'createdDate',
      text: 'Created Date',
      formatter: dateFormatter,
      style: {
        width: '20%',
        textAlign: 'left'
      },
      headerStyle: {
        width: '20%',
        textAlign: 'left'
      }
    },
  ];

  function dateFormatter(cell, row, rowIndex, formatExtraData) {
    return format(new Date(row.campaigns.createdDate), 'MM/dd/yyyy HH:mm');
  }

  return <BootstrapTable
    striped
    bordered={false}
    bootstrap4
    pagination={paginationFactory()}
    keyField="id"
    data={earnings}
    columns={columns}
  />;
}

TastemakerEarnings.propTypes = {};

export default memo(TastemakerEarnings);
