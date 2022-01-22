/**
 *
 * BankForm
 *
 */

import { yupResolver } from '@hookform/resolvers/yup';
import React, { memo } from 'react';
import { useForm } from "react-hook-form";
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import * as Yup from 'yup';
import '../InputPhone/index.scss';

function BankForm({ methodSubmit }) {

  const validationSchema = Yup.object().shape({
    beneficiaryName: Yup.string()

      .required('Name is required')
      .test('space', 'Name is required', val => { return val.trim().toString().length > 0 }),

    accountNumber: Yup.string().required('Account Number is required')
      .matches(/^[0-9]+$/, 'Account Number should be in valid format')
      .test('space', 'Account Number is required', val => { return val.trim().toString().length > 0 }),
    iban: Yup.string().required('IBan is required')
      .matches(/^([A-Z]{2}[ \-]?[0-9]{2})(?=(?:[ \-]?[A-Z0-9]){9,30}$)((?:[ \-]?[A-Z0-9]{3,5}){2,7})([ \-]?[A-Z0-9]{1,3})?$/, 'IBan should be in valid format')
      .test('space', 'IBan is required', val => { return val.trim().toString().length > 0 }),
    swift: Yup.string().required('Swift is required')
    .matches(/^[A-Za-z0-9]+$/, 'Swift should be in valid format')

      .test('space', 'Swift is required', val => { return val.trim().toString().length > 0 }),
  });
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema)
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
        {errors.beneficiaryName && <div className="invalid-feedback">{errors.beneficiaryName.message}</div>}
      </div>
      <label htmlFor="accountHolder">Account Holder</label>
      <input
        className={` phone_field form-control ${errors.accountNumber ? 'is-invalid' : ''}`}
        type="number"
        placeholder="Enter account holder"
        name="accountNumber"
        ref={register}
        id="accountHolder" />
      {errors.accountNumber && <div className="invalid-feedback">{errors.accountNumber.message}</div>}
    </div>
    <div className="form-group">
      <label htmlFor="iban">IBAN</label>
      <input
        className={`form-control ${errors.iban ? 'is-invalid' : ''}`}
        type="text"
        placeholder="Enter IBAN number"
        name="iban"
        ref={register}
        id="iban" />
      {errors.iban && <div className="invalid-feedback">{errors.iban.message}</div>}
    </div>
    <div className="form-group">
      <label htmlFor="swift">BIC/Swift</label>
      <input
        className={`form-control ${errors.swift ? 'is-invalid' : ''}`}
        type="text"
        placeholder="Enter BIC/swift number"
        name="swift"
        ref={register}
        id="swift" />
      {errors.swift && <div className="invalid-feedback">{errors.swift.message}</div>}
    </div>
    <button type="submit" className="btn btn-primary">Add method</button>
  </form>;
}

BankForm.propTypes = {};

export default memo(BankForm);
