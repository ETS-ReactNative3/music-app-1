/**
 *
 * PtmTokenForm
 *
 */

import React, {memo} from 'react';
import {useForm} from "react-hook-form";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function PtmTokenForm({methodSubmit}) {
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
    <button type="submit" className="btn btn-primary">Add method</button>
  </form>;
}

PtmTokenForm.propTypes = {};

export default memo(PtmTokenForm);
