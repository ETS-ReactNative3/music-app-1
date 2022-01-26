/**
 *
 * BankForm
 *
 */

import { yupResolver } from '@hookform/resolvers/yup';
import React, { memo } from 'react';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import '../InputPhone/index.scss';

function BankForm({ methodSubmit }) {

  const validationSchema = Yup.object().shape({
    beneficiaryName: Yup.string()
      .required('Name is required')
      .test('space', 'Name is required', val => { return val.trim().toString().length > 0 }),
    accountHolder: Yup.string().required('Account Holder is required')
      .test('space', 'Account Holder is required', val => { return val.trim().toString().length > 0 }),
    iban: Yup.string().required('IBan is required')
      .test('space', 'IBan is required', val => { return val.trim().toString().length > 0 }),
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
        className={` phone_field form-control ${errors.accountHolder ? 'is-invalid' : ''}`}
        placeholder="Enter account holder"
        name="accountHolder"
        ref={register}
        id="accountHolder" />
      {errors.accountHolder && <div className="invalid-feedback">{errors.accountHolder.message}</div>}
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
