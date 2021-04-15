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
import { addTeamAction, fetchTeamDetailsAction , saveTeamMemberAction} from './actions';
import { makeSelectProgress, makeSelectSaveTeamMemberProgress, makeSelectSaveTeamNameProgress, makeSelectTeamDetails } from './selectors';
import { useParams } from 'react-router';
import LoadingIndicator from '../../components/LoadingIndicator';
import { validateEmail } from '../../utils';

const TeamSetting = ({ userDetails, progress, fetchTeamDetails, teamDetails, saveTeamNameProgress, saveTeamMemberProgress, saveTeamMember }) => {

    useInjectReducer({ key: 'team', reducer: teamReducer });
    useInjectSaga({ key: 'team', saga: teamSaga });
    const { id } = useParams();

    React.useEffect(() => {
        fetchTeamDetails(id);
    }, [id])

    const [teamName, setTeamName] = React.useState(teamDetails && teamDetails.name || '');
    const [show, setShow] = React.useState({show: false, message: ''});

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
                                    else setShow({show: true, message: 'Please enter name'})
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
                                        if (validateEmail(teamMember)) { saveTeamMember(id, teamMember)}
                                        else setShow({show: true, message: 'Enter valid email'})
                                    } else { setShow({show: true, message: 'Pleaes enter email'})}
                                }}>Save</Button>}
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
                            <Button variant="secondary" onClick={() => setShow({show: false, message: ''})}>
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
    saveTeamMember: PropTypes.func
}

const mapStateToProps = createStructuredSelector({
    userDetails: makeSelectUserDetails(),
    progress: makeSelectProgress(),
    saveTeamNameProgress: makeSelectSaveTeamNameProgress(),
    saveTeamMemberProgress: makeSelectSaveTeamMemberProgress(),
    teamDetails: makeSelectTeamDetails()
});

function mapDispatchToProps(dispatch) {
    return {
        fetchTeamDetails: (id) => dispatch(fetchTeamDetailsAction(id)),
        saveTeamMember: (teamId, email) => dispatch(saveTeamMemberAction(teamId, email))
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(withConnect)(TeamSetting);
