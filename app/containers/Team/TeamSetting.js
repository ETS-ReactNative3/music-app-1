import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PaperCard from '../../components/PaperCard';
import { Card, Col, Form, Image, Button, Modal } from 'react-bootstrap';
import defaultImage from '../../images/album-3.jpg'
import { makeSelectUserDetails } from '../App/selectors';
import ButtonLoader from '../../components/ButtonLoader';
import { useInjectReducer } from '../../utils/injectReducer';
import teamReducer from './reducer';
import { useInjectSaga } from '../../utils/injectSaga';
import teamSaga from './saga';
import { addTeamAction, fetchTeamDetailsAction, saveTeamMemberAction } from './actions';
import { makeSelectPendingInvites, makeSelectProgress, makeSelectSaveTeamMemberProgress, makeSelectSaveTeamNameProgress, makeSelectTeamDetails, makeSelectTeamMembers } from './selectors';
import { useParams } from 'react-router';
import LoadingIndicator from '../../components/LoadingIndicator';
import { validateEmail } from '../../utils';
import { toast } from 'react-toastify';

const TeamSetting = ({ userDetails, progress, fetchTeamDetails, pendingInvites, teamDetails, teamMembers, saveTeamNameProgress, saveTeamMemberProgress, saveTeamMember }) => {

    useInjectReducer({ key: 'team', reducer: teamReducer });
    useInjectSaga({ key: 'team', saga: teamSaga });
    const { id } = useParams();

    React.useEffect(() => {
        fetchTeamDetails(id);
    }, [id])

    const [teamName, setTeamName] = React.useState(teamDetails && teamDetails.name || '');
    const [show, setShow] = React.useState({ show: false, message: '' });
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [teamToDelete, setTeamToDelete] = React.useState('');

    const [teamMember, setTeamMember] = React.useState('');

    React.useEffect(() => {
        if (teamDetails && Object.keys(teamDetails).length > 0) {
            setTeamName(teamDetails.name)
        }
    }, [teamDetails])
    return (
        <>
            {(progress) ? <LoadingIndicator /> :
                <PaperCard title="Create Team">
                    <Form.Row className="mt-5">
                        <Form.Group className="w-25">
                            <h4>Team Name</h4>
                            <h6>The team's name and owner information</h6>
                        </Form.Group>
                        <Form.Group className="w-75">
                            <Card style={{ color: 'black', padding: 10 }}>
                                <div>Team owner</div>
                                <div className="d-flex align-items-center my-3">
                                    <Image
                                        width={40}
                                        height={40}
                                        onError={e => {
                                            e.target.onerror = null;
                                            e.target.src = defaultImage;
                                        }}
                                        src={userDetails.avatar || ''}
                                        alt=""
                                        roundedCircle
                                    />

                                    <div className="ml-3">
                                        <div className="d-flex align-items-center">
                                            {userDetails.name}
                                        </div>
                                        <small className="text-muted d-block">
                                            {userDetails.email}
                                        </small>

                                    </div>
                                </div>

                                <label>Team Name</label>
                                <input
                                    name="title"
                                    placeholder="Enter team name"
                                    className={`form-control`}
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                />
                                {saveTeamNameProgress ? <ButtonLoader /> : <Button variant="success" className="d-flex align-self-end mt-2" onClick={() => {
                                    if (teamName && teamName.length > 0) addTeam(teamName)
                                    else setShow({ show: true, message: 'Please enter name' })
                                }}>Save</Button>}
                            </Card>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className="mt-5">
                        <Form.Group className="w-25">
                            <h4>Add Team member</h4>
                            <h6>Add a new member to your team, allowing them to collabrate with you</h6>
                        </Form.Group>
                        <Form.Group className="w-75">
                            <Card style={{ color: 'black', padding: 10 }}>
                                <div>Please provide email address of the person you would like to add to this team</div>


                                <label className="mt-2">Email</label>
                                <input
                                    name="email"
                                    placeholder="Enter email"
                                    className={`form-control`}
                                    type="email"
                                    value={teamMember}
                                    onChange={(e) => setTeamMember(e.target.value)}
                                />
                                {saveTeamMemberProgress ? <ButtonLoader /> : <Button variant="success" className="d-flex align-self-end mt-2" onClick={() => {
                                    if (teamMember && teamMember.length > 0) {
                                        if (validateEmail(teamMember)) { setTeamMember(''); saveTeamMember(id, teamMember) }
                                        else setShow({ show: true, message: 'Enter valid email' })
                                    } else { setShow({ show: true, message: 'Pleaes enter email' }) }
                                }}>Add</Button>}
                            </Card>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className="mt-5">
                        <Form.Group className="w-25">
                            <h4>Pending Team Invitations</h4>
                            <h6>These people have been invited to your team and have been sent an invitation mail. They may join the team by accepting the email invitation.</h6>
                        </Form.Group>
                        <Form.Group className="w-75">
                            <Card style={{ color: 'black', padding: 10 }}>
                                {pendingInvites && pendingInvites.map(invite => {
                                    return <div className="d-flex flex-row justify-content-between mx-3 my-2 border-bottom border-dark">
                                        <div>{invite.email}</div>
                                        <Button variant="light">Cancel</Button>
                                    </div>
                                })}
                            </Card>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row className="mt-5">
                        <Form.Group className="w-25">
                            <h4>Team Members</h4>
                        </Form.Group>
                        <Form.Group className="w-75">
                            <Card style={{ color: 'black', padding: 10 }}>
                                {teamMembers && teamMembers.map(member => {
                                    return <div className="d-flex flex-row justify-content-between mx-3 my-2 border-bottom border-dark">
                                        <div>{member.email}</div>
                                        <Button variant="light">Cancel</Button>
                                    </div>
                                })}
                            </Card>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row className="mt-5">
                        <Form.Group className="w-25">
                            <h4>Delete Team</h4>
                            <h6>Permanently delete this team</h6>
                        </Form.Group>
                        <Form.Group className="w-75">
                            <Card style={{ color: 'black', padding: 10 }}>
                                <div>Once a team is deleted, all its resources are also deleted.</div>

                                <Button variant='danger' onClick={() => setShowDeleteModal(true)} className="d-flex flex-row align-self-start mx-1 my-4">Delete</Button>
                            </Card>
                        </Form.Group>
                    </Form.Row>
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
                            <Button variant="secondary" onClick={() => setShow({ show: false, message: '' })}>
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
                            
                            <Button variant="danger" onClick={() => {if (teamToDelete === teamDetails.name) {
                                setShowDeleteModal(false)
                            }else {
                                toast.error("Entered name doesn't match")
                            }}}>
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
    teamMembers: PropTypes.array
}

const mapStateToProps = createStructuredSelector({
    userDetails: makeSelectUserDetails(),
    progress: makeSelectProgress(),
    saveTeamNameProgress: makeSelectSaveTeamNameProgress(),
    saveTeamMemberProgress: makeSelectSaveTeamMemberProgress(),
    teamDetails: makeSelectTeamDetails(),
    pendingInvites: makeSelectPendingInvites(),
    teamMembers: makeSelectTeamMembers()
});

function mapDispatchToProps(dispatch) {
    return {
        fetchTeamDetails: (id) => dispatch(fetchTeamDetailsAction(id)),
        saveTeamMember: (teamId, email) => dispatch(saveTeamMemberAction(teamId, email)),
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(TeamSetting);
