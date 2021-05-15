import React, {memo} from 'react';
import {Button, Modal} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {changePasswordAction} from '../../containers/MyAccount/actions';
import PropTypes from 'prop-types';
import {makeSelectChangePasswordProcessing} from '../../containers/MyAccount/selectors';
import ButtonLoader from '../ButtonLoader';

const ChangePassword = ({changePassword, changePasswordProcessing, showChangePassword, handleClose}) => {
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
    reset,
    errors,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {
    if (!changePasswordProcessing) {
      reset({})
      handleClose()
    }
  }, [changePasswordProcessing]);
  const onSubmit = data => {
    changePassword({password: data.currentPassword, newPassword: data.confirmPassword})

  }
  return (
    <Modal
      show={showChangePassword}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="sg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Change Password</Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)} autocomplete="off">
        <Modal.Body>
          <div className="mt-1">
            <label>Current Password</label>
            <input
              ref={register}
              type="password"
              name="currentPassword"
              style={{width: '300px'}}
              placeholder="Enter Current Password"
              className={`form-control `}
            />
            <div className="invalid-feedback" style={{display: 'block'}}>
              {errors.currentPassword && errors.currentPassword.message}
            </div>
          </div>

          <div className="mt-4">
            <label>New Password</label>
            <input
              ref={register}
              type="password"
              name="newPassword"
              style={{width: '300px'}}
              placeholder="Enter New Password"
              className={`form-control `}
            />
            <div className="invalid-feedback" style={{display: 'block'}}>
              {errors.newPassword && errors.newPassword.message}
            </div>
          </div>

          <div className="mt-4">
            <label>Confirm Password</label>
            <input
              ref={register}
              type="password"
              name="confirmPassword"
              style={{width: '300px'}}
              placeholder="Enter Confirm Password"
              className={`form-control `}
            />
            <div className="invalid-feedback" style={{display: 'block'}}>
              {errors.confirmPassword && errors.confirmPassword.message}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {changePasswordProcessing ? <ButtonLoader/> :
            <Button variant="primary" className="btn-success" type="submit">
              Submit
            </Button>}
          <Button variant="secondary" className="btn-danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}


ChangePassword.propTypes = {

  changePassword: PropTypes.func,
  changePasswordProcessing: PropTypes.bool,
  handleClose: PropTypes.func,
  showChangePassword: PropTypes.bool
};

const mapStateToProps = createStructuredSelector({
  changePasswordProcessing: makeSelectChangePasswordProcessing()
});

function mapDispatchToProps(dispatch) {
  return {
    changePassword: (data) => dispatch(changePasswordAction(data))
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
