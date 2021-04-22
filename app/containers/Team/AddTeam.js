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
import { addTeamAction } from './actions';
import { makeSelectProgress } from './selectors';

const AddTeam = ({ userDetails, progress, addTeam }) => {

    useInjectReducer({ key: 'team', reducer: teamReducer });
    useInjectSaga({ key: 'team', saga: teamSaga });

    const [teamName, setTeamName] = React.useState('');
    const [show, setShow] = React.useState(false);

    return (
        <PaperCard title="Create Team">
            <Form.Row className="mt-5">
                <Form.Group  className="flex-lg-row mr-3">
                    <h4>Team Settings</h4>
                    <h6>Create a new team to collabrate with others on projects</h6>
                </Form.Group>
                <Form.Group className="flex-fill">
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

                        <lable>Team Name</lable>
                        <input
                            name="title"
                            placeholder="Enter team name"
                            className={`form-control`}
                            onChange={(e) => setTeamName(e.target.value)}
                        />
                        {progress ? <ButtonLoader /> : <Button variant="success" className="d-flex align-self-end mt-2" onClick={() => {
                            if (teamName && teamName.length > 0) addTeam(teamName)
                            else setShow(true)
                            }}>Add Team</Button>}
                    </Card>
                </Form.Group>
            </Form.Row>
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
