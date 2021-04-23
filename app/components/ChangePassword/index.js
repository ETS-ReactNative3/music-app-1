import React, { memo } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { changePasswordAction } from '../../containers/MyAccount/actions';
import PropTypes from 'prop-types';

const ChangePassword = ({changePassword }) => {


    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        newPassword: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });
    const {
        register,
        handleSubmit,
        errors,
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = data => {
        changePassword({oldPassword: data.currentPassword, newPassword: data.confirmPassword})
    }
    return (
        <>
                <Row className="mt-5">
                    <Col md={4} lg={6} xl={6}>
                        <div className="card bg-dark">
                            <div className="card-body profile-user-box">


                                <h3 className="pb-2 d-inline-block border-top-0 border-right-0 border-left-0">
                                    Change Password
              </h3>
                                <div className="mt-4">
                                    <label>Current Password</label>
                                    <input
                                        ref={register}
                                        type="password"
                                        name="currentPassword"
                                        style={{ width: '300px' }}
                                        placeholder="Enter Current Password"
                                        className={`form-control `}
                                    />
                                    <div className="invalid-feedback" style={{ display: 'block' }}>
                                        {errors.currentPassword && errors.currentPassword.message}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label>New Password</label>
                                    <input
                                        ref={register}
                                        type="password"
                                        name="newPassword"
                                        style={{ width: '300px' }}
                                        placeholder="Enter New Password"
                                        className={`form-control `}
                                    />
                                    <div className="invalid-feedback" style={{ display: 'block' }}>
                                        {errors.newPassword && errors.newPassword.message}
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label>Confirm Password</label>
                                    <input
                                        ref={register}
                                        type="password"
                                        name="confirmPassword"
                                        style={{ width: '300px' }}
                                        placeholder="Enter Confirm Password"
                                        className={`form-control `}
                                    />
                                    <div className="invalid-feedback" style={{ display: 'block' }}>
                                        {errors.confirmPassword && errors.confirmPassword.message}
                                    </div>
                                </div>

                                <Button className="mt-4" variant="success" onClick={handleSubmit(onSubmit)}>
                  Submit
                </Button>

                            </div>
                        </div>
                    </Col></Row>
        </>
    )
}


ChangePassword.propTypes = {
    
    changePassword: PropTypes.func,
  };
  
  const mapStateToProps = createStructuredSelector({
   
  });
  
  function mapDispatchToProps(dispatch) {
    return {
        changePassword: (oldPassword, newPassword) => dispatch(changePasswordAction(oldPassword, newPassword))
    };
  }
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
    memo,
  )(ChangePassword);
  