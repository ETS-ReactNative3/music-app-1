import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {useInjectSaga} from 'utils/injectSaga';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {useForm} from 'react-hook-form';
import saga from './saga';
import {resetPasswordRequest} from './actions';
import {useParams} from 'react-router-dom';
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

function ResetPassword({resetPasswordRequestCall}) {
  useInjectSaga({key: 'auth', saga});

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(validationSchema)
  });
  const {token} = useParams();

  const onSubmit = data => {
    resetPasswordRequestCall({...data, token});
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="code">New password</label>
          <input
            name="password"
            type="password"
            placeholder="Enter password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            ref={register}
          />
          <div className="invalid-feedback">
            {errors.password && errors.password.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="code">Confirm password</label>
          <input
            name="confirmPassword"
            type="password"
            placeholder="Re-type Password"
            className={`form-control ${
              errors.confirmPassword ? 'is-invalid' : ''
            }`}
            ref={register}
          />
          <div className="invalid-feedback">
            {errors.confirmPassword && errors.confirmPassword.message}
          </div>
        </div>
        <button className="btn btn-primary btn-block" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

ResetPassword.propTypes = {
  resetPasswordRequestCall: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    resetPasswordRequestCall: data => dispatch(resetPasswordRequest(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ResetPassword);
