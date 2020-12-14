import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { loginReq } from './actions';
import saga from './saga';

function Login({ loginRequest }) {
  useInjectSaga({ key: 'auth', saga });
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = values => loginRequest(values);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="username"
            placeholder="Enter email"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            ref={register({
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Invalid email address format',
              },
            })}
          />
          <div className="invalid-feedback">
            {errors.username && errors.username.message}
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
        <button className="btn btn-primary btn-block" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  loginRequest: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    loginRequest: data => dispatch(loginReq(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
