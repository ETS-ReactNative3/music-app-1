import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {useInjectSaga} from 'utils/injectSaga';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {useForm} from 'react-hook-form';
import saga from './saga';
import {forgotPasswordRequest} from "./actions";
import {Link} from "react-router-dom";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

function ForgotPassword({forgotPasswordCall}) {
  useInjectSaga({key: 'auth', saga});
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
  });

  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = data => {
    forgotPasswordCall(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="code">Email Address</label>
          <input
            name="email"
            id="email"
            placeholder="Enter your email address*"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            ref={register}
          />
          <div className="invalid-feedback">
            {errors.email && errors.email.message}
          </div>
        </div>
        <button className="btn btn-primary btn-block" type="submit">
          Submit
        </button>
      </form>
      <div className="mt-3">
        <Link to="/auth/login">Back to login</Link>
      </div>
    </div>
  );
}

ForgotPassword.propTypes = {
  forgotPasswordCall: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    forgotPasswordCall: data => dispatch(forgotPasswordRequest(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ForgotPassword);
