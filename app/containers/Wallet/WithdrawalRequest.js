import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, {memo} from 'react';
import {
  Button,
  Card,
  Col,
  FormGroup,
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
import {addPaymentMethodAction} from "./actions";
import {useInjectReducer} from "../../utils/injectReducer";
import {useInjectSaga} from "../../utils/injectSaga";
import reducer from "./reducer";
import saga from "./saga";

const WithdrawalRequest = ({userCredit, addWithdrawalMethod}) => {
  useInjectReducer({key: 'wallet', reducer});
  useInjectSaga({key: 'wallet', saga});

  const [withdrawalAccount, setWithDrawalAccount] = React.useState(1);
  const options = [
    {value: 1, label: 'Bank Transfer'},
    {value: 2, label: 'Paypal Transfer'},
    {value: 3, label: 'PTM Token Transfer'},
  ];
  const [withdrawalTransfer, setWithdrawalTransfer] = React.useState(options[0]);
  const {register, handleSubmit, errors, setValue} = useForm();
  const onSubmit = data => {
    switch (withdrawalTransfer.value) {
      case 1:
        addWithdrawalMethod({
          name: data.beneficiaryName,
          accountNumber: data.accountNumber,
          iban: data.iban,
          swift: data.swift
        });
        break;
      case 2:
        addWithdrawalMethod({
          name: data.beneficiaryName,
          paypalEmail: data.paypalEmail
        });
        break;
      case 3:
        addWithdrawalMethod({
          name: data.beneficiaryName,
          walletId: data.walletId
        });
        break;
    }
  };

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

  return (
    <PaperCard title="Withdrawal">
      <p>
        Withdraw money what you earned on bliiink
      </p>
      <div className="row">
        <div className="col-md-7">
          <div className="card bg-dark">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="beneficiary-name">1. Withdrawal method</label>
              </div>
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
            </div>
          </div>
          <div className="card bg-dark mt-4">
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="amount">3. Amount</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter amount"
                  id="amount"/>
                <small>The withdrawal is not immediate. You'll
                  receive an email once the Bliiink team validates your request.</small>
              </div>
              <button type="submit" className="btn btn-primary">Confirm request</button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark">
            <div style={styles.creditParentStyle}>
              <div style={styles.labelCeditText}>
                Availabe Credits
              </div>
              <div style={styles.labelCeditValueText}>
                {userCredit}
              </div>
            </div>
            <div style={{...styles.creditParentStyle}}>
              <div style={{...styles.labelCeditText, ...{color: 'blue'}}}>
                Transfer
              </div>
              <div style={{...styles.labelCeditText, ...{color: 'blue'}}}>
                30<img
                src={PlanSvgColor}
                alt="PlanSvg"
                width={20}
                height={20}
                style={{marginRight: 5}}
              />
              </div>
            </div>
            <div style={styles.creditParentStyle}>
              <div style={styles.labelCeditText}>
                New balance <br/> After transfer
              </div>
              <div style={styles.labelCeditValueText}>
                500
              </div>
            </div>
            <Button variant="success"
            >Confirm request</Button>
          </div>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <FormGroup as={Col} style={{width: '70%', margin: 10}}>
          <div className="row">
            <div className="col">
              <div style={styles.headerTitle}>Withdrawal</div>
              <div style={styles.subHeaderTitle}>Withdraw money what you earned on bliiink</div>
            </div>
          </div>

          <Card style={{marginTop: 30, color: 'black', padding: 20}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Card.Title>2. Withdrawal Method</Card.Title>
              <FontAwesomeIcon icon={faCheck} color={'#28a745'}/>
            </div>
            <FormGroup>
              {[1, 2, 3, 4].map(value => {
                if (value === 4) {
                  return (<>
                    <div style={styles.addWithdrawalOptionContainer} onClick={() => setWithDrawalAccount(value)}>
                      <label class="form-check-label">
                        <input type="radio" checked={withdrawalAccount === value} class="form-check-input"
                               name="optradio"/>Add Withdrawal Method
                      </label>
                    </div>
                    {withdrawalAccount === 4 && <div style={styles.addWithdrawalContainer}>
                      <div className="form-group">
                        <label htmlFor="beneficiary-name">1. Beneficiary</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Company information"
                          id="beneficiary-name"/>
                      </div>
                      <label>Withdrawal Method</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="Add Withdrawal"
                        options={options}
                        value={withdrawalTransfer}
                        placeholder="Select Withdrawal type"
                        styles={{}}
                        onChange={(value) => setWithDrawalTransfer(value)}
                      />
                      {renderWithdrawalInformation()}
                    </div>}
                  </>)
                }
                return (
                  <div style={styles.withdrawalOptionContainer} onClick={() => setWithDrawalAccount(value)}>
                    <label class="form-check-label">
                      <input type="radio" checked={withdrawalAccount === value} class="form-check-input"
                             name="optradio"/>Account: ms.aaabb@gm.com
                    </label>
                    <Button variant="link">Delete</Button>
                  </div>
                )
              })}
            </FormGroup>

          </Card>

          <Card style={{marginTop: 30, color: 'black', padding: 20}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Card.Title>3. Amount</Card.Title>
              <FontAwesomeIcon icon={faCheck} color={'#28a745'}/>
            </div>
            <Card.Body style={{color: 'black', padding: 10}}>
              <label style={{color: 'grey', fontSize: 14}}>Enter amount you want to withdrawal</label>
              <div className="input-group">
                <input className="form-control py-2 border" type="number" placeholder="Enter amount"
                       id="examddple-search-input"/>
              </div>
              <label style={{color: 'grey', fontSize: 12, fontStyle: 'italic'}}>The withdrawal is not immediate. You'll
                recieve an email once the Bliiink team validates your request.</label>

              <div></div>

              <Button variant="success">Confirm request</Button>
            </Card.Body>
          </Card>
        </FormGroup>
        <FormGroup as={Col} style={{width: '30%'}}>
          <Card style={styles.summaryCardStyle}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Card.Title>Summary</Card.Title>
            </div>
            <Card.Body style={{color: 'black', padding: 0,}}>
              <div style={styles.creditParentStyle}>
                <div style={styles.labelCeditText}>
                  Availabe Credits
                </div>
                <div style={styles.labelCeditValueText}>
                  {userCredit}
                </div>
              </div>
              <div style={{...styles.creditParentStyle}}>
                <div style={{...styles.labelCeditText, ...{color: 'blue'}}}>
                  Transfer
                </div>
                <div style={{...styles.labelCeditText, ...{color: 'blue'}}}>
                  30<img
                  src={PlanSvgColor}
                  alt="PlanSvg"
                  width={20}
                  height={20}
                  style={{marginRight: 5}}
                />
                </div>
              </div>
              <div style={styles.creditParentStyle}>
                <div style={styles.labelCeditText}>
                  New balance <br/> After transfer
                </div>
                <div style={styles.labelCeditValueText}>
                  500
                </div>
              </div>
              <Button variant="success"
              >Confirm request</Button>
            </Card.Body>
          </Card>
        </FormGroup>
      </div>
    </PaperCard>
  )
}

WithdrawalRequest.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userCredit: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  userCredit: makeSelectUserWallet(),
});

function mapDispatchToProps(dispatch) {
  return {
    addWithdrawalMethod: (methodData) => dispatch(addPaymentMethodAction(methodData)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect, memo)(WithdrawalRequest);
