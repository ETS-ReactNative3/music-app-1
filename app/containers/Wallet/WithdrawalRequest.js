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
import {makeSelectUserWallet} from '../App/selectors';
import styles from './index.styles';
import PlanSvgColor from '../../images/svg/plan_icon_color.svg';
import {useForm} from "react-hook-form";
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

const WithdrawalRequest = (
  {
    userCredit,
    addWithdrawalMethod,
    getPaymentMethods,
    loader,
    paymentMethods,
    removePaymentMethod,
    submitWithdrawAmount,
    requestButtonLoader
  }) => {
  useInjectReducer({key: 'wallet', reducer});
  useInjectSaga({key: 'wallet', saga});

  const [withdrawalAccount, setWithdrawalAccount] = useState(null);
  const [amount, setAmount] = useState(0);
  const options = [
    {value: 1, label: 'Bank Transfer'},
    {value: 2, label: 'Paypal Transfer'},
    {value: 3, label: 'PTM Token Transfer'},
  ];
  const [withdrawalTransfer, setWithdrawalTransfer] = useState(options[0]);
  const {register, handleSubmit, errors, setValue} = useForm();
  const onSubmit = data => {
    switch (withdrawalTransfer.value) {
      case 1:
        addWithdrawalMethod({
          beneficiaryName: data.beneficiaryName,
          accountNumber: data.accountNumber,
          iban: data.iban,
          swift: data.swift
        });
        break;
      case 2:
        addWithdrawalMethod({
          beneficiaryName: data.beneficiaryName,
          paypalEmail: data.paypalEmail
        });
        break;
      case 3:
        addWithdrawalMethod({
          beneficiaryName: data.beneficiaryName,
          walletId: data.walletId
        });
        break;
    }
  };

  const deletePaymentMethod = id => {
    removePaymentMethod(id)
  }

  useEffect(() => {
    getPaymentMethods();
  }, []);

  useEffect(() => {
    if (paymentMethods.length > 0) {
      setWithdrawalAccount(paymentMethods[0].id)
    }
  }, [paymentMethods]);

  const renderWithdrawalInformation = () => {
    switch (withdrawalTransfer.value) {
      case 1:
        setValue("paypalEmail", "")
        setValue("walletId", "")
        return <div className="mt-3">
          <div className="form-group">
            <label htmlFor="accountHolder">Account Holder</label>
            <input
              className={`form-control ${errors.accountNumber ? 'is-invalid' : ''}`}
              type="text"
              placeholder="Enter account holder"
              name="accountNumber"
              ref={register({required: true})}
              id="accountHolder"/>
            {errors.accountNumber && <div className="invalid-feedback">This field is required</div>}
          </div>
          <div className="form-group">
            <label htmlFor="iban">IBAN</label>
            <input
              className={`form-control ${errors.iban ? 'is-invalid' : ''}`}
              type="text"
              placeholder="Enter IBAN number"
              name="iban"
              ref={register({required: true})}
              id="iban"/>
            {errors.iban && <div className="invalid-feedback">This field is required</div>}
          </div>
          <div className="form-group">
            <label htmlFor="swift">BIC/Swift</label>
            <input
              className={`form-control ${errors.swift ? 'is-invalid' : ''}`}
              type="text"
              placeholder="Enter BIC/swift number"
              name="swift"
              ref={register({required: true})}
              id="swift"/>
            {errors.swift && <div className="invalid-feedback">This field is required</div>}
          </div>
        </div>
      case 2:
        setValue("accountNumber", "")
        setValue("iban", "")
        setValue("swift", "")
        setValue("walletId", "")
        return <div className="mt-3">
          <div className="form-group">
            <label htmlFor="paypal">Paypal Email-id</label>
            <input
              className={`form-control ${errors.paypalEmail ? 'is-invalid' : ''}`}
              type="text"
              placeholder="Enter Paypal Email-id"
              name="paypalEmail"
              ref={register({required: true})}
              id="paypal"/>
            {errors.paypalEmail && <div className="invalid-feedback">This field is required</div>}
          </div>
        </div>
      case 3:
        setValue("accountNumber", "")
        setValue("iban", "")
        setValue("swift", "")
        setValue("paypalEmail", "")
        return <div className="mt-3">
          <div className="form-group">
            <label htmlFor="wallet">Erc20 Wallet</label>
            <input
              className={`form-control ${errors.walletId ? 'is-invalid' : ''}`}
              type="text"
              placeholder="Enter Erc20 Wallet"
              name="walletId"
              ref={register({required: true})}
              id="wallet"/>
            {errors.walletId && <div className="invalid-feedback">This field is required</div>}
          </div>
        </div>
    }
  }

  const submitAmount = data => {
    submitWithdrawAmount({influencerWithdrawalMethodsId: withdrawalAccount, ...data})
  }

  return (
    <PaperCard title="Withdrawal">
      {loader ? <LoadingIndicator/> :
        <>
          <p>
            Withdraw money what you earned on bliiink
          </p>
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
                          <Button variant="link" onClick={() => deletePaymentMethod(item.id)}>Delete</Button>
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                      <div style={styles.addWithdrawalContainer}>
                        <div className="form-group">
                          <label htmlFor="beneficiary-name">Beneficiary</label>
                          <input
                            className={`form-control ${errors.beneficiaryName ? 'is-invalid' : ''}`}
                            type="text"
                            placeholder="Company information"
                            name="beneficiaryName"
                            ref={register({required: true})}
                            id="beneficiary-name"/>
                          {errors.beneficiaryName && <div className="invalid-feedback">This field is required</div>}
                        </div>
                        <label>Withdrawal Method</label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          name="Add Withdrawal"
                          options={options}
                          value={withdrawalTransfer}
                          placeholder="Select Withdrawal type"
                          onChange={(value) => setWithdrawalTransfer(value)}
                        />
                        {renderWithdrawalInformation()}
                        <button type="submit" className="btn btn-primary">Add Method</button>
                      </div>
                    </div>
                  </form>
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
        </>
      }
    </PaperCard>
  )
}

WithdrawalRequest.propTypes = {
  userCredit: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
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
