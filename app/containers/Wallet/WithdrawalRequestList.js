import PropTypes from 'prop-types';
import React, {memo, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import PaperCard from '../../components/PaperCard';
import {useInjectReducer} from "../../utils/injectReducer";
import {useInjectSaga} from "../../utils/injectSaga";
import reducer from "./reducer";
import saga from "./saga";
import {getWithdrawalListRequestsAction, payWithdrawalRequestAction} from "./actions";
import format from "date-fns/format";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import {makeSelectWithdrawalList} from "./selectors";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const WithdrawalRequestList = ({getWithdrawalList, withdrawalList, payRequest}) => {
  useInjectReducer({key: 'wallet', reducer});
  useInjectSaga({key: 'wallet', saga});

  const [tastemaker, setTastemaker] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getWithdrawalList();
  }, [])

  const columns = [
    {
      dataField: 'user.name',
      text: 'Name',
      headerStyle: {
        width: '20%'
      },
      style: {
        width: '20%'
      }
    },
    {
      dataField: 'amount',
      text: 'Amount',
      headerStyle: {
        width: '10%'
      },
      style: {
        width: '10%'
      }
    },
    {
      dataField: 'withdrawalStatus.name',
      text: 'Status',
      filter: textFilter(),
      headerStyle: {
        width: '20%'
      },
      style: {
        width: '20%'
      }
    },
    {
      dataField: 'createdDate',
      text: 'Created Date',
      formatter: dateFormatter,
      headerStyle: {
        width: '20%'
      },
      style: {
        width: '20%'
      }
    },
    {
      dataField: 'actions',
      text: 'Actions',
      isDummyField: true,
      csvExport: false,
      formatter: actionsFormatter,
      headerStyle: {
        width: '20%'
      },
      style: {
        width: '20%'
      }
    },
  ];

  function dateFormatter(cell, row, rowIndex, formatExtraData) {
    return format(new Date(row.createdDate), 'MM/dd/yyyy HH:mm');
  }

  function actionsFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          lineHeight: 'normal',
        }}
      >
        <button
          className="btn btn-danger"
          onClick={() => handleClickOpen(row)}
        >
          <FontAwesomeIcon icon={faUser}/>
        </button>
      </div>
    );
  }

  function handleClickOpen(row) {
    setTastemaker(row);
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handlePaidAction() {
    payRequest({id: tastemaker.id});
    setOpen(false);
    setTastemaker(null);
  }

  return (
    <PaperCard title="Withdrawal Requests">
      <BootstrapTable
        striped
        hover
        bordered={false}
        bootstrap4
        pagination={paginationFactory()}
        filter={filterFactory()}
        keyField="id"
        data={withdrawalList}
        columns={columns}
      />
      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>User details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tastemaker &&
          <div>
            <div>
              Name: {tastemaker.user.name}
            </div>
            <div>
              Amount: {tastemaker.amount}
            </div>
            <div>
              Status: {tastemaker.withdrawalStatus.name}
            </div>
            <div>
              Withdrawal Method:
            </div>
            <div>
              beneficiaryName: {tastemaker.withdrawalMethods.beneficiaryName}
            </div>
            {tastemaker.withdrawalMethods.accountNumber && <div>
              Account Number: {tastemaker.withdrawalMethods.accountNumber}
            </div>}
            {tastemaker.withdrawalMethods.iban && <div>
              IBAN: {tastemaker.withdrawalMethods.iban}
            </div>}
            {tastemaker.withdrawalMethods.paypalEmail && <div>
              Paypal Email: {tastemaker.withdrawalMethods.paypalEmail}
            </div>}
            {tastemaker.withdrawalMethods.swift && <div>
              Swift: {tastemaker.withdrawalMethods.swift}
            </div>}
            {tastemaker.withdrawalMethods.walletId && <div>
              Wallet Id: {tastemaker.withdrawalMethods.walletId}
            </div>}
            {tastemaker.paidDate && <div>
              Paid: {format(new Date(tastemaker.paidDate), 'MM/dd/yyyy HH:mm')}
            </div>}
          </div>
          }
        </Modal.Body>
        <Modal.Footer>
          {tastemaker && !tastemaker.paidDate &&
          <Button variant="primary" onClick={handlePaidAction}>
            Paid
          </Button>
          }
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </PaperCard>
  )
}

WithdrawalRequestList.propTypes = {
  userCredit: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  withdrawalList: makeSelectWithdrawalList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getWithdrawalList: () => dispatch(getWithdrawalListRequestsAction()),
    payRequest: (data) => dispatch(payWithdrawalRequestAction(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect, memo)(WithdrawalRequestList);
