import React, {memo, useState} from 'react';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {useInjectSaga} from 'utils/injectSaga';
import {useForm} from 'react-hook-form';
import {registerReq} from './actions';
import saga from './saga';
import {Link} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

function Register({registerRequest}) {
  useInjectSaga({key: 'auth', saga});
  const onSubmit = values => registerRequest(values);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid'),
    phone: Yup.string()
      .required('Name is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    acceptTerms: Yup.bool()
      .oneOf([true], 'Accept Ts & Cs is required')
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {register, handleSubmit, errors} = useForm({
    resolver: yupResolver(validationSchema)
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">
          <div className="mb-5">
            <h1 className="display-4">Create your account</h1>
            <p>Already have an account? <Link to="/auth/login">Sign in here</Link></p>
          </div>
        </div>
        <div className="form-group text-center">
          <div className="form-check-inline">
            <input
              className={`form-check-input ${
                errors.roleId ? 'is-invalid' : ''
              }`}
              ref={register}
              type="radio"
              name="roleId"
              defaultChecked="checked"
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
            ref={register}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
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
            ref={register}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
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
            ref={register}
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
            ref={register}
          />
          <div className="invalid-feedback">
            {errors.password && errors.password.message}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
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
        <div className="js-form-message form-group">
          <div className="custom-control custom-checkbox">
            <input
              name="acceptTerms"
              type="checkbox"
              ref={register}
              className={`custom-control-input ${
              errors.acceptTerms ? 'is-invalid' : ''
            }`}
              id="termsCheckbox"
              />
            <label className="custom-control-label" htmlFor="termsCheckbox">
              I accept the <a href="#" onClick={handleShow}>Terms and Conditions</a>
            </label>
            <div className="invalid-feedback">{errors.acceptTerms && errors.acceptTerms.message}</div>
          </div>
        </div>
        <button className="btn btn-primary btn-block" type="submit">
          Submit
        </button>
      </form>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
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
