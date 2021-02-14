/**
 *
 * PaypalForm
 *
 */

import React, {memo} from 'react';
import {useForm} from "react-hook-form";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function PaypalForm({methodSubmit}) {
  const {register, handleSubmit, errors} = useForm();
  const methodFormSubmit = data => {
    methodSubmit(data)
  }

  return <form className="mt-3" onSubmit={handleSubmit(methodFormSubmit)}>
    <div className="form-group">
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
    <button type="submit" className="btn btn-primary">Add method</button>
  </form>;
}

PaypalForm.propTypes = {};

export default memo(PaypalForm);
