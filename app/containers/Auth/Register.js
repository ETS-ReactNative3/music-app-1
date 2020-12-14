import React, { memo } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useForm } from 'react-hook-form';
import { registerReq } from './actions';
import saga from './saga';

function Register({ registerRequest }) {
  useInjectSaga({ key: 'auth', saga });

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = values => registerRequest(values);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <div className="form-check-inline">
            <input
              className={`form-check-input ${
                errors.roleId ? 'is-invalid' : ''
              }`}
              ref={register}
              type="radio"
              name="roleId"
              value={1}
              id="regular"
            />
            <label className="form-check-label" htmlFor="regular">
              Regular
            </label>
          </div>
          <div className="form-check-inline">
            <input
              className={`form-check-input ${
                errors.roleId ? 'is-invalid' : ''
              }`}
              ref={register}
              type="radio"
              name="roleId"
              value={2}
              id="artist"
            />
            <label className="form-check-label" htmlFor="artist">
              Artist
            </label>
          </div>
          <div className="invalid-feedback">
            {errors.roleId && errors.roleId.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Name</label>
          <input
            name="name"
            placeholder="Enter name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            ref={register({
              required: 'Name is required',
            })}
          />
          <div className="invalid-feedback">
            {errors.name && errors.name.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="Enter email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            ref={register({
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address format',
              },
            })}
          />
          <div className="invalid-feedback">
            {errors.email && errors.email.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="email">Phone</label>
          <input
            name="phone"
            placeholder="Enter phone"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            ref={register({ required: 'Phone is required' })}
          />
          <div className="invalid-feedback">
            {errors.phone && errors.phone.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            ref={register({
              required: 'Password is required',
            })}
          />
          <div className="invalid-feedback">
            {errors.password && errors.password.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="passwordConfirm"
            type="password"
            placeholder="Re-type Password"
            className={`form-control ${
              errors.passwordConfirm ? 'is-invalid' : ''
            }`}
            ref={register({
              required: 'Password is required',
            })}
          />
          <div className="invalid-feedback">
            {errors.passwordConfirm && errors.passwordConfirm.message}
          </div>
        </div>
        <button className="btn btn-primary btn-block" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

Register.propTypes = {
  registerRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    registerRequest: data => dispatch(registerReq(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Register);
