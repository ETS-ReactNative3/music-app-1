/**
 *
 * WithdrawalAmountForm
 *
 */

import React, {memo} from 'react';
import {useForm} from "react-hook-form";
import ButtonLoader from "../ButtonLoader";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function WithdrawalAmountForm({userCredit, setAmount, submitAmount, requestButtonLoader}) {
  const {register, handleSubmit, errors} = useForm();
  const amountSubmit = data => {
    submitAmount(data)
  }

  return <form onSubmit={handleSubmit(amountSubmit)}>
    <div className="form-group">
      <label htmlFor="amount">3. Amount</label>
      <input
        className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
        type="number"
        placeholder="Enter amount"
        ref={register({required: true, max: userCredit})}
        name="amount"
        onChange={(e) => setAmount(e.target.value)}
        id="amount"/>
      {errors.amount && errors.amount.type === "required" && <div className="invalid-feedback">Amount is required</div>}
      {errors.amount && errors.amount.type === "max" && <div className="invalid-feedback">
        Amount value is more than the credit you have
      </div>}
      <small>The withdrawal is not immediate. You'll
        receive an email once the Bliiink team validates your request.</small>
    </div>
    {requestButtonLoader ? <ButtonLoader/> : <button type="submit" className="btn btn-primary">Confirm request</button>}
  </form>;
}

WithdrawalAmountForm.propTypes = {};

export default memo(WithdrawalAmountForm);
