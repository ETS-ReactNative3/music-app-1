/**
 *
 * BankForm
 *
 */

import React, {memo} from 'react';
import {useForm} from "react-hook-form";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function BankForm({methodSubmit}) {
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
    <button type="submit" className="btn btn-primary">Add method</button>
  </form>;
}

BankForm.propTypes = {};

export default memo(BankForm);
