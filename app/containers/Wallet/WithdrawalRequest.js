import PropTypes from 'prop-types';
import React, {memo, useEffect, useState} from 'react';
import {
  Button
} from 'react-bootstrap';
import {connect} from 'react-redux';
import Select from 'react-select';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import PaperCard from '../../components/PaperCard';
import {makeSelectUserDetails, makeSelectUserWallet} from '../App/selectors';
import styles from './index.styles';
import PlanSvgColor from '../../images/svg/plan_icon_color.svg';
import {
  addPaymentMethodAction,
  deletePaymentMethodsAction,
  getPaymentMethodsAction,
  submitWithdrawalAmountAction
} from "./actions";
import {useInjectReducer} from "../../utils/injectReducer";
import {useInjectSaga} from "../../utils/injectSaga";
import reducer from "./reducer";
import saga from "./saga";
import {makeSelectLoader, makeSelectPaymentMethods, makeSelectRequestButtonLoader} from "./selectors";
import LoadingIndicator from "../../components/LoadingIndicator";
import WithdrawalAmountForm from "../../components/WithdrawalAmountForm/Loadable";
import Modal from "react-bootstrap/Modal";
import BankForm from "../../components/BankForm";
import PaypalForm from "../../components/PaypalForm";
import PtmTokenForm from "../../components/PtmTokenForm";
import {toast} from "react-toastify";

