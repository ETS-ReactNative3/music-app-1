import React from 'react';
import PropTypes from 'prop-types';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PaperCard from '../../components/PaperCard';
import {Image, Button, Modal} from 'react-bootstrap';
import defaultImage from '../../images/album-3.jpg'
import {makeSelectUserDetails} from '../App/selectors';
import ButtonLoader from '../../components/ButtonLoader';
import {useInjectReducer} from '../../utils/injectReducer';
import teamReducer from './reducer';
import {useInjectSaga} from '../../utils/injectSaga';
import teamSaga from './saga';
import {addTeamAction} from './actions';
import {makeSelectProgress} from './selectors';

const AddTeam = ({userDetails, progress, addTeam}) => {
  useInjectReducer({key: 'team', reducer: teamReducer});
  useInjectSaga({key: 'team', saga: teamSaga});

  const [teamName, setTeamName] = React.useState('');
  const [show, setShow] = React.useState(false);

  return (
    <PaperCard title="Create Team">
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
                    name="title"
                    placeholder="Enter team name"
                    className={`form-control`}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                  {progress ? <ButtonLoader/> :
                    <Button variant="success" block className="mt-2" onClick={() => {
                      if (teamName && teamName.length > 0) addTeam(teamName)
                      else setShow(true)
                    }}>Add Team</Button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          Please enter team name
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </PaperCard>
  )
}


AddTeam.propTypes = {
  userDetails: PropTypes.any,
  progress: PropTypes.bool,
  addTeam: PropTypes.func,
}

const mapStateToProps = createStructuredSelector({
  userDetails: makeSelectUserDetails(),
  progress: makeSelectProgress()
});

function mapDispatchToProps(dispatch) {
  return {
    addTeam: (name) => dispatch(addTeamAction(name))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddTeam);
