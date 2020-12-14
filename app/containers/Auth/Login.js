import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {useForm} from 'react-hook-form';
import {useInjectSaga} from 'utils/injectSaga';
import {createStructuredSelector} from 'reselect';
import {loginReq} from './actions';
import saga from './saga';
import {Link} from "react-router-dom";

function Login({loginRequest}) {
  useInjectSaga({key: 'auth', saga});
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = values => loginRequest(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center">
        <div className="mb-5">
          <h1 className="display-4">Sign in</h1>
          <p>Don't have an account yet? <Link to="/auth/register">Sign up here</Link></p>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          name="username"
          placeholder="Enter email"
          className={`form-control form-control-lg ${errors.username ? 'is-invalid' : ''}`}
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
          className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
          ref={register({
            required: 'Password is required',
          })}
        />
        <div className="invalid-feedback">
          {errors.password && errors.password.message}
        </div>
      </div>
      <button className="btn btn-lg btn-block btn-primary" type="submit">
        Submit
      </button>
    </form>
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
