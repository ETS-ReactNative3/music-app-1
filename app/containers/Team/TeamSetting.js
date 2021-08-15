import React, {useEffect} from 'react';
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
import {saveTeamNameAction, fetchTeamDetailsAction, saveTeamMemberAction} from './actions';
import {
  makeSelectPendingInvites,
  makeSelectProgress,
  makeSelectSaveTeamMemberProgress,
  makeSelectSaveTeamNameProgress,
  makeSelectTeamDetails,
  makeSelectTeamMembers
} from './selectors';
import {useParams} from 'react-router';
import LoadingIndicator from '../../components/LoadingIndicator';
import {validateEmail} from '../../utils';
import {toast} from 'react-toastify';

const TeamSetting = (
  {
    userDetails,
    progress,
    fetchTeamDetails,
    pendingInvites,
    teamDetails,
    teamMembers,
    saveTeamNameProgress,
    saveTeamMemberProgress,
    saveTeamMember,
    saveTeamName
  }) => {

  useInjectReducer({key: 'team', reducer: teamReducer});
  useInjectSaga({key: 'team', saga: teamSaga});
  const {id} = useParams();

  useEffect(() => {
    fetchTeamDetails(id);
  }, [id])

  const [teamName, setTeamName] = React.useState(teamDetails && teamDetails.name || '');
  const [show, setShow] = React.useState({show: false, message: ''});
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [teamToDelete, setTeamToDelete] = React.useState('');

  const [teamMember, setTeamMember] = React.useState('');

  useEffect(() => {
    if (teamDetails && Object.keys(teamDetails).length > 0) {
      setTeamName(teamDetails.name)
    }
  }, [teamDetails])

  function saveTeamNameEvent() {
    if (teamName && teamName.length > 0) {
      saveTeamName(teamDetails.id, teamName)
    } else {
      setShow({show: true, message: 'Please enter name'})
    }
  }


  return (
    <>
      {(progress) ? <LoadingIndicator/> :
        <PaperCard title="Create Team">
          <div className="row">
            <div className="col-md-3">
              <h4>Team Name</h4>
              <h6>The team's name and owner information</h6>
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
                        className="form-control"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                      />
                      {saveTeamNameProgress ? <ButtonLoader/> :
                        <Button variant="success" block className="mt-2"
                                onClick={() => saveTeamNameEvent()}>Save</Button>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3">
              <h4>Add Team member</h4>
              <h6>Add a new member to your team, allowing them to collaborate with you</h6>
            </div>
            <div className="col-md-9">
              <div className="card bg-dark">
                <div className="card-header">
                  <h5 className="card-title">Please provide email address of the person you would like to add to this
                    team</h5>
                </div>
                <div className="card-body">
                  <label>Email</label>
                  <input
                    name="email"
                    placeholder="Enter email"
                    className={`form-control`}
                    type="email"
                    value={teamMember}
                    onChange={(e) => setTeamMember(e.target.value)}
                  />
                  {saveTeamMemberProgress ? <ButtonLoader/> :
                    <Button variant="success" block className="mt-2" onClick={() => {
                      if (teamMember && teamMember.length > 0) {
                        if (validateEmail(teamMember)) {
                          setTeamMember('');
                          saveTeamMember(id, teamMember)
                        } else setShow({show: true, message: 'Enter valid email'})
                      } else {
                        setShow({show: true, message: 'Pleaes enter email'})
                      }
                    }}>Add</Button>}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-3">
              <h4>Pending Team Invitations</h4>
              <h6>These people have been invited to your team and have been sent an invitation mail. They may join the
                team by accepting the email invitation.</h6>
            </div>
            <div className="col-md-9">
              <div className="card bg-dark">
                <div className="card-header">
                  <h5 className="card-title">Pending Invitations</h5>
                </div>
                <div className="card-body">
                  <ul>
                    {pendingInvites && pendingInvites.map(invite =>
                      <li>{invite.email}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {teamMembers.length > 0 &&
          <div className="row mt-3">
            <div className="col-md-3">
              <h4>Team Members</h4>
            </div>
            <div className="col-md-9">
              <div className="card bg-dark">
                {teamMembers && teamMembers.map(member => {
                  return <div className="d-flex flex-row justify-content-between mx-3 my-2 border-bottom border-dark">
                    <div>{member.user.name}</div>
                  </div>
                })}
              </div>
            </div>
          </div>
          }
          <Modal
            show={show.show}
            onHide={() => setShow(false)}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body>
              {show.message}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow({show: false, message: ''})}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            backdrop="static"
            keyboard={false}
          >

            <Modal.Body>
              <div>
                <div>Please enter Team name to confirm.</div>
                <input
                  name="name"
                  placeholder="Enter Name"
                  className={`form-control`}
                  value={teamToDelete}
                  onChange={(e) => setTeamToDelete(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>

              <Button variant="danger" onClick={() => {
                if (teamToDelete === teamDetails.name) {
                  setShowDeleteModal(false)
                } else {
                  toast.error("Entered name doesn't match")
                }
              }}>
                Confirm delete
              </Button>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </PaperCard>}
    </>
  )
}


TeamSetting.propTypes = {
  userDetails: PropTypes.any,
  progress: PropTypes.bool,
  fetchTeamDetails: PropTypes.func,
  teamDetails: PropTypes.any,
  saveTeamNameProgress: PropTypes.bool,
  saveTeamMemberProgress: PropTypes.bool,
  saveTeamMember: PropTypes.func,
  pendingInvites: PropTypes.array,
  teamMembers: PropTypes.array,
  saveTeamName: PropTypes.func
}

const mapStateToProps = createStructuredSelector(
  {
    userDetails: makeSelectUserDetails(),
    progress: makeSelectProgress(),
    saveTeamNameProgress: makeSelectSaveTeamNameProgress(),
    saveTeamMemberProgress: makeSelectSaveTeamMemberProgress(),
    teamDetails: makeSelectTeamDetails(),
    pendingInvites: makeSelectPendingInvites(),
    teamMembers: makeSelectTeamMembers()
  }
);

function mapDispatchToProps(dispatch) {
  return {
    fetchTeamDetails: (id) => dispatch(fetchTeamDetailsAction(id)),
    saveTeamMember: (teamId, email) => dispatch(saveTeamMemberAction(teamId, email)),
    saveTeamName: (id, name) => dispatch(saveTeamNameAction(id, name))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TeamSetting);