const WithdrawalRequest = (
  {
    userCredit,
    addWithdrawalMethod,
    getPaymentMethods,
    loader,
    paymentMethods,
    removePaymentMethod,
    submitWithdrawAmount,
    requestButtonLoader,
    userDetails
  }) => {
  useInjectReducer({key: 'wallet', reducer});
  useInjectSaga({key: 'wallet', saga});

  const [withdrawalAccount, setWithdrawalAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [method, setMethod] = useState(0);

  const customStyles = {
    option: provided => ({
      ...provided,
      color: 'black'
    }),
    control: provided => ({
      ...provided,
      color: 'black'
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black'
    }),
    menu: provided => ({...provided, zIndex: 9999})
  }

  const options = [
    {value: 3, label: 'BLNK Token Transfer'},
    {value: 1, label: 'Bank Transfer'},
    {value: 2, label: 'Paypal Transfer'},
  ];

  const regularUserOptions = [
    {value: 3, label: 'BLNK Token Transfer'}
  ];

  const [withdrawalTransfer, setWithdrawalTransfer] = useState(options[0]);

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen(id) {
    setMethod(id);
    setOpen(true);
  }

  function deleteAlbumAction() {
    removePaymentMethod(method)
    setOpen(false);
    setMethod(0);
  }

  useEffect(() => {
    getPaymentMethods();
  }, []);

  useEffect(() => {
    if (paymentMethods.length > 0) {
      setWithdrawalAccount(paymentMethods[0].id)
    }
  }, [paymentMethods]);

  const submitAmount = data => {
    if (!withdrawalAccount) {
      toast.warning('Add a withdrawal method first');
    } else {
      submitWithdrawAmount({influencerWithdrawalMethodsId: withdrawalAccount, ...data})
    }
  }

  const methodSubmit = data => {
    addWithdrawalMethod(data)
  }

  return (
    <PaperCard title="Withdrawal">
      {loader ? <LoadingIndicator/> :
        <>
          <p>
            Withdraw money what you earned on bliiink
          </p>
          {userDetails.roleId === 2 ? <div className="row">
            <div className="col-md-7">
              <div className="card bg-dark">
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="beneficiary-name">1. Withdrawal method</label>
                    {paymentMethods.map((item, index) => {
                      return (
                        <div style={styles.withdrawalOptionContainer} key={item.id}
                             onClick={() => setWithdrawalAccount(item.id)}>
                          <label className="form-check-label">
                            <input
                              type="radio"
                              className="form-check-input"
                              checked={withdrawalAccount === item.id}
                              value={item.id}
                              name="optradio"/>Account: {item.beneficiaryName}
                          </label>
                          <Button variant="link" onClick={() => handleClickOpen(item.id)}>Delete</Button>
                        </div>
                      )
                    })}
                  </div>
                  <div className="form-group">
                    <div style={styles.addWithdrawalContainer}>
                      <label className="form-check-label">
                        <input
                          type="radio"
                          className="form-check-input"
                          onChange={() => setWithdrawalAccount('no')}
                          checked={withdrawalAccount === 'no'}
                          name="optradio"/>Add Withdrawal Method
                      </label>
                    </div>
                  </div>
                  {withdrawalAccount === 'no' &&
                  <div className="form-group">
                    <div style={styles.addWithdrawalContainer}>
                      <label>Withdrawal Method</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        styles={customStyles}
                        name="Add Withdrawal"
                        options={options}
                        value={withdrawalTransfer}
                        placeholder="Select Withdrawal type"
                        onChange={(value) => setWithdrawalTransfer(value)}
                      />
                      {withdrawalTransfer.value === 1 && <BankForm methodSubmit={methodSubmit}/>}
                      {withdrawalTransfer.value === 2 && <PaypalForm methodSubmit={methodSubmit}/>}
                      {withdrawalTransfer.value === 3 && <PtmTokenForm methodSubmit={methodSubmit}/>}
                    </div>
                  </div>
                  }
                </div>
              </div>
              <div className="card bg-dark mt-4">
                <div className="card-body">
                  <WithdrawalAmountForm
                    userCredit={userCredit}
                    setAmount={setAmount}
                    submitAmount={submitAmount}
                    requestButtonLoader={requestButtonLoader}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-dark">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <h4 className="mb-3">Summary</h4>
                      <div className="row mb-2">
                        <div className="col-md-8">
                          Available Credits
                        </div>
                        <div className="col-md-4">
                          {userCredit} <img
                          src={PlanSvgColor}
                          alt="PlanSvg"
                          width={20}
                          height={20}/>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-8">
                          Withdrawal
                        </div>
                        <div className="col-md-4">
                          {amount} <img
                          src={PlanSvgColor}
                          alt="PlanSvg"
                          width={20}
                          height={20}/>
                        </div>
                      </div>
                      <hr/>
                      <div className="row">
                        <div className="col-md-8">
                          New balance After Withdrawal
                        </div>
                        <div className="col-md-4">
                          {userCredit - amount} <img
                          src={PlanSvgColor}
                          alt="PlanSvg"
                          width={20}
                          height={20}/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> :
            <div className="row">
              <div className="col-md-7">
                <div className="card bg-dark">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="beneficiary-name">1. Withdrawal method</label>
                      {paymentMethods.map((item, index) => {
                        return (
                          <div style={styles.withdrawalOptionContainer} key={item.id}
                               onClick={() => setWithdrawalAccount(item.id)}>
                            <label className="form-check-label">
                              <input
                                type="radio"
                                className="form-check-input"
                                checked={withdrawalAccount === item.id}
                                value={item.id}
                                name="optradio"/>Account: {item.beneficiaryName}
                            </label>
                            <Button variant="link" onClick={() => handleClickOpen(item.id)}>Delete</Button>
                          </div>
                        )
                      })}
                    </div>
                    <div className="form-group">
                      <div style={styles.addWithdrawalContainer}>
                        <label className="form-check-label">
                          <input
                            type="radio"
                            className="form-check-input"
                            onChange={() => setWithdrawalAccount('no')}
                            checked={withdrawalAccount === 'no'}
                            name="optradio"/>Add Withdrawal Method
                        </label>
                      </div>
                    </div>
                    {withdrawalAccount === 'no' &&
                    <div className="form-group">
                      <div style={styles.addWithdrawalContainer}>
                        <label>Withdrawal Method</label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          styles={customStyles}
                          name="Add Withdrawal"
                          options={regularUserOptions}
                          value={withdrawalTransfer}
                          placeholder="Select Withdrawal type"
                          onChange={(value) => setWithdrawalTransfer(value)}
                        />
                        {withdrawalTransfer.value === 3 && <PtmTokenForm methodSubmit={methodSubmit}/>}
                      </div>
                    </div>
                    }
                  </div>
                </div>
                <div className="card bg-dark mt-4">
                  <div className="card-body">
                    <WithdrawalAmountForm
                      userCredit={userCredit}
                      setAmount={setAmount}
                      submitAmount={submitAmount}
                      requestButtonLoader={requestButtonLoader}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-dark">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <h4 className="mb-3">Summary</h4>
                        <div className="row mb-2">
                          <div className="col-md-8">
                            Available Credits
                          </div>
                          <div className="col-md-4">
                            {userCredit} <img
                            src={PlanSvgColor}
                            alt="PlanSvg"
                            width={20}
                            height={20}/>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8">
                            Withdrawal
                          </div>
                          <div className="col-md-4">
                            {amount} <img
                            src={PlanSvgColor}
                            alt="PlanSvg"
                            width={20}
                            height={20}/>
                          </div>
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="col-md-8">
                            New balance After Withdrawal
                          </div>
                          <div className="col-md-4">
                            {userCredit - amount} <img
                            src={PlanSvgColor}
                            alt="PlanSvg"
                            width={20}
                            height={20}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </>
      }
      <Modal
        show={open}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the withdrawal method?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={deleteAlbumAction}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </PaperCard>
  )
}

WithdrawalRequest.propTypes = {
  userCredit: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  userDetails: makeSelectUserDetails(),
  userCredit: makeSelectUserWallet(),
  loader: makeSelectLoader(),
  paymentMethods: makeSelectPaymentMethods(),
  requestButtonLoader: makeSelectRequestButtonLoader()
});

function mapDispatchToProps(dispatch) {
  return {
    addWithdrawalMethod: (methodData) => dispatch(addPaymentMethodAction(methodData)),
    getPaymentMethods: () => dispatch(getPaymentMethodsAction()),
    removePaymentMethod: (id) => dispatch(deletePaymentMethodsAction(id)),
    submitWithdrawAmount: (data) => dispatch(submitWithdrawalAmountAction(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect, memo)(WithdrawalRequest);
