/**
 *
 * PaypalForm
 *
 */

import { yupResolver } from '@hookform/resolvers/yup';
import React, { memo } from 'react';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function PaypalForm({ methodSubmit }) {

  const validationSchema = Yup.object().shape({
    beneficiaryName: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be two letter'),
    paypalEmail: Yup.string().email('Must be a valid email').required("Email is required"),

  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
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
          ref={register}
          id="beneficiary-name" />
        {errors.beneficiaryName && <div className="invalid-feedback">This field is required</div>}
      </div>
      <label htmlFor="paypal">Paypal Email-id</label>
      <input
        className={`form-control ${errors.paypalEmail ? 'is-invalid' : ''}`}
        type="text"
        placeholder="Enter Paypal Email-id"
        name="paypalEmail"
        ref={register}
        id="paypal" />
      {errors.paypalEmail && <div className="invalid-feedback">{errors.paypalEmail.message}</div>}
    </div>
    <button type="submit" className="btn btn-primary">Add method</button>
  </form>;
}

PaypalForm.propTypes = {};

export default memo(PaypalForm);
