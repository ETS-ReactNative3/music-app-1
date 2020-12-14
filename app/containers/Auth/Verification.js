import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {useInjectSaga} from 'utils/injectSaga';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import saga from './saga';
import {verificationRequest} from './actions';
import {useForm} from "react-hook-form";

function Verification({verificationCall, classes}) {
  useInjectSaga({key: 'auth', saga});
  const {
    register, handleSubmit, errors
  } = useForm();

  const onSubmit = data => {
    verificationCall(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="code">Verification code</label>
          <input
            name="code"
            id="code"
            placeholder="Enter verification code*"
            className={`form-control ${
              errors.code ? "is-invalid" : ""
            }`}
            ref={register({
              required: "Verification code is required",
            })}
          />
          <div className="invalid-feedback">{errors.code && errors.code.message}</div>
        </div>
        <button className="btn btn-primary btn-block" type="submit">Submit</button>
      </form>
    </div>
  );
}

Verification.propTypes = {
  verificationCall: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    verificationCall: (data) => dispatch(verificationRequest(data))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo,
)(Verification);
