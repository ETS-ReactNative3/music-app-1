import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Image, Button, Modal } from 'react-bootstrap';
import PaperCard from '../../components/PaperCard';
import defaultImage from '../../images/album-3.jpg';
import { makeSelectUserDetails } from '../App/selectors';
import ButtonLoader from '../../components/ButtonLoader';
import { useInjectReducer } from '../../utils/injectReducer';
import teamReducer from './reducer';
import { useInjectSaga } from '../../utils/injectSaga';
import teamSaga from './saga';
import { addTeamAction } from './actions';
import { makeSelectProgress } from './selectors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const AddTeam = ({ userDetails, progress, addTeam }) => {
  useInjectReducer({ key: 'team', reducer: teamReducer });
  useInjectSaga({ key: 'team', saga: teamSaga });

  const [teamName, setTeamName] = React.useState('');
  const [show, setShow] = React.useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string()

      .required('Name is required')
      .matches(/^[A-Z a-z]+$/, 'Name should be in valid format')
      .test('space', 'Name is required', val => val.trim().toString().length > 0)
      .test('min', 'Name must have 5 characters atleast', val => val.trim().toString().length > 4)
      .test('max', 'Name should have atmost 50 characters', val => val.trim().toString().length < 51),

  });
  const onSubmit = values => {
    addTeam(values.name);
  };

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  return (
    <PaperCard title="Create Team">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mt-5">
          <div className="col-md-3">
            <h4>Team Settings</h4>
            <h6>Create a new team to collaborate with others on projects</h6>
          </div>
          <div className="col-md-9">
            <div className="card bg-dark">
              <div className="card-header">
                <h5 className="card-title mb-0">Team owner</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-2">
                    <Image
                      width={100}
                      height={100}
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = defaultImage;
                      }}
                      src={userDetails.avatar || ''}
                      alt="avatar"
                      roundedCircle
                    />
                  </div>
                  <div className="col-10 m-auto">
                    <h5>{userDetails.name}</h5>
                    <h5>{userDetails.email}</h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label>Team Name</label>
                    <input
                      name="name"
                      placeholder="Enter name"
                      ref={register}
                      className={`form-control ${
                        errors.name ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">
                      {errors.name && errors.name.message}
                    </div>
                    {progress ? (
                      <ButtonLoader />
                    ) : (
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"
                      >
                        Submit
                      </button>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>Please enter team name</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </PaperCard>
  );
};

AddTeam.propTypes = {
  userDetails: PropTypes.any,
  progress: PropTypes.bool,
  addTeam: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userDetails: makeSelectUserDetails(),
  progress: makeSelectProgress(),
});

function mapDispatchToProps(dispatch) {
  return {
    addTeam: name => dispatch(addTeamAction(name)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddTeam);
